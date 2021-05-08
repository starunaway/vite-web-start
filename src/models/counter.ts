// const BaseUrl = 'https://qm-tptest.qmhost1.com/api/v1';
const BaseUrl = '/api';

export default [
  {
    key: 'counter.login',
    url: (payload: any) => `${BaseUrl}/registry/login`,
    body: (payload: any) => {
      return {
        app_type: 'STAFF',
        login_type: 'pwd',
        userId: payload.userId,
        password: payload.password,
      };
    },
    method: 'post',
    loading: (state: any, action: any) => {
      console.log('login loading', state, action);
      return {};
    },
    success: (state: any, action: any) => {
      console.log('login success', state, action);
      return {
        ...action.data,
        ...action.headers,
      };
    },
    failure: (state: any, action: any) => {
      console.log('login failure', state, action);
    },
  },
  {
    key: 'loginA',
    initialState: 100,
    url: (payload: any) => `${BaseUrl}/registry/login`,
    body: (payload: any) => {
      return {
        app_type: 'STAFF',
        login_type: 'pwd',
        userId: payload.userId,
        password: payload.password,
      };
    },
    method: 'post',
  },
  {
    key: 'counter.loginA.loginA.loginA',
    url: (payload: any) => `${BaseUrl}/registry/login`,
    body: (payload: any) => {
      return {
        app_type: 'STAFF',
        login_type: 'pwd',
        userId: payload.userId,
        password: payload.password,
      };
    },
    initialState: {
      test: 1111,
    },

    method: 'post',
    success: (state: any, action: any) => {
      console.log('loginAAA success', state, action);
    },
    loading: (state: any, action: any) => {
      console.log('loginAAA loading', state, action);
    },
    failure: (state: any, action: any) => {
      console.log('loginAAA failure', state, action);
    },
  },
];
