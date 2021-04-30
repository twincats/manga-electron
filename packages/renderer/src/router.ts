import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '/@/pages/Home.vue';
import Chapter from '/@/pages/Chapter.vue';
import Page from '/@/pages/Page.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/chapter/:chapId',
    name: 'chapter',
    component: Chapter,
  },
  {
    path: '/page/:pageId',
    name: 'page',
    component: Page,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('/@/pages/About.vue'),
  }, // Lazy load route component
];

export default createRouter({
  routes,
  history: createWebHashHistory(),
});
