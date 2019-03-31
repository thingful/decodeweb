import Vue from 'vue';
import Vuex from 'vuex';
import { LOGIN, LOGOUT, INITIALIZE_CONFIG, ADD_DEVICE } from './mutation-types';
import zenroom from '../zenroom';
import uuid from 'uuid/v4';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    pin: null,
    configuration: {
      uuid: null,
      keypair: null,
      devices: {}
    }
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
      } else {
        // initialize id and keypair for the user using zenroom
        let id = uuid();
        let keypair = zenroom.generateKeypair(id);
        Vue.set(state, 'configuration', { uuid: id, keypair: keypair, devices: {} });
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
    },

    [ADD_DEVICE](state, payload) {
      let token = payload.deviceToken;
      Vue.set(state.configuration.devices, token, payload);
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