<template>
  <div>
    <h1>{{ $t('message.reset')}}</h1>
    <p>{{ $t('message.resetText')}}</p>

    <b-button block type="submit" variant="danger" v-b-modal.confirm>{{ $t('message.reset')}}</b-button>

    <b-modal
      id="confirm"
      :title="$t('message.confirmation')"
      centered
      @ok="onConfirm"
      ok-variant="danger"
    >
      <p>{{ $t('message.resetConfirmationText') }}</p>
    </b-modal>
  </div>
</template>

<script>
import { RESET } from "../store/action-types";
export default {
  methods: {
    onConfirm() {
      this.$store.dispatch(RESET);
      this.$router.replace({
        name: "authenticate"
      });
    }
  }
};
</script>
