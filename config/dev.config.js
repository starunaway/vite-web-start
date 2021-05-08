const {API_ROOT_DEV} = require('../src/constants/config');

module.exports = {
  NODE_ENV: 'development',
  API_ROOT: API_ROOT_DEV,
  CI_CONF: {
    tptest: {
      dev_user: 'super',
      dev_password: 'Super20200105@',
      admin_user: 'super',
      admin_password: 'Super20200105@',
      BaseUrl: 'https://qm-tptest.qmhost1.com/api/v1',
      appId: '606ff80678546a0001f6cea1',
    },
  },
};
