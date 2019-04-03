<style>
body {
  height: 100%;
  margin: 0;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
}

h2 {
  font-size: 1.3rem;
}
</style>

<template>
  <div class="app-container container">
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item :to="{name: 'home'}">{{ $t('message.home') }}</b-nav-item>
          <b-nav-item :to="{name: 'devices'}">{{ $t('message.manageDevices') }}</b-nav-item>
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
//import socket from "./socket";

export default {
  mounted() {
    //let channel = socket.channel('decode:lobby', {});
    //channel.join()
    //  .receive('ok', resp => { console.log('Joined successfully', resp)})
    //  .receive('error', resp => { console.log('Unable to join', resp)});
  },
  methods: {
    logout() {
      this.$store.commit(LOGOUT);
      this.$router.replace({ name: "login" });
    }
  }
};
</script>
