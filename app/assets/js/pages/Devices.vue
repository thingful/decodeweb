<template>
  <div>
    <h1>{{ $t('message.manageDevices')}}</h1>

    <div class="row">
      <div class="col-sm">
        <b-button
          block
          variant="primary"
          class="mt-2"
          to="/devices/new"
        >{{ $t('message.addDevice') }}</b-button>
      </div>
    </div>

    <div class="row mt-2">
      <div class="col">
        <b-list-group>
          <b-list-group-item v-for="device in devices" v-bind:key="device.deviceToken">
            <b-link
              :to="{ name: 'device', params: { id: device.deviceToken }}"
            >{{ $t('message.device') }}: {{ device.deviceToken }}</b-link>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    devices: function() {
      return this.$store.state.configuration.devices;
    },
    uid: function() {
      return this.$store.state.configuration.uuid;
    }
  }
};
</script>
