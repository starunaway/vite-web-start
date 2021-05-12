import {toRefs} from 'vue';

export default [
  {
    key: 'qm.rooms',
    success: (state: any, action: any) => {
      return {
        ...state,
        ...action,
      };
    },
  },
  {key: 'qm.workspace'},
  {key: 'qm.myUserInfo'},
];
