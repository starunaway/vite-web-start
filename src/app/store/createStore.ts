import {createStore, ActionContext, MutationTree, ActionTree} from 'vuex';
import axios from 'axios';
import {isFunction} from '../utils';
import {isStateLegal} from './utils';
import {AxiosMethods, IState, ModelApi, PluginType} from '../type';

function buildState(models: Array<ModelApi>) {
  const initialState: IState = {};
  models.forEach((model) => {
    if (!model.key) {
      throw new Error('you should define a key ');
    }

    if (!isStateLegal(initialState, model)) {
      throw new Error(
        `Build ${model.key} state failure. Check if ${model.key}'s key or initialState is duplicate in it's father state`
      );
    }

    const keys = model.key.split('.');
    if (keys.length === 1) {
      initialState[keys[0]] = model.initialState ?? {};
    } else {
      let top = initialState;

      keys.forEach((key, index) => {
        if (!top[key]) {
          top[key] = {};
        }
        if (index === keys.length - 1) {
          top[key] = model.initialState ?? {};
        } else {
          top = top[key];
        }
      });
    }
  });

  return initialState;
}

function buildMutations(models: Array<ModelApi>) {
  const mutations: MutationTree<IState> = {};
  models.forEach((model) => {
    mutations[model.key] = function (state: IState, payload: IState) {
      const keys = model.key.split('.');
      let curState = state;
      let prevState = curState;
      keys.forEach((k, i) => {
        curState = curState[k];
        if (i < keys.length - 1) {
          prevState = curState;
        }
      });

      if (model.url && model.method) {
        prevState[keys.pop() as string] = payload;
      } else if (isFunction(model.success)) {
        let result = (model.success as Function)(curState, payload);
        prevState[keys.pop() as string] = result;
      } else {
        prevState[keys.pop() as string] = payload;
      }
    };
  });

  return mutations;
}
function buildActions(models: Array<ModelApi>, state: IState) {
  const actions: ActionTree<IState, IState> = {};
  models.forEach((model) => {
    const keys = model.key.split('.');
    let curState = state;
    keys.forEach((k) => {
      curState = curState[k];
    });

    actions[model.key] = function (context: ActionContext<IState, IState>, payload: IState) {
      if (model.url && model.method) {
        if (payload.__usePollingLoading || payload.__usePollingLoading === undefined) {
          // loading
          delete payload.__usePollingLoading;
          let loadingPayload = {
            payload,
            result: null,
            loading: true,
            success: false,
          };

          if (isFunction(model.loading)) {
            loadingPayload.result = (model.loading as Function)(curState, payload);
          }
          context.commit(model.key, loadingPayload);
        }

        delete payload.__usePollingLoading;

        let body = (model.body && (model.body as Function)(payload)) || {};

        axios[model.method as AxiosMethods](model.url(payload), body)
          .then((result: any) => {
            let successPayload = {
              payload,
              result,
              loading: false,
              success: true,
            };

            if (isFunction(model.success)) {
              successPayload.result = (model.success as Function)(curState, result);
            }

            context.commit(model.key, successPayload);
          })
          .catch((error: Error) => {
            let failurePayload = {
              payload,
              error,
              loading: false,
              success: false,
            };

            if (isFunction(model.failure)) {
              failurePayload.error = (model.failure as Function)(curState, error);
            }

            context.commit(model.key, failurePayload);
          });
      } else {
        context.commit(model.key, payload);
      }
    };
  });
  return actions;
}

export function createAppStore(models: Array<ModelApi>, plugins?: Array<PluginType>) {
  const state = buildState(models);
  const mutations = buildMutations(models);
  const actions = buildActions(models, state);

  return createStore({
    state,
    mutations,
    actions,
    plugins,
  });
}
