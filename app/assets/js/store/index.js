import Vue from 'vue';
import Vuex from 'vuex';
import { LOGIN, LOGOUT, INITIALIZE_CONFIG } from './mutation-types';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    pin: null,
    configuration: {}
  },
  mutations: {
    [LOGIN](state, payload) {
      // save pin into localstorage and vuex state
      state.pin = payload.pin;
      localStorage.setItem('pin', state.pin);

      // look for configuration in localstorage and overwrite the configuration
      // if we have some
      if (localStorage.getItem(state.pin)) {
        Vue.set(state, 'configuration', JSON.parse(localStorage.getItem(state.pin)));
      }
    },
    [LOGOUT](state) {
      // remove pin from localstorage and state
      localStorage.removeItem('pin');
      delete state.pin;

      // clear configuration
      Vue.set(state, 'configuration', {});
    },
    [INITIALIZE_CONFIG](state) {
      if (localStorage.getItem('pin')) {
        state.pin = localStorage.getItem('pin');
        if (localStorage.getItem(state.pin)) {
          Vue.set(state, 'configuration', JSON.parse(localStorage.getItem(state.pin)));
        }
      }
    }
  },
  getters: {}
});

// subcribe to all changes to the state
store.subscribe((mutation, state) => {
  // if we have a pin in our state
  if (state.pin) {
    localStorage.setItem(state.pin, JSON.stringify(state.configuration));
  }
})

export default store;