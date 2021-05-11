import {createApp, h, App} from 'vue';
import {Store} from 'vuex';
import {createAppStore} from './store/createStore';
import {Router, RouterView} from 'vue-router';
import {IState, ModelApi, PluginType} from './type';

class VueApp {
  app: App<Element>;
  store!: Store<IState>;
  models!: Array<ModelApi>;
  plugins!: Array<PluginType>;
  router: any;

  constructor() {
    this.app = createApp(h(RouterView));
  }

  buildStore = () => {
    this.store = createAppStore(this.models, this.plugins);
    // this.store = this.models;
  };

  setModels = (models: Array<ModelApi>) => {
    this.models = models;
  };

  setPlugins = (plugins: Array<PluginType>) => {
    this.plugins = plugins;
  };

  setRouter = (router: Router) => {
    this.router = router;
  };

  start = (container: string | Element) => {
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
