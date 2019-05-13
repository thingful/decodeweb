<style scoped>
h2 {
  text-align: center;
}
</style>

<template>
  <div>
    <h1>{{ $t('message.chooseCommunity')}}</h1>

    <h2>{{ device.label }}</h2>

    <div class="form-row">
      <div class="col">
        <b-alert show variant="info">
          <small>{{ $t('message.choosePolicy') }}</small>
        </b-alert>
      </div>
    </div>
    <div class="form-row">
      <div class="col-9">
        <b-form-select v-model="selected" :options="policyOptions">Please select an option</b-form-select>
      </div>
      <div class="col">
        <b-button variant="outline-primary" block @click="onReload">{{ $t('message.reload') }}</b-button>
      </div>
    </div>

    <b-alert
      :show="!!error"
      variant="danger"
      class="mt-3"
    >{{ $t('message.noPoliciesAvailable') }} - {{ error }}</b-alert>

    <div class="row mt-3">
      <div class="col">
        <b-button
          block
          variant="outline-secondary"
          :to="{ name: 'device', params: { id: device.deviceToken }}"
        >{{ $t('message.back') }}</b-button>
      </div>
      <div class="col">
        <b-button
          block
          type="button"
          variant="danger"
          :disabled="!selected || loading"
          @click="onJoin"
        >
          <b-spinner small v-if="loading"></b-spinner>
          {{ $t("message.joinCommunity") }}
        </b-button>
      </div>
    </div>

    <policy-info :policy="policy" :description="description" :selected="selected"></policy-info>
  </div>
</template>

<script>
import {
  LOAD_POLICIES,
  LOAD_AUTHORIZABLE_ATTRIBUTE
} from "../store/action-types";

import policyInfo from "../components/policyInfo.vue";
import { CLEAR_ERROR } from "../store/mutation-types";

export default {
  props: ["id"],
  components: {
    policyInfo
  },
  created() {
    this.$store.dispatch(LOAD_POLICIES);
  },
  data() {
    return {
      selected: null,
      loading: false
    };
  },
  methods: {
    onReload() {
      this.$store.dispatch(LOAD_POLICIES);
    },
    onJoin() {
      this.$store.dispatch(LOAD_AUTHORIZABLE_ATTRIBUTE, {
        device_token: this.id,
        authorizable_attribute_id: this.selected
      });
      this.loading = true;
    }
  },
  computed: {
    device() {
      return this.$store.state.configuration.devices[this.id];
    },
    error() {
      return this.$store.state.error;
    },
    policyOptions() {
      // we attempt to filter out any communities we are already a member of
      let memberships = this.$store.state.configuration.devices[this.id]
        .memberships;

      return this.$store.getters.policyOptions.filter(opt => {
        return !memberships[opt.value];
      });
    },
    policy() {
      return this.$store.state.policies[this.selected];
    },
    description() {
      if (this.policy) {
        return this.policy.descriptions[this.$i18n.locale];
      }
    },
    pendingMembership() {
      return this.$store.state.configuration.pending_memberships[this.selected];
    },
    membership() {
      return this.device.memberships[this.selected];
    }
  },
  watch: {
    pendingMembership: function(newPendingMembership, oldPendingMembership) {
      // TODO: maybe do something else if we don't get a membership info properly
      this.$router.replace({
        name: "join",
        params: { id: this.id, attribute_id: this.selected }
      });
    },
    // watch membership, and if it appears (because we already have a valid
    // credential for the community), then redirect to the device page because
    // we don't need to do any more work.
    membership: function(newMembership, oldMembership) {
      this.$router.replace({
        name: "device",
        params: { id: this.id }
      });
    },
    error: function(newError, oldError) {
      console.log("*************");
      console.log(oldError);
      console.log(newError);
      console.log("*************");
      this.loading = false;
    }
  }
};
</script>
