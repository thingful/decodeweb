<style scoped>
</style>

<template>
  <div>
    <h1>{{ $t('message.device')}}: {{ device.deviceToken }}</h1>

    <h2>{{ $t('message.memberships') }}</h2>

    <b-list-group>
      <b-list-group-item
        v-for="community in device.memberships"
        v-bind:key="community.community_id"
      >
        <b-link
          :to="{name: 'deviceCommunity', params: { id: community.community_id }}"
        >{{ community.label }}</b-link>
      </b-list-group-item>
    </b-list-group>

    <b-form>
      <div class="form-row mt-3">
        <div class="col">
          <b-button
            block
            variant="primary"
            :to="{ name: 'choose', params: { id: device.deviceToken }}"
          >{{ $t('message.findCommunity') }}</b-button>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  computed: {
    device: function() {
      return this.$store.state.configuration.devices[this.$route.params.id];
    }
  }
};
</script>
