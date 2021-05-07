export default [
  {
    key: 'test.a',
    initialState: {
      hello: 'world',
    },
    success: (state: any, action: any) => {
      console.log(state, action);
    },
  },
  {
    key: 'test.b',
    // success: (state: any, action: any) => {
    //   console.log(state, action);
    // },
  },
  {
    key: 'test.c',
    success: (state: any, action: any) => {
      console.log(state, action);
    },
  },
  {
    key: 's.v.s.sd.e',
    initialState: {
      go: 1,
    },
    success: (state: any, action: any) => {
      console.log('s.v.s.sd.e', state, action);
      state.go += action;
    },
  },
  {
    key: 'count',
    // initialState: 1000,
    // initialState: {
    //   value: 1000,
    // },
    // success: (state: any, action: any) => {
    //   console.log(state, action);
    //   //   state += action;
    //   state.value = state.value + action;
    // },
  },
];
