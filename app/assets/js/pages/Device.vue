<style scoped>
</style>

<template>
  <div>
    <h1>{{ $t('message.device')}}: {{ device.deviceToken }}</h1>

    <h2>{{ $t('message.memberships') }}</h2>

    <b-list-group>
      <b-list-group-item
        v-for="membership in device.memberships"
        v-bind:key="membership.authorizable_attribute.authorizable_attribute_id"
      >
        <b-link
          :to="{name: 'deviceMembership', params: { id: device.deviceToken, attribute_id: membership.authorizable_attribute.authorizable_attribute_id }}"
        >{{ membership.policy.label }}</b-link>
      </b-list-group-item>
    </b-list-group>

    <div class="row mt-3">
      <div class="col">
        <b-button
          block
          variant="outline-secondary"
          :to="{ name: 'devices'}"
        >{{ $t('message.back') }}</b-button>
      </div>
      <div class="col">
        <b-button
          block
          variant="primary"
          :to="{ name: 'choose', params: { id: device.deviceToken }}"
        >{{ $t('message.chooseCommunity') }}</b-button>
      </div>
    </div>

    <div class="row mt-2">
      <div class="col">
        <b-button block variant="danger" v-b-modal.confirm>{{ $t('message.deleteDevice') }}</b-button>
      </div>
    </div>

    <b-modal
      id="confirm"
      :title="$t('message.confirmation')"
      centered
      @ok="onConfirm"
      ok-variant="danger"
    >
      <p>{{ $t('message.deviceConfirmationText') }}</p>
    </b-modal>
  </div>
</template>

<script>
import { DELETE_DEVICE } from "../store/action-types";

export default {
  computed: {
    device: function() {
      return this.$store.state.configuration.devices[this.$route.params.id];
    }
  },
  methods: {
    onConfirm() {
      this.$store.dispatch(DELETE_DEVICE, {
        device_token: this.$route.params.id
      });
      this.$router.replace({
        name: "devices"
      });
    }
  }
};
</script>
