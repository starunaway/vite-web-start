import {createApp, h} from 'vue';
import './assets/reset.css';
import router from '@/routers';
import {RouterView} from 'vue-router';

createApp(h(RouterView)).use(router).mount('#app');
