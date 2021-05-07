import {createStore} from 'vuex';
import axios from 'axios';

import {isFunction} from '../utils';
import {isStateLegal} from './utils';

function buildState(models) {
  const initialState = {};
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
        if (index !== keys.length - 1) {
          let goNext = top[key];
          if (!goNext) {
            top[key] = {};
            goNext = top[key];
          }
          top = goNext;
        } else {
          top[key] = model.initialState ?? {};
        }
      });
    }
  });

  return initialState;
}

function buildMutations(models) {
  const mutations = {};
  models.forEach((model) => {
    const keys = model.key.split('.');
    mutations[model.key] = function (state, payload) {
      let curState = state;
      keys.forEach((k) => {
        curState = curState[k];
      });

      console.log(curState, payload);

      payload = {
        payload,
        result: payload,
        loading: false,
        success: true,
      };

      if (isFunction(model.success)) {
        model.success(curState, payload);
      } else {
        curState.value = payload;
      }
    };
  });

  console.log('buildMutations', mutations);
  return mutations;
}
function buildActions(models, state) {
  const actions = {};
  models.forEach((model) => {
    const keys = model.key.split('.');
    let curState = state;
    keys.forEach((k) => {
      curState = curState[k];
    });

    actions[model.key] = function (context, payload) {
      if (model.url && model.method) {
        if (isFunction(model.loading)) {
          let loadingPayload = model.loading(curState, payload);
          context.commit(model.key, loadingPayload);
        } else {
          context.commit(model.key, {
            payload,
            result: null,
            loading: true,
            success: false,
          });
        }

        axios[model.method.toLowerCase()](model.url(payload), model.body(payload))
          .then((result) => {
            context.commit(model.key, {
              payload,
              result,
              loading: false,
              success: true,
            });
          })
          .catch((error) => {
            if (isFunction(model.failure)) {
              let errResult = model.failure(curState, error);
              context.commit(model.key, errResult);
            } else {
              context.commit(model.key, {
                payload,
                error: error,
                loading: false,
                success: false,
              });
            }
          });
      } else {
        payload = {
          payload,
          result: payload,
          loading: false,
          success: true,
        };

        context.commit(model.key, payload);
      }
    };
  });
  return actions;
}

export function createAppStore(models) {
  const state = buildState(models);
  console.log('state:', state);
  const mutations = buildMutations(models);
  const actions = buildActions(models, state);

  return createStore({
    state,
    mutations,
    actions,
  });
}
