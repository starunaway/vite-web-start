import EventBridge from '../EventBridge';
import {watch} from 'vue';

interface PollingParameters {
  key: string;
  payload?: any;
  timeInterval?: number;
  useLoading?: Boolean;
}

type PollingResult = (cacheKey: string, params: any) => any;

function usePolling({key, timeInterval = 3000, useLoading = false}: PollingParameters): PollingResult {
  const PollingCache: any = {};
  let cacheId: string | null = null;
  let _curParams: any = null;
  let timer: number;

  watch(
    () => EventBridge.store?.state[key],
    (pollingData) => {
      PollingCache[cacheId as string] = pollingData;
      timer = setTimeout(() => {
        EventBridge.dispatch(key, {..._curParams, __usePollingLoading: useLoading});
      }, timeInterval);
    }
  );

  function startPolling(id: string, params: any) {
    _curParams = params;
    cacheId = id;
    clearTimeout(timer);
    EventBridge.dispatch(key, {...params, __usePollingLoading: useLoading});
  }

  return startPolling;
}
export default usePolling;
