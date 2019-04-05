<style scoped>
.back-button {
  top: 4.2rem;
}
</style>


<template>
  <div>
    <h1>{{ policy.label }}</h1>

    <h2>{{ $t('message.device') }}: {{ device.deviceToken }}</h2>

    <div class="row">
      <div class="col">
        <b-button
          block
          variant="outline-secondary"
          :to="{ name: 'device', params: { id: device.deviceToken }}"
        >{{ $t('message.back') }}</b-button>
      </div>
      <div class="col">
        <b-button
          block
          type="button"
          variant="danger"
          v-b-modal.confirm
        >{{ $t("message.deleteMembership") }}</b-button>
      </div>
    </div>

    <policy-info :policy="policy" :description="description" :selected="selected"></policy-info>

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
import policyInfo from "../components/policyInfo.vue";

export default {
  components: {
    policyInfo
  },
  data() {
    return {
      selected: "true"
    };
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
    },
    description() {
      return this.policy.descriptions[this.$i18n.locale];
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
