<style scoped>
h2 {
  text-align: center;
}
</style>

<template>
  <div>
    <h1>{{ $t('message.joinCommunity')}}</h1>
    <h2>{{ policy.label }}</h2>

    <p>{{ $t('message.credentialSharing') }}</p>

    <b-alert :show="!!error" variant="danger">{{ error }}</b-alert>

    <b-form @submit="onSubmit">
      <b-form-group
        v-for="(info, index) in authorizableAttributeInfo"
        v-bind:key="index"
        :label="info.label"
        :id="info.id + '-fieldset'"
      >
        <b-form-input required :id="info.id" v-model="info.value" :type="info.type"></b-form-input>
      </b-form-group>

      <b-alert show variant="info">
        <small>{{ $t('message.credentialInfo') }}</small>
      </b-alert>

      <b-button block type="submit" variant="danger" :disabled="loading">
        <b-spinner small v-if="loading"></b-spinner>
        {{ $t("message.joinCommunity") }}
      </b-button>
    </b-form>
  </div>
</template>

<script>
import _ from "lodash";
import { REQUEST_CREDENTIAL } from "../store/action-types";
import { CLEAR_ERROR } from "../store/mutation-types";

export default {
  props: ["id", "attribute_id"],
  data() {
    return {
      authorizableAttributeInfo: [],
      loading: false
    };
  },
  mounted() {
    let attributeInfo = this.$store.state.configuration.pending_memberships[
      this.attribute_id
    ].authorizable_attribute.authorizable_attribute_info;

    attributeInfo.forEach(info => {
      let key = Object.keys(info)[0];
      var inputType;
      if (key === "email") {
        inputType = "email";
      } else {
        inputType = "text";
      }

      this.authorizableAttributeInfo.push({
        label: _.capitalize(key),
        id: key,
        type: inputType,
        value: null
      });
    });
  },
  computed: {
    device() {
      return this.$store.state.configuration.devices[this.id];
    },
    policy() {
      let membership =
        this.$store.state.configuration.pending_memberships[
          this.attribute_id
        ] || this.$store.state.configuration.memberships[this.attribute_id];
      return membership.policy;
    },
    error() {
      return this.$store.state.error;
    },
    membership() {
      return this.device.memberships[this.attribute_id];
    }
  },
  watch: {
    error: function(newErr, oldErr) {
      this.loading = false;
    },
    membership: function(newStream, oldStream) {
      this.$router.replace({
        name: "device",
        params: { id: this.id }
      });
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      // build our request to obtain a credential, and dispatch to the backend
      // where it will be sent to the credentials issuer
      let blindRequest = this.$store.state.configuration.pending_memberships[
          this.attribute_id
        ].blind_signature,
        values = this.authorizableAttributeInfo.map(i => {
          return { name: i.id, value: i.value };
        });

      let credentialRequest = {
        authorizable_attribute_id: this.attribute_id,
        blind_sign_request: blindRequest,
        values: values,
        optional_values: []
      };

      this.$store.dispatch(REQUEST_CREDENTIAL, {
        device_token: this.$route.params.id,
        credential_request: credentialRequest
      });

      this.$store.commit(CLEAR_ERROR);
      this.loading = true;
    }
  }
};
</script>
