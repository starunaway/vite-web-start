import {createApp, h} from 'vue';
import {createAppStore} from './store/createStore';
import {RouterView} from 'vue-router';

class VueApp {
  constructor() {
    this.app = createApp(h(RouterView));
  }

  buildStore = () => {
    this.store = createAppStore(this.models);
    // this.store = this.models;
  };

  setModels = (models) => {
    this.models = models;
  };

  setRouter = (router) => {
    this.router = router;
  };

  start = (container) => {
    if (!this.router) {
      throw new Error(` must setRouter() before start() `);
    }

    if (!this.store) {
      this.buildStore();
    }
    this.app.use(this.router).use(this.store).mount(container);
  };

  getStore = () => {
    return this.store;
  };
}

export default VueApp;
