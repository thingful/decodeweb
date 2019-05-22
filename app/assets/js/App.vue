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

.logo {
  width: 5rem;
}
</style>

<template>
  <div class="app-container container">
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="pin">
          <b-nav-item :to="{name: 'home'}">{{ $t('message.home') }}</b-nav-item>
          <b-nav-item :to="{name: 'devices'}">{{ $t('message.manageDevices') }}</b-nav-item>
          <b-nav-item @click="logout">Logout</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item @click="onLang" data-value="en">EN</b-dropdown-item>
            <b-dropdown-item @click="onLang" data-value="es">ES</b-dropdown-item>
            <b-dropdown-item @click="onLang" data-value="ca">CA</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div class="row justify-content-center">
      <div class="col text-center">
        <img src="images/logo.svg" alt="DECODE Logo" class="m-2 logo">
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import { LOGOUT } from "./store/mutation-types";

export default {
  computed: {
    pin() {
      return this.$store.state.pin;
    }
  },
  methods: {
    logout() {
      this.$store.commit(LOGOUT);
      this.$router.replace({ name: "authenticate" });
    },
    onLang(evt) {
      this.$i18n.locale = evt.currentTarget.dataset.value;
    }
  }
};
</script>
