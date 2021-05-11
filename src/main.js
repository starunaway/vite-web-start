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
  window.finstation.ready(start);
} else {
  start();
}
