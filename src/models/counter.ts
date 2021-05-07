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
    success: (state: any, action: any) => {
      console.log('login success', state, action);
    },
    loading: (state: any, action: any) => {
      console.log('login loading', state, action);
    },
    failure: (state: any, action: any) => {
      console.log('login failure', state, action);
    },
  },
  {
    key: 'a.a',
  },
];
