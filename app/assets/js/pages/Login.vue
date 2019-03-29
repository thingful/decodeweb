<style scoped>
.password {
  -webkit-text-security: disc;
}
</style>

<template>
  <div>
    <div class="row align-items-end full-height">
      <div class="col">
        <b-form @submit="onSubmit">
          <b-form-group id="pin-group" label="PIN:" label-for="pin" description="Enter your PIN">
            <b-form-input
              id="pin"
              v-model="pin"
              type="number"
              class="password"
              required
              placeholder="PIN"
              :state="validation"
            ></b-form-input>
            <b-form-invalid-feedback :state="validation">Your PIN must be at least 4 digits long</b-form-invalid-feedback>
          </b-form-group>

          <b-button block type="Submit" variant="primary">Sign In</b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import { LOGIN } from "../store/mutation-types";
import zenroom from "../zenroom";

export default {
  data() {
    return {
      pin: ""
    };
  },
  computed: {
    validation() {
      return this.pin.length >= 4;
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      let resp = zenroom.exec('print("hello world")');
      console.log(resp);

      this.$store.commit(LOGIN, { pin: this.pin });
      this.$router.replace({ name: "home" });
    }
  }
};
</script>
