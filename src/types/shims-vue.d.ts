declare module '*.vue' {
  import {DefineComponent} from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '*.vue' {
  import {Router} from 'vue-router';
  //   import {Route} from 'vue-router';
  interface Vue {
    $router: Router;
    // $route: Route;
  }
}

interface Window {
  eb: any;
}
