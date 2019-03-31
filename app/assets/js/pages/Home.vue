<template>
  <div>
    <div class="row">
      <div class="col-sm">
        <p>{{ $t('message.homeText') }}</p>
      </div>
    </div>

    <div class="row">
      <div class="col-sm">
        <b-button block variant="primary" to="devices">{{ $t('message.manageDevices') }}</b-button>
        <b-button block variant="danger" @click="logout">{{ $t('message.logout') }}</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { LOGOUT } from "../store/mutation-types";

export default {
  methods: {
    logout() {
      this.$store.commit(LOGOUT);
      this.$router.replace({ name: "login" });
    }
  }
};
</script>
