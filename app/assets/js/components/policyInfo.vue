<template>
  <b-card :title="policy.label" class="mt-3" v-if="selected">
    <b-card-text>
      <p>{{ description }}</p>
      <h5>{{ $t('message.sensors') }}</h5>
    </b-card-text>
    <b-list-group flush v-if="policy.operations.length > 0">
      <operation
        :sensorId="op.sensor_id"
        :action="op.action"
        :interval="op.interval"
        :bins="op.bins"
        v-for="op in policy.operations"
        v-bind:item="op"
        v-bind:key="op.sensor_id"
      />
    </b-list-group>
    <b-list-group flush v-else>
      <b-list-group-item>{{ $t('message.shareAllSensors') }}</b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
import operation from "../components/operation.vue";

export default {
  components: {
    operation
  },
  props: {
    policy: Object,
    description: String,
    selected: String
  }
};
</script>
