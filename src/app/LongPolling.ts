interface IRunnerParams {
  id: string;
  startTimeStamp: number;
  [field: string]: any;
}

const MAX_RE_REQUEST_COUNT = 3;

import Cacher from './PollingCache';

const Cache = new Cacher();

class Polling {
  _delay: number;
  eb_key: string;
  _XHR: Function;
  runner: IRunnerParams;
  _useCache?: boolean;
  _errPollingCount: number;
  constructor(key: string, useCache?: boolean) {
    this._delay = 1000;
    this.eb_key = key;
    this._useCache = useCache;
    this._XHR = () => {};
    this.runner = {
      id: 'init',
      startTimeStamp: 0,
    };

    this._errPollingCount = 0;

    Cache.setEBKey(key);
  }

  setApi = (xhr: Function) => {
    this._XHR = xhr;
  };

  setDelay = (delay: number) => {
    this._delay = delay;
  };

  start = (params: IRunnerParams) => {
    if (this.runner.id !== params.id) {
      this.runner.id = params.id;
      this.runner.startTimeStamp = new Date().getTime();
      if (this._useCache) {
        Cache.getCache(params.id);
      }
      this.run(params, this.runner.room_id, this.runner.startTime);
    }
  };

  runImmediately = async (params: IRunnerParams) => {
    params = {
      ...params,
      timestamp: new Date().getTime(),
    };
    let result = await this._XHR(params);

    if (result.status === 200 && result.statusText === 'OK') {
      this._errPollingCount = 0;
      this._useCache && Cache.setCache(params.id, result.data);
      !this._useCache && Cache.emit(result.data);
    } else {
      this._errPollingCount += 1;

      if (this._errPollingCount >= MAX_RE_REQUEST_COUNT) {
        this._errPollingCount = 0;
        Cache.emit({
          errMsg: '未同步到快聊消息',
        });
      }
    }
  };

  run = async (params: IRunnerParams, id: string, startTime: number) => {
    if (id === this.runner.id && startTime === this.runner.startTimeStamp) {
      await this.runImmediately(params);
      setTimeout(() => this.run(params, id, startTime), this._delay);
    }
  };
}

export default Polling;
