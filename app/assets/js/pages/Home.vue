<template>
  <div>
    <div class="row">
      <div class="col-sm">
        <p>This is your personal data stored in the temporary DECODE app.</p>
      </div>
    </div>

    <div class="row">
      <div class="col-sm">
        <b-button block variant="primary" to="devices">Manage Devices</b-button>
        <b-button block variant="danger" @click="logout">Logout</b-button>
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
