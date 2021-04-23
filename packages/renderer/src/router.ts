import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '/@/components/Home.vue';

const routes = [
  {
    path: '/',
    name: 'h',
    component: () => import('/@/components/Test.vue'),
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
