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
          <b-form-group
            id="pin-group"
            :label="$t('message.pin')+':'"
            label-for="pin"
            :description="$t('message.enterPin')"
          >
            <b-form-input
              id="pin"
              v-model="pin"
              type="number"
              class="password"
              required
              :placeholder="$t('message.pin')"
              :state="validation"
            ></b-form-input>
            <b-form-invalid-feedback :state="validation">{{ $t("message.pinValidation") }}</b-form-invalid-feedback>
          </b-form-group>

          <b-button block type="submit" variant="primary">{{ $t("message.signIn") }}</b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import { LOGIN, CLEAR_PREVIOUS_TO } from "../store/mutation-types";
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
      this.$store.commit(LOGIN, { pin: this.pin });

      if (this.$store.state.previousTo) {
        this.$router.replace(this.$store.state.previousTo);
        this.$store.commit(CLEAR_PREVIOUS_TO);
      } else {
        this.$router.replace({ name: "home" });
      }
    }
  }
};
</script>
