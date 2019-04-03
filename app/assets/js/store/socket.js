import { LOAD_POLICIES, LOAD_AUTHORIZABLE_ATTRIBUTE } from "./action-types";
import { POLICIES_LOADED, SAVE_AUTHORIZABLE_ATTRIBUTE } from "./mutation-types";

export default function createChannelPlugin(socket) {
  let channel = socket.channel('decode:lobby', {})
  channel.join()
    .receive('ok', resp => { console.log('Joined successfully', resp) })
    .receive('error', resp => { console.log('Unable to join', resp) });

  return store => {
    channel.on('policies_loaded', (payload) => {
      let policies = payload.policies;
      store.commit(POLICIES_LOADED, policies);
    });

    channel.on('authorizable_attribute_loaded', (payload) => {
      store.commit(SAVE_AUTHORIZABLE_ATTRIBUTE, payload);
    });

    store.subscribeAction((action, state) => {
      switch (action.type) {
        case LOAD_POLICIES:
          channel.push('load_policies', {});
          break;

        case LOAD_AUTHORIZABLE_ATTRIBUTE:
          channel.push('load_authorizable_attribute', action.payload);
          break;

        default:

      }
    });
  }
};