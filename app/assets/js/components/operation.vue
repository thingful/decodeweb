<template>
  <b-list-group-item>
    {{ sensor.name }} ({{ sensor.unit }})
    <br>
    {{ sensor.actionLabel }} {{ sensor.modifier }}
  </b-list-group-item>
</template>

<script>
import sensorDetails from "../smartcitizen";
import moment from "moment";

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
          details.modifier = `(${moment
            .duration(this.interval, "seconds")
            .humanize()})`;
          break;
        case "BIN":
          details.actionLabel = this.$t("message.bin");
          details.modifier = `(${this.bins.toString()})`;
          break;
        default:
          details.actionLabel = this.$t("message.share");
          details.modifier = "";
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
