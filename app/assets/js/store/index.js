import Vue from 'vue';
import Vuex from 'vuex';
import {
  LOGIN,
  LOGOUT,
  INITIALIZE_CONFIG,
  ADD_DEVICE,
  POLICIES_LOADED,
  SAVE_AUTHORIZABLE_ATTRIBUTE,
  SAVE_ERROR,
  CLEAR_ERROR,
  SAVE_BLINDPROOF,
  SAVE_STREAM
} from './mutation-types';
import {
  LOAD_POLICIES,
  LOAD_AUTHORIZABLE_ATTRIBUTE,
  REQUEST_CREDENTIAL,
  CREATE_BLINDPROOF,
  CREATE_STREAM
} from './action-types';
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
    },
    error: null
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
        map[p.authorizable_attribute_id] = p;
        return map;
      }, {});
    },

    [SAVE_AUTHORIZABLE_ATTRIBUTE](state, payload) {
      let blindSignature = zenroom.blindSignatureRequest(state.configuration.uuid, state.configuration.keypair);
      let policy = state.policies[payload.authorizable_attribute.authorizable_attribute_id];

      let membership = {
        authorizable_attribute: payload.authorizable_attribute,
        policy: policy,
        blind_signature: blindSignature,
        credential: null,
        blind_proof_credential: null
      };

      Vue.set(state.configuration.devices[payload.device_token].memberships, payload.authorizable_attribute.authorizable_attribute_id, membership);
    },

    [SAVE_ERROR](state, msg) {
      state.error = msg;
    },

    [CLEAR_ERROR](state) {
      state.error = null;
    },

    [SAVE_BLINDPROOF](state, payload) {
      let membership = state.configuration.devices[payload.device_token].
        memberships[payload.authorizable_attribute_id];

      membership = Object.assign(membership, {
        credential: JSON.parse(payload.credential),
        blind_proof_credential: JSON.parse(payload.blind_proof_credential),
      });
    },

    [SAVE_STREAM](state, payload) {
      let membership = state.configuration.devices[payload.device_token].
        memberships[payload.authorizable_attribute_id];

      membership = Object.assign(membership, {
        stream: payload.stream
      });
    }
  },
  actions: {
    [LOAD_POLICIES]() {
      // nothing here - used to emit an event via the socket in our plugin
    },
    [LOAD_AUTHORIZABLE_ATTRIBUTE]() {
      // again nothing - used to hook to our socket
    },
    [REQUEST_CREDENTIAL]() {
    },
    [CREATE_STREAM]() { },
    [CREATE_BLINDPROOF]({ state, commit, dispatch }, payload) {
      let device = state.configuration.devices[payload.device_token];
      let membership = device.memberships[payload.authorizable_attribute_id];

      let ciVerifyKeypair = membership.authorizable_attribute.verification_key;

      let credential = zenroom.createCredential(
        state.configuration.uuid,
        state.configuration.keypair,
        payload.ciCredential
      );

      let blindproofCredential = zenroom.createBlindproofCredential(
        state.configuration.uuid,
        credential,
        JSON.stringify(ciVerifyKeypair)
      );

      let createStreamMsg = {
        device_token: payload.device_token,
        community_id: membership.policy.community_id,
        recipient_public_key: membership.policy.public_key,
        location: {
          longitude: device.longitude,
          latitude: device.latitude,
        },
        exposure: device.exposure,
        operations: membership.policy.operations
      };

      // dispatch action to call the encoder to create the stream
      dispatch(CREATE_STREAM, {
        request: createStreamMsg,
        device_token: payload.device_token,
        authorizable_attribute_id: payload.authorizable_attribute_id
      });

      commit(SAVE_BLINDPROOF, {
        device_token: payload.device_token,
        authorizable_attribute_id: payload.authorizable_attribute_id,
        credential: credential,
        blind_proof_credential: blindproofCredential
      });
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