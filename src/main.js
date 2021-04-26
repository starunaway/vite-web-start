import {createApp} from 'vue';
import './assets/reset.css';
import App from './App.tsx';
import router from '@/routers';

// const App = () => <router-view></router-view>;

createApp(App).use(router).mount('#app');
