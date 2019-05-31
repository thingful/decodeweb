<style scoped>
.password {
  -webkit-text-security: disc;
}
</style>

<template>
  <div>
    <b-alert :show="!wasmAvailable" variant="danger" class="mt-4">
      <i18n path="message.errors.wasmNotAvailable">
        <a :href="wasmUrl" target="_blank">{{ wasmUrl }}</a>
      </i18n>
    </b-alert>
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

          <b-button
            block
            type="submit"
            variant="primary"
            :disabled="!validation || !wasmAvailable"
          >{{ $t("message.signIn") }}</b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import { AUTHENTICATE, CLEAR_PREVIOUS_TO } from "../store/mutation-types";
import { LOAD_POLICIES } from "../store/action-types";

export default {
  data() {
    return {
      pin: "",
      wasmUrl: "https://caniuse.com/#search=webassembly"
    };
  },
  computed: {
    validation() {
      return this.pin.length >= 4;
    },
    wasmAvailable() {
      try {
        if (
          typeof WebAssembly === "object" &&
          typeof WebAssembly.instantiate === "function"
        ) {
          const module = new WebAssembly.Module(
            Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00)
          );
          if (module instanceof WebAssembly.Module)
            return (
              new WebAssembly.Instance(module) instanceof WebAssembly.Instance
            );
        }
      } catch (e) {}
      return false;
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.$store.dispatch(LOAD_POLICIES);
      this.$store.commit(AUTHENTICATE, { pin: this.pin });

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
