<template>
  <b-list-group-item>
    {{ sensorName(sensor.name) }} ({{ sensor.unit }})
    <br>
    {{ sensor.actionLabel }}
    <small>{{ sensor.modifier }}</small>
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
          details.modifier = `(${this.binInfo(this.bins)})`;
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
    },
    binInfo: function(bins) {
      let info = `<${bins[0]}`;
      for (var i = 0; i < bins.length - 1; i++) {
        info += `, ${bins[i]}-${bins[i + 1]}`;
      }
      info += `, >${bins[bins.length - 1]}`;

      return info;
    },
    sensorName: function(name) {
      switch (name) {
        case "Battery SCK 1.1":
          return this.$t("message.batteryLevel");
          break;
        case "SHT31 - Temperature":
          return this.$t("message.temperatureSensor");
          break;
        case "ICS43432 - Noise":
          return this.$t("message.noiseSensor");
          break;
        case "BH1730FVC":
          return this.$t("message.lightSensor");
          break;
        case "MPL3115A2 - Barometric Pressure":
          return this.$t("message.pressureSensor");
          break;
        case "PMS5003_AVG-PM2.5":
          return this.$t("message.pm25Sensor");
          break;
        case "PMS5003_AVG-PM10":
          return this.$t("message.pm10Sensor");
          break;
        case "PMS5003_AVG-PM1":
          return this.$t("message.pm1Sensor");
          break;
        case "SHT31 - Humidity":
          return this.$t("message.humiditySensor");
          break;
        default:
          return name;
      }
    }
  }
};
</script>
