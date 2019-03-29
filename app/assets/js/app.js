// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import 'phoenix_html';
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"

import App from './App.vue';
import store from './store';
import { INITIALIZE_CONFIG } from './store/mutation-types';
import router from './router';

new Vue({
  el: '#app',
  router,
  store,
  beforeCreate() {
    this.$store.commit(INITIALIZE_CONFIG);
  },
  render: h => h(App)
});