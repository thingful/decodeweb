<template>
  <div>
    <h1>{{ $t('message.addDevice')}}</h1>

    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <div class="form-row">
        <div class="col">
          <b-form-group
            id="device-token-group"
            :label="$t('message.deviceToken') + ':'"
            label-for="device-token"
          >
            <b-form-input
              id="device-token"
              v-model="form.deviceToken"
              type="text"
              required
              :placeholder="$t('message.enterDeviceToken')"
              :state="tokenValidation"
            ></b-form-input>
          </b-form-group>
        </div>
      </div>
      <div class="form-row">
        <div class="col">
          <b-form-group
            id="longitude-group"
            :label="$t('message.longitude') + ':'"
            label-for="longitude"
          >
            <b-form-input
              id="longitude"
              v-model="form.longitude"
              type="number"
              step="any"
              required
              :placeholder="$t('message.enterLongitude')"
              :state="longitudeValidation"
            ></b-form-input>
          </b-form-group>
        </div>

        <div class="col">
          <b-form-group
            id="latitude-group"
            :label="$t('message.latitude') + ':'"
            label-for="latitude"
          >
            <b-form-input
              id="latitude"
              v-model="form.latitude"
              type="number"
              step="any"
              required
              :placeholder="$t('message.enterLatitude')"
              :state="latitudeValidation"
            ></b-form-input>
          </b-form-group>
        </div>
      </div>
      <div class="form-row">
        <div class="col">
          <b-form-group :label="$t('message.exposure') + ':'">
            <b-form-radio-group
              v-model="form.exposure"
              :options="exposureOptions"
              name="exposure"
              :state="exposureValidation"
            ></b-form-radio-group>
          </b-form-group>
        </div>
      </div>

      <div class="form-row">
        <div class="col">
          <b-button variant="outline-secondary" :to="{ name: 'devices' }">{{ $t('message.back') }}</b-button>
        </div>
        <div class="col">
          <b-button type="submit" variant="primary">{{ $t("message.addDevice") }}</b-button>
          <b-button type="reset" variant="danger">{{ $t("message.reset") }}</b-button>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
import { ADD_DEVICE } from "../store/mutation-types";

export default {
  data() {
    return {
      form: {
        deviceToken: "",
        longitude: "",
        latitude: "",
        exposure: ""
      },
      exposureOptions: [
        { text: "Indoors", value: "INDOOR" },
        { text: "Outdoors", value: "OUTDOOR" }
      ],
      show: true
    };
  },
  created() {
    this.form.deviceToken = this.$route.query.token || "";
    this.form.longitude = this.$route.query.long || "";
    this.form.latitude = this.$route.query.lat || "";
    this.form.exposure = this.$route.query.exposure || "";
  },
  computed: {
    tokenValidation() {
      return this.form.deviceToken.length > 0;
    },
    longitudeValidation() {
      return (
        this.form.longitude.length > 0 &&
        this.form.longitude.match(/^\d+\.?(\d*)?$/) !== null
      );
    },
    latitudeValidation() {
      return (
        this.form.latitude.length > 0 &&
        this.form.latitude.match(/^\d+\.?(\d*)?$/) !== null
      );
    },
    exposureValidation() {
      return this.form.exposure !== "";
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.$store.commit(ADD_DEVICE, {
        deviceToken: this.form.deviceToken,
        longitude: this.form.longitude,
        latitude: this.form.latitude,
        exposure: this.form.exposure,
        memberships: {}
      });
      this.$router.replace({ name: "devices" });
    },
    onReset(evt) {
      evt.preventDefault();
      this.form.deviceToken = "";
      this.form.longitude = "";
      this.form.latitude = "";
      this.form.exposure = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>
