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
  SAVE_STREAM,
  REMOVE_MEMBERSHIP
} from "./mutation-types";

const timeout = 10000;

export default function createChannelPlugin(socket) {
  let channel = socket.channel('decode:lobby', {})
  channel.join()
    .receive('ok', resp => { console.log('Joined successfully', resp) })
    .receive('error', resp => { console.log('Unable to join', resp) });

  return store => {
    store.subscribeAction((action, state) => {
      switch (action.type) {
        case LOAD_POLICIES:
          channel.push('load_policies', {}, timeout)
            .receive("ok", (payload) => store.commit(POLICIES_LOADED, payload.policies))
            .receive("error", (payload) => {
              store.commit(SAVE_ERROR, payload.msg);
            })
            .receive("timeout", () => {
              store.commit(SAVE_ERROR, 'Unable to reach server');
            });
          break;

        case LOAD_AUTHORIZABLE_ATTRIBUTE:
          let existingMembership = store.state.configuration.memberships[action.payload.authorizable_attribute_id];

          if (!existingMembership) {
            channel.push('load_authorizable_attribute', action.payload, timeout)
              .receive("ok", (payload) => store.commit(SAVE_AUTHORIZABLE_ATTRIBUTE, payload))
              .receive("error", (payload) => {
                console.log(payload);
                store.commit(SAVE_ERROR, "credential issuer error")
              })
              .receive("timeout", () => {
                store.commit(SAVE_ERROR, 'Unable to reach server');
              });
          } else {
            let device = store.state.configuration.devices[action.payload.device_token];

            // build create stream message
            let createStreamMsg = {
              device_token: action.payload.device_token,
              community_id: existingMembership.policy.community_id,
              recipient_public_key: existingMembership.policy.public_key,
              location: {
                longitude: device.longitude,
                latitude: device.latitude,
              },
              exposure: device.exposure,
              operations: existingMembership.policy.operations
            };

            // dispatch create stream message
            store.dispatch(CREATE_STREAM, {
              request: createStreamMsg,
              device_token: action.payload.device_token,
              authorizable_attribute_id: action.payload.authorizable_attribute_id
            });
          }
          break;

        case REQUEST_CREDENTIAL:
          channel.push('request_credential', action.payload, timeout)
            .receive("ok", (payload) => store.dispatch(CREATE_BLINDPROOF, payload))
            .receive("error", (payload) => {
              console.log(payload);
              store.commit(SAVE_ERROR, 'request credential error');
            })
            .receive('timeout', () => {
              store.commit(SAVE_ERROR, 'Unable to reach remote server');
            });
          break;

        case CREATE_STREAM:
          channel.push('create_stream', action.payload, timeout)
            .receive("ok", (payload) => store.commit(SAVE_STREAM, payload))
            .receive("error", (payload) => {
              console.log(payload);
              store.commit(SAVE_ERROR, payload.msg);
            })
            .receive("timeout", () => 'Unable to reach remote server');
          break;

        case DELETE_MEMBERSHIP:
          channel.push('delete_stream', action.payload, timeout)
            .receive("ok", (payload) => {
              store.commit(REMOVE_MEMBERSHIP, payload)
            })
            .receive("error", (payload) => {
              console.log(payload);
              store.commit(SAVE_ERROR, payload.msg);
            })
            .receive("timeout", () => 'Unable to reach remote server - timeout');
          break;

        case DELETE_DEVICE:
          let device = store.state.configuration.devices[action.payload.device_token];
          _.forIn(device.memberships, (membership) => {
            channel.push('delete_stream', {
              device_token: action.payload.device_token,
              authorizable_attribute_id: membership.authorizable_attribute_id,
              stream: membership.stream
            });
          });
          break;

        default:

      }
    });
  }
};