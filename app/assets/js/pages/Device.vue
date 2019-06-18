<style scoped>
.onboarded-image {
  width: 80%;
  display: block;
}

.onboarded-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

<template>
  <div>
    <h1>{{ device.label }}</h1>

    <h2>{{ $t('message.memberships') }}</h2>

    <b-alert show variant="info">
      <small>{{ $t('message.devicePageText') }}</small>
    </b-alert>

    <b-list-group>
      <b-list-group-item
        v-for="membership in memberships"
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
        >{{ $t('message.choose') }}</b-button>
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

    <b-modal
      id="onboarded"
      :title="$t('message.registrationComplete')"
      centered
      ok-only
      v-model="newDevice"
      :ok-title="$t('message.ok')"
      @ok="handleOk"
    >
      <div class="onboarded-container">
        <img src="images/smartcitizen.jpg" class="onboarded-image">
        <p class="mt-2">{{ $t('message.registrationText') }}</p>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { DELETE_DEVICE } from "../store/action-types";
import _ from "lodash";

export default {
  props: ["id"],
  data() {
    return {
      newDevice: true
    };
  },
  created() {
    this.newDevice = !!this.$route.query.new_device;
  },
  computed: {
    device: function() {
      return this.$store.state.configuration.devices[this.id];
    },
    memberships: function() {
      return _.pick(
        this.$store.state.configuration.memberships,
        _.keys(this.device.memberships)
      );
    }
  },
  methods: {
    onConfirm() {
      this.$store.dispatch(DELETE_DEVICE, {
        device_token: this.id
      });
      this.$router.replace({
        name: "devices"
      });
    },
    handleOk(evt) {
      evt.preventDefault();
      this.newDevice = false;
      this.$router.replace({
        name: "device",
        params: { id: this.id }
      });
    }
  }
};
</script>
