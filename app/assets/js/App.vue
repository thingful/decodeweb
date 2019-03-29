<style>
body {
  height: 100%;
  margin: 0;
}
</style>

<template>
  <div class="app-container container">
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item @click="logout">Logout</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div class="row justify-content-center">
      <div class="col-4">
        <img src="images/logo.svg" class="m-2">
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import { LOGOUT } from "./store/mutation-types";

export default {
  methods: {
    logout() {
      this.$store.commit(LOGOUT);
      this.$router.replace({ name: "login" });
    }
  }
};
</script>
