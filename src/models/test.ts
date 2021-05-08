export default [
  {
    key: 'test.a',
    initialState: {
      hello: 'world',
    },
    success: (state: any, action: any) => {
      console.log(state, action);
      return {
        hello: state.hello + action,
      };
    },
  },
  {
    key: 'test.b',
  },
  {
    key: 'test.c',
    initialState: 0,
    success: (state: any, action: any) => {
      return action.a + action.b;
    },
  },
  {
    key: 's.u.v.w.x.y.z',
    initialState: {
      go: 1,
    },
    success: (state: any, action: any) => {
      console.log('s.u.v.w.x.y.z', state, action);
      return {
        go: state.go + action,
      };
    },
  },
  {
    key: 'count',
    initialState: 1000,
  },
];
