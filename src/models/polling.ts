export default [
  {
    key: 'poetry',
    method: 'get',
    url: (payload: any) => `http://poetry.apiopen.top/sentences`,
    success: (state: any, action: any) => {
      return action.data.result;
    },
  },
  {
    key: 'quickChat',
    method: 'get',
    url: (payload: any) =>
      `http://rabbitmq-pc.qmhost1.com:8000/qm/quickchat/public/current_room?roomID=${payload.room_id}`,
    success: (state: any, action: any) => {
      return action.data;
    },
  },
];
