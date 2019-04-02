<style scoped>
</style>

<template>
  <div>
    <h1>{{ $t('message.device') }}: {{ device.deviceToken }}</h1>
    <div class="form-row">
      <div class="col">
        <small>{{ $t('message.choosePolicy') }}</small>
      </div>
    </div>
    <div class="form-row">
      <div class="col-9">
        <b-form-select v-model="selected" :options="policyOptions"></b-form-select>
      </div>
      <div class="col">
        <b-button variant="outline-primary">Reload</b-button>
      </div>
    </div>

    <b-button
      block
      type="button"
      variant="danger"
      class="mt-3"
      :disabled="!selected"
    >{{ $t("message.joinCommunity") }}</b-button>

    <b-card :title="policy.label" class="mt-3" v-if="selected">
      <b-card-text>
        <p>{{ description }}</p>
        <h5>{{ $t('message.sensors') }}</h5>
      </b-card-text>
      <b-list-group flush v-if="policy.operations.length > 0">
        <operation
          :sensorId="op.sensor_id"
          :action="op.action"
          v-for="op in policy.operations"
          v-bind:item="op"
          v-bind:key="op.sensor_id"
        />
      </b-list-group>
      <b-list-group flush v-else>
        <b-list-group-item>{{ $t('message.shareAllSensors') }}</b-list-group-item>
      </b-list-group>
    </b-card>
  </div>
</template>

<script>
import { LOAD_POLICIES } from "../store/action-types";
import operation from "../components/operation.vue";

export default {
  components: {
    operation
  },
  mounted() {
    this.$store.dispatch(LOAD_POLICIES);
  },
  data() {
    return {
      selected: null
    };
  },
  computed: {
    device() {
      return this.$store.state.configuration.devices[this.$route.params.id];
    },
    policyOptions() {
      return this.$store.getters.policyOptions;
    },
    policy() {
      return this.$store.getters.policies[this.selected];
    },
    description() {
      return this.$store.getters.policies[this.selected].descriptions[
        this.$i18n.locale
      ];
    }
  }
};
</script>
