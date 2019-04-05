<template>
  <div>
    <h1>{{ $t('message.chooseCommunity')}}</h1>

    <h2>{{ $t('message.device') }}: {{ device.deviceToken }}</h2>

    <div class="form-row">
      <div class="col">
        <small>{{ $t('message.choosePolicy') }}</small>
      </div>
    </div>
    <div class="form-row">
      <div class="col-9">
        <b-form-select v-model="selected" :options="policyOptions"></b-form-select>
      </div>
      <div class="col">
        <b-button variant="outline-primary" @click="onReload">Reload</b-button>
      </div>
    </div>

    <b-alert
      :show="policyOptions.length === 0"
      variant="warning"
      class="mt-3"
    >{{ $t('message.noPoliciesAvailable') }}</b-alert>

    <div class="row">
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

export default {
  components: {
    //operation
    policyInfo
  },
  mounted() {
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
        device_token: this.$route.params.id,
        authorizable_attribute_id: this.selected
      });
      this.loading = true;
    }
  },
  computed: {
    device() {
      return this.$store.state.configuration.devices[this.$route.params.id];
    },
    policyOptions() {
      // we attempt to filter out any communities we are already a member of
      let memberships = this.$store.state.configuration.devices[
        this.$route.params.id
      ].memberships;

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
    membership() {
      return this.$store.state.configuration.devices[this.$route.params.id]
        .memberships[this.selected];
    }
  },
  watch: {
    membership: function(newMembership, oldMembership) {
      // TODO: maybe do something else if we don't get a membership info properly
      this.$router.replace({
        name: "join",
        params: { id: this.$route.params.id, attribute_id: this.selected }
      });
    }
  }
};
</script>
