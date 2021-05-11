export default [
  {
    key: 'poetry',
    method: 'get',
    url: (payload: any) => `http://poetry.apiopen.top/sentences`,
    success: (state: any, action: any) => {
      return action.data.result;
    },
  },
];
