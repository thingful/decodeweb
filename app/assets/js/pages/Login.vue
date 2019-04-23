<template>
  <div>
    <h1>{{ $t('message.login') }}</h1>
    <p>{{ $t('message.dashboardLogin') }}</p>

    <template v-if="loggedIn">
      <b-alert show variant="success">{{ $t('message.successfulLogin') }}</b-alert>
    </template>
    <template v-else>
      <template v-if="hasRequiredParams">
        <p>{{ $t('message.shareCredential') }}</p>

        <b-alert :show="error !== null" variant="danger">{{ error }}</b-alert>

        <div class="row mb-2">
          <div class="col">
            <b-form-select v-model="form.authorizable_attribute_id" :options="credentials"></b-form-select>
          </div>
        </div>

        <b-button
          block
          type="submit"
          :disabled="form.authorizable_attribute_id === null"
          variant="danger"
          @click="onLogin"
        >
          <b-spinner small v-if="loading"></b-spinner>
          {{ $t("message.doLogin") }}
        </b-button>
      </template>
      <template v-else>
        <b-alert show variant="danger">{{ $t('message.errors.missingLoginParams') }}</b-alert>
      </template>
    </template>
  </div>
</template>

<script>
import _ from "lodash";
import { LOGIN } from "../store/action-types";
import { CLEAR_ERROR } from "../store/mutation-types";

export default {
  data() {
    return {
      form: {
        sessionId: "",
        callback: "",
        authorizable_attribute_id: null
      },
      loading: false
    };
  },
  created() {
    this.form.sessionId = this.$route.query.sessionId || "";
    this.form.callback = this.$route.query.callback || "";
  },
  computed: {
    error: function() {
      return this.$store.state.error;
    },
    loggedIn: function() {
      return this.$store.state.loggedIn;
    },
    credentials: function() {
      let credentials = _(this.$store.state.configuration.memberships)
        .map(m => {
          return {
            value: m.authorizable_attribute.authorizable_attribute_id,
            text: m.policy.label
          };
        })
        .sort(m => m.text)
        .value();

      credentials.unshift({
        value: null,
        text: this.$t("message.selectCredential")
      });

      return credentials;
    }
  },
  watch: {
    error: function(newErr, oldErr) {
      this.loading = false;
    },
    loggedIn: function(newLoggedIn, oldLoggedIn) {
      this.loading = false;
    }
  },
  methods: {
    onLogin() {
      this.loading = true;
      this.$store.commit(CLEAR_ERROR);
      this.$store.dispatch(LOGIN, {
        sessionId: this.form.sessionId,
        callback: this.form.callback,
        authorizable_attribute_id: this.form.authorizable_attribute_id
      });
    },
    hasRequiredParams() {
      return !_.isEmpty(this.form.sessionId) && !_.isEmpty(this.form.callback);
    }
  }
};
</script>
