import EventBridge from './EventBridge';

class Cache {
  _cache: Map<string, any>;
  _ebKey: string;
  constructor() {
    this._cache = new Map();
    this._ebKey = '';
  }

  setEBKey = (key: string) => {
    this._ebKey = key;
  };

  setCache = (key: string, data: any) => {
    let allowSet = true;
    if (data.timestamp) {
      const cache = this._cache.get(key);
      allowSet = data.timestamp > ((cache || {}).timestamp || 0);
    }

    if (allowSet) {
      this._cache.set(key, data);
      this.emit(data);
    }
  };

  getCache = (key: string) => {
    const v = this._cache.get(key);
    this.emit(v);
    return v;
  };

  emit = (data: any) => {
    EventBridge.emit(this._ebKey, data);
  };
}

export default Cache;
