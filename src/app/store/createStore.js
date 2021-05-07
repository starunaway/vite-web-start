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
function buildActions(models) {
  return {};
}

export function createAppStore(models) {
  const state = buildState(models);
  console.log('state:', state);
  const mutations = buildMutations(models);
  const actions = buildActions(models);

  return createStore({
    state,
    mutations,
    actions,
  });
}
