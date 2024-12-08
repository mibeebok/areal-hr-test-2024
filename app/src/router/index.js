import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Protected from '../views/Protected.vue';
import AuthService from '../services/authService';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  {
    path: '/protected',
    component: Protected,
    beforeEnter: (to, from, next) => {
      if (AuthService.isAuthenticated()) {
        next();
      } else {
        next('/login');
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
