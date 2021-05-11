import {createRouter, createWebHistory} from 'vue-router';

import Home from '@/pages/Home/index.vue';
import About from '@/pages/About/index.vue';
import Quick from '@/pages/quick-chat/index.vue';

const routes = [
  {path: '/home', component: Home},
  {path: '/about', component: About},
  {path: '/', component: Quick},
];

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
});

export default router;
