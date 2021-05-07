import {createStore} from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    count: 0,
    test: {
      a: 1,
      b: 2,
      c: {},
    },
    login: {},
  },
  mutations: {
    add(state, payload) {
      state.count = state.count + payload;
    },
    updateTestA(state, payload) {
      state.test.a = payload;
    },
    ['test.b'](state, payload) {
      console.log('test.b');
      state.test.b = payload;
    },
    updateTestC(state, payload) {
      state.test.c = payload;
    },
    login(state, payload) {
      state.login = payload;
    },
  },
  actions: {
    login(context, payload) {
      console.log('login', context, payload);

      axios
        .post('/api/registry/login', {
          app_type: 'STAFF',
          login_type: 'pwd',
          userId: payload.userId,
          password: payload.password,
        })
        .then((result) => {
          console.log(result);
          context.commit('login', {
            ...result.data,
            ...result.headers,
          });
        });
    },
  },
});

export default store;
