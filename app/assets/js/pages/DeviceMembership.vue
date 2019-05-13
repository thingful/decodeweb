<style scoped>
.back-button {
  top: 4.2rem;
}
</style>


<template>
  <div>
    <h1>{{ policy.label }}</h1>

    <h2>{{ device.label }}</h2>

    <p>
      <a href="http://bcnnow.decodeproject.eu">{{ $t('message.bcnnow') }}</a>
    </p>

    <div class="row">
      <div class="col">
        <b-button
          block
          variant="outline-secondary"
          :to="{ name: 'device', params: { id: device.deviceToken }}"
        >{{ $t('message.back') }}</b-button>
      </div>
      <div class="col">
        <b-button block type="button" variant="danger" v-b-modal.confirm>{{ $t("message.delete") }}</b-button>
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
  props: ["id", "attribute_id"],
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
      return this.$store.state.configuration.devices[this.id];
    },
    membership() {
      return this.$store.state.configuration.memberships[this.attribute_id];
    },
    policy() {
      return this.membership.policy;
    },
    description() {
      return this.policy.descriptions[this.$i18n.locale];
    },
    stream() {
      return this.device.memberships[this.attribute_id].stream;
    }
  },
  methods: {
    onConfirm() {
      this.$store.dispatch(DELETE_MEMBERSHIP, {
        device_token: this.id,
        authorizable_attribute_id: this.attribute_id,
        stream: this.stream
      });

      this.$router.replace({
        name: "device",
        params: { id: this.id }
      });
    }
  }
};
</script>
