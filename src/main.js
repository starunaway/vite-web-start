import './assets/reset.css';
import router from '@/routers';
import models from '@/models';

import EventBridge from '@/app/EventBridge';

import App from '@/app';

const app = new App();
app.setRouter(router);
app.setModels(models);
app.start('#app');

EventBridge.store = app.getStore();
