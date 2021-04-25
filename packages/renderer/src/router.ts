import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '/@/components/Home.vue';
import Chapter from '/@/components/Chapter.vue';
import Page from '/@/components/Page.vue';

const routes = [
  {
    path: '/',
    name: 'h',
    component: () => import('/@/components/Test.vue'),
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
    component: () => import('/@/components/About.vue'),
  }, // Lazy load route component
  { path: '/home', name: 'Home', component: Home },
];

export default createRouter({
  routes,
  history: createWebHashHistory(),
});
