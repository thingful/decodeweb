<template>
  <b-list-group-item>
    {{ sensor.name }} ({{ sensor.unit }})
    <br>
    {{ sensor.actionLabel }} (300 sec)
  </b-list-group-item>
</template>

<script>
import sensorDetails from "../smartcitizen";

export default {
  props: {
    sensorId: Number,
    action: String,
    interval: Number,
    bins: Array
  },
  computed: {
    sensor: function() {
      let details = sensorDetails(this.sensorId);
      switch (this.action) {
        case "MOVING_AVG":
          details.actionLabel = this.$t("message.movingAverage");
          details.modifier = `${this.interval}`;
          break;
        case "BIN":
          details.actionLabel = this.$t("message.bin");
          break;
        default:
          details.actionLabel = this.$t("message.share");
      }
      return details;
    }
  },
  methods: {
    sensorDetail: function(id) {
      return sensorDetails(id);
    }
  }
};
</script>
