<template>
  <div>
    <h1>{{ $t('message.addDevice')}}</h1>

    <b-form v-if="show">
      <div class="form-row">
        <div class="col">
          <b-form-group
            id="device-label-group"
            :label="$t('message.deviceLabel') + ':'"
            label-for="device-label"
          >
            <b-form-input
              id="device-label"
              v-model="form.label"
              type="text"
              required
              :placeholder="$t('message.enterDeviceLabel')"
              :state="validLabel"
            ></b-form-input>
          </b-form-group>
        </div>
      </div>
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
              :state="validToken"
              autocapitalize="off"
              autocorrect="off"
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
              :state="validLongitude"
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
              :state="validLatitude"
            ></b-form-input>
          </b-form-group>
        </div>
      </div>
      <div class="form-row">
        <div class="col">
          <b-form-group :label="$t('message.exposure') + ':'">
            <b-form-radio-group v-model="form.exposure" name="exposure" :state="validExposure">
              <b-form-radio value="INDOOR">{{ $t('message.indoors') }}</b-form-radio>
              <b-form-radio value="OUTDOOR">{{ $t('message.outdoors') }}</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
        </div>
      </div>

      <div class="form-row">
        <div class="col">
          <b-button
            block
            variant="outline-secondary"
            :to="{ name: 'devices' }"
          >{{ $t('message.back') }}</b-button>
        </div>
        <div class="col">
          <b-button
            block
            type="button"
            variant="primary"
            :disabled="allValid"
            v-b-modal.confirm
          >{{ $t("message.confirm") }}</b-button>
        </div>
      </div>
    </b-form>

    <b-modal
      id="confirm"
      :title="$t('message.confirmation')"
      centered
      @ok="onConfirm"
      ok-variant="danger"
      :ok-title="$t('message.ok')"
      :cancel-title="$t('message.cancel')"
    >
      <p>{{ $t('message.deviceAdditionText') }}</p>
    </b-modal>
  </div>
</template>

<script>
import { ADD_DEVICE } from "../store/mutation-types";

export default {
  data() {
    return {
      form: {
        label: "",
        deviceToken: "",
        longitude: "",
        latitude: "",
        exposure: ""
      },
      exposureOptions: [
        { text: this.$t("message.indoors"), value: "INDOOR" },
        { text: this.$t("message.outdoors"), value: "OUTDOOR" }
      ],
      show: true
    };
  },
  created() {
    this.form.label = this.$route.query.device_name || "";
    this.form.deviceToken = this.$route.query.device_token || "";
    this.form.longitude = this.$route.query.lng || "";
    this.form.latitude = this.$route.query.lat || "";
    this.form.exposure = (this.$route.query.exposure || "").toUpperCase();
  },
  computed: {
    validLabel() {
      return this.form.label.length > 0;
    },
    validToken() {
      return this.form.deviceToken.length > 0;
    },
    validLongitude() {
      return (
        this.form.longitude.length > 0 &&
        this.form.longitude.match(/^-?\d+\.?(\d*)?$/) !== null
      );
    },
    validLatitude() {
      return (
        this.form.latitude.length > 0 &&
        this.form.latitude.match(/^-?\d+\.?(\d*)?$/) !== null
      );
    },
    validExposure() {
      return this.form.exposure !== "";
    },
    allValid() {
      return !(
        this.validLabel &&
        this.validToken &&
        this.validLongitude &&
        this.validLatitude &&
        this.validExposure
      );
    }
  },
  methods: {
    onConfirm(evt) {
      evt.preventDefault();
      this.$store.commit(ADD_DEVICE, {
        label: this.form.label,
        deviceToken: this.form.deviceToken,
        longitude: this.form.longitude,
        latitude: this.form.latitude,
        exposure: this.form.exposure,
        memberships: {}
      });

      this.$router.replace({
        name: "choose",
        params: {
          id: this.form.deviceToken
        }
      });
    }
  }
};
</script>
