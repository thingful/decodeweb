<style scoped>
h2 {
  text-align: center;
}
</style>

<template>
  <div>
    <h1>{{ $t('message.joinCommunity')}}</h1>
    <h2>{{ policy.label }}</h2>

    <b-form @submit="onSubmit">
      <b-form-group
        v-for="(info, index) in authorizableAttributeInfo"
        v-bind:key="index"
        :label="info.label"
        :id="info.id + '-fieldset'"
      >
        <b-form-input required :id="info.id" v-model="info.value" :type="info.type"></b-form-input>
      </b-form-group>

      <b-button block type="submit" variant="danger">{{ $t("message.joinCommunity") }}</b-button>
    </b-form>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  data() {
    return {
      authorizableAttributeInfo: []
    };
  },
  mounted() {
    let attributeInfo = this.$store.state.configuration.devices[
      this.$route.params.id
    ].memberships[this.$route.params.attribute_id].authorizable_attribute
      .authorizable_attribute_info;

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
      return this.$store.state.configuration.devices[this.$route.params.id];
    },
    policy() {
      return this.$store.state.configuration.devices[this.$route.params.id]
        .memberships[this.$route.params.attribute_id].policy;
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      // build our request to obtain a credential, and dispatch to the backend
      // where it will be sent to the credentials issuer
      let attributeId = this.$route.params.attribute_id,
        blindRequest = this.$store.state.configuration.devices[
          this.$route.params.id
        ].memberships[attributeId].blind_signature,
        values = this.authorizableAttributeInfo.map(i => {
          return { name: i.id, value: i.value };
        });

      let credentialRequest = {
        authorizable_attribute_id: attributeId,
        blind_sign_request: blindRequest,
        values: values,
        optional_values: []
      };

      console.log(credentialRequest);
    }
  }
};
</script>
