import Vue from 'vue';
import Vuex from 'vuex';
import { LOGIN, LOGOUT, INITIALIZE_CONFIG, ADD_DEVICE, POLICIES_LOADED, ADD_MEMBERSHIP } from './mutation-types';
import { LOAD_POLICIES, JOIN_COMMUNITY } from './action-types';
import zenroom from '../zenroom';
import uuid from 'uuid/v4';
import socket from '../socket';
import socketPlugin from './socket';

Vue.use(Vuex);

const plugin = socketPlugin(socket);

const store = new Vuex.Store({
  state: {
    pin: null,
    channel: null,
    policies: {},
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
      if (state.channel !== null) {
        console.log('Leaving')
        state.channel.leave();
        state.channel = null;
      }

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
    },

    [POLICIES_LOADED](state, payload) {
      state.policies = payload.reduce((map, p) => {
        map[p.community_id] = p;
        return map;
      }, {});
    },

    [ADD_MEMBERSHIP](state, payload) {
      let membership = { policy: payload.policy, blind_signature: payload.blindSignature, credential: null, blindproof_credential: null };
      Vue.set(state.configuration.devices[payload.deviceToken].memberships, payload.policy.community_id, membership);
    }
  },
  actions: {
    [LOAD_POLICIES](context) {
      // nothing here - used to emit an event via the socket in our plugin
    },
    [JOIN_COMMUNITY]({ state, commit }, payload) {
      // create our blind signature
      let blindSignature = zenroom.blindSignatureRequest(state.configuration.uuid, state.configuration.keypair);

      // store the community/policy into our state for the device
      let community = state.policies[payload.community_id];
      commit(ADD_MEMBERSHIP, { deviceToken: payload.deviceToken, policy: community, blindSignature: blindSignature });
      // send message to backend to
    }
  },
  getters: {
    policyOptions(state) {
      return Object.keys(state.policies).map(id => { return { value: id, text: state.policies[id].label } })
        .sort((a, b) => a.text > b.text);
    }
  },
  plugins: [plugin]
});

// subcribe to all changes to the state
store.subscribe((mutation, state) => {
  // if we have a pin in our state
  if (state.pin) {
    localStorage.setItem(state.pin, JSON.stringify(state.configuration));
  }
})

export default store;