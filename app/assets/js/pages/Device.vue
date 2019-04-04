<style scoped>
</style>

<template>
  <div>
    <h1>{{ $t('message.device')}}: {{ device.deviceToken }}</h1>

    <h2>{{ $t('message.memberships') }}</h2>

    <b-list-group>
      <b-list-group-item
        v-for="membership in device.memberships"
        v-bind:key="membership.authorizable_attribute.authorizable_attribute_id"
      >
        <b-link
          :to="{name: 'deviceMembership', params: { id: device.deviceToken, attribute_id: membership.authorizable_attribute.authorizable_attribute_id }}"
        >{{ membership.policy.label }}</b-link>
      </b-list-group-item>
    </b-list-group>

    <b-form>
      <div class="form-row mt-3">
        <div class="col">
          <b-button
            block
            variant="primary"
            :to="{ name: 'choose', params: { id: device.deviceToken }}"
          >{{ $t('message.chooseCommunity') }}</b-button>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
import Octicon from "vue-octicon/components/Octicon.vue";

import "vue-octicon/icons/x";

export default {
  components: {
    Octicon
  },
  computed: {
    device: function() {
      return this.$store.state.configuration.devices[this.$route.params.id];
    }
  }
};
</script>
