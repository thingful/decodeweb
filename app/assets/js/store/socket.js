import _ from 'lodash';

import {
  LOAD_POLICIES,
  LOAD_AUTHORIZABLE_ATTRIBUTE,
  REQUEST_CREDENTIAL,
  CREATE_BLINDPROOF,
  CREATE_STREAM,
  DELETE_MEMBERSHIP,
  DELETE_DEVICE
} from "./action-types";
import {
  POLICIES_LOADED,
  SAVE_AUTHORIZABLE_ATTRIBUTE,
  SAVE_ERROR,
  SAVE_STREAM
} from "./mutation-types";

export default function createChannelPlugin(socket) {
  let channel = socket.channel('decode:lobby', {})
  channel.join()
    .receive('ok', resp => { console.log('Joined successfully', resp) })
    .receive('error', resp => { console.log('Unable to join', resp) });

  return store => {
    channel.on('error', (payload) => {
      console.log(payload);
      store.commit(SAVE_ERROR, payload.error);
    });

    channel.on('policies_loaded', (payload) => {
      let policies = payload.policies;
      store.commit(POLICIES_LOADED, policies);
    });

    channel.on('authorizable_attribute_loaded', (payload) => {
      store.commit(SAVE_AUTHORIZABLE_ATTRIBUTE, payload);
    });

    channel.on('credential', (payload) => {
      store.dispatch(CREATE_BLINDPROOF, payload);
    });

    channel.on('new_stream', (payload) => {
      store.commit(SAVE_STREAM, payload);
    });

    store.subscribeAction((action, state) => {
      switch (action.type) {
        case LOAD_POLICIES:
          channel.push('load_policies', {});
          break;

        case LOAD_AUTHORIZABLE_ATTRIBUTE:
          channel.push('load_authorizable_attribute', action.payload);
          break;

        case REQUEST_CREDENTIAL:
          channel.push('request_credential', action.payload);
          break;

        case CREATE_STREAM:
          channel.push('create_stream', action.payload);
          break;

        case DELETE_MEMBERSHIP:
          channel.push('delete_stream', action.payload.stream);
          break;

        case DELETE_DEVICE:
          let device = store.state.configuration.devices[action.payload.device_token];
          _.forIn(device.memberships, (membership) => {
            if (membership.stream) {
              channel.push('delete_stream', membership.stream);
            }
          });
          break;

        default:

      }
    });
  }
};