import { LOAD_POLICIES } from "./action-types";
import { POLICIES_LOADED } from "./mutation-types";

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

    store.subscribeAction((action, state) => {
      switch (action.type) {
        case LOAD_POLICIES:
          channel.push('load_policies', {});
          break;
        default:

      }
    });
  }
};