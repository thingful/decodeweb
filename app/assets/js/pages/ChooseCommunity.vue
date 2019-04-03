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

    <b-button
      block
      type="button"
      variant="danger"
      class="mt-3"
      :disabled="!selected || loading"
      @click="onJoin"
    >
      <b-spinner small v-if="loading"></b-spinner>
      {{ $t("message.joinCommunity") }}
    </b-button>

    <b-card :title="policy.label" class="mt-3" v-if="selected">
      <b-card-text>
        <p>{{ description }}</p>
        <h5>{{ $t('message.sensors') }}</h5>
      </b-card-text>
      <b-list-group flush v-if="policy.operations.length > 0">
        <operation
          :sensorId="op.sensor_id"
          :action="op.action"
          :interval="op.interval"
          :bins="op.bins"
          v-for="op in policy.operations"
          v-bind:item="op"
          v-bind:key="op.sensor_id"
        />
      </b-list-group>
      <b-list-group flush v-else>
        <b-list-group-item>{{ $t('message.shareAllSensors') }}</b-list-group-item>
      </b-list-group>
    </b-card>
  </div>
</template>

<script>
import {
  LOAD_POLICIES,
  LOAD_AUTHORIZABLE_ATTRIBUTE
} from "../store/action-types";
import operation from "../components/operation.vue";

export default {
  components: {
    operation
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
      return this.$store.state.policies[this.selected].descriptions[
        this.$i18n.locale
      ];
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
