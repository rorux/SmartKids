import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

// Middleware
const ifNotAuthenticated = (to, from, next) => {
  if (!localStorage.getItem('token')) return next()
  next('/');
}
const ifAuthenticated = (to, from, next) => {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token');
    store.dispatch("checkToken", { token: token });
    return next();
  }
  next('/login?message=login');
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {layout: 'empty'},
      component: () => import('./views/Login.vue'),
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/register',
      name: 'register',
      meta: {layout: 'empty'},
      component: () => import('./views/Register.vue'),
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/',
      name: 'home',
      meta: {layout: 'main'},
      component: () => import('./views/Home.vue'),
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/math',
      name: 'math',
      meta: {layout: 'main'},
      component: () => import('./views/Math.vue'),
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/rus',
      name: 'rus',
      meta: {layout: 'main'},
      component: () => import('./views/Rus.vue'),
      beforeEnter: ifAuthenticated,
    },
  ]
});

export default router;