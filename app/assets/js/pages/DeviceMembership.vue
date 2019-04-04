<template>
  <div>
    <h1>{{ policy.label }}</h1>

    <h2>{{ $t('message.device') }}: {{ device.deviceToken }}</h2>

    <b-button
      block
      type="button"
      variant="danger"
      v-b-modal.confirm
    >{{ $t("message.deleteMembership") }}</b-button>

    <b-modal
      id="confirm"
      :title="$t('message.confirmation')"
      centered
      @ok="onConfirm"
      ok-variant="danger"
    >
      <p>{{ $t('message.confirmationText') }}</p>
    </b-modal>
  </div>
</template>

<script>
import { DELETE_MEMBERSHIP } from "../store/action-types";

export default {
  data() {
    return {};
  },
  computed: {
    device() {
      return this.$store.state.configuration.devices[this.$route.params.id];
    },
    membership() {
      return this.device.memberships[this.$route.params.attribute_id];
    },
    policy() {
      return this.membership.policy;
    }
  },
  methods: {
    onConfirm() {
      let stream = this.membership.stream;

      this.$store.dispatch(DELETE_MEMBERSHIP, {
        device_token: this.$route.params.id,
        attribute_id: this.$route.params.attribute_id,
        stream: stream
      });

      this.$router.replace({
        name: "device",
        params: { id: this.$route.params.id }
      });
    }
  }
};
</script>
