import './assets/reset.css';
import router from '@/routers';
import models from '@/models';
import EventBridge from '@/app/EventBridge';
import App from '@/app';

function start() {
  const app = new App();
  app.setRouter(router);
  app.setModels(models);
  app.start('#app');

  EventBridge.store = app.getStore();
}

if (window.finstation) {
  window.finstation.ready(() => {
    start();

    EventBridge.commit(`qm.workspace`, window.eb?.store?.workspace);
    EventBridge.commit(`qm.myUserInfo`, window.eb?.store?.myUserInfo);
    EventBridge.commit(`qm.rooms`, window.eb?.store?.rooms);

    window.eb.on('_setStore', (payload) => {
      const {key, value} = payload;
      if (['workspace', 'myUserInfo', 'rooms'].includes(key)) {
        EventBridge.commit(`qm.${key}`, value);
      }
    });
  });
} else {
  start();
}
