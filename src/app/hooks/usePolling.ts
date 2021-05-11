import EventBridge from '../EventBridge';
import {useStore} from 'vuex';
import {reactive, toRefs, watch} from 'vue';

interface PollingParameters {
  key: string;
  id: string;
  payload?: any;
  timeInterval?: number;
  useLoading?: Boolean;
}

const Cache: any = {};

function usePolling({key, timeInterval = 3000, id, useLoading = false}: PollingParameters) {
  let timer: number | null = null;
  let _params: any = null;
  let curData = EventBridge.store?.state[key] || reactive({});
  let oldData = EventBridge.store?.state[key] || reactive({});
  watch(
    () => EventBridge.store?.state[key],
    (cur) => {
      Cache[id] = cur;
      timer = setTimeout(() => {
        singlePoll();
      }, timeInterval);
    }
  );

  function singlePoll() {
    EventBridge.dispatch(key, {..._params, __usePollingLoading: useLoading});
  }

  function startPolling(params: any) {
    _params = params;
    singlePoll();
  }

  return [curData, oldData, startPolling];
}
export default usePolling;
