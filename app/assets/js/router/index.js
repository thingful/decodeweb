import Vue from 'vue';
import Router from 'vue-router';
import Login from '../pages/Login.vue';
import Home from '../pages/Home.vue';
import Devices from '../pages/Devices.vue';
import NewDevice from '../pages/NewDevice.vue';
import store from '../store';
import { INITIALIZE_CONFIG } from '../store/mutation-types';

Vue.use(Router);

store.commit(INITIALIZE_CONFIG);

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      props: true
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      props: true
    },
    {
      path: '/devices',
      name: 'devices',
      component: Devices,
      props: true
    },
    {
      path: '/devices/new',
      name: 'newDevice',
      component: NewDevice,
      props: true
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (store.state.pin) {
    if (to.path === '/login') {
      next('/');
    } else {
      next();
    }
  } else {
    if (to.path !== '/login') {
      next('/login');
    } else {
      next();
    }
  }
});

export default router;