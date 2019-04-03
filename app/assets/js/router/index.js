import Vue from 'vue';
import Router from 'vue-router';
import Login from '../pages/Login.vue';
import Home from '../pages/Home.vue';
import Devices from '../pages/Devices.vue';
import NewDevice from '../pages/NewDevice.vue';
import Device from '../pages/Device.vue';
import ChooseCommunity from '../pages/ChooseCommunity.vue';
import JoinCommunity from '../pages/JoinCommunity.vue';
//import DeviceCommunity from '../pages/DeviceCommunity.vue';

import store from '../store';
import { INITIALIZE_CONFIG, CLEAR_ERROR } from '../store/mutation-types';

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
    },
    {
      path: '/devices/:id',
      name: 'device',
      component: Device,
      props: true
    },
    {
      path: '/devices/:id/choose',
      name: 'choose',
      component: ChooseCommunity,
      props: true
    },
    {
      path: '/devices/:id/join/:attribute_id',
      name: 'join',
      component: JoinCommunity,
      props: true
    }
    //{
    //  path: '/devices/:id/community/:community_id',
    //  name: 'deviceCommunity',
    //  components: DeviceCommunity,
    //  props: true
    //},
    //{
    //  path: '/devices/:id/join',
    //  name: 'joinCommunity',
    //  components: JoinCommunity,
    //  props: true
    //}
  ]
});

router.beforeEach((to, from, next) => {
  store.commit(CLEAR_ERROR);

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