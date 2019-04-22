<template>
  <div>
    <h1>{{ $t('message.login') }}</h1>
    <p>{{ $t('message.dashboardLogin') }}</p>

    <p>Please choose a credential to send to the dashboard</p>

    <b-button block type="submit" variant="primary">{{ $t("message.signIn") }}</b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        sessionId: "",
        callback: ""
      }
    };
  },
  created() {
    this.form.sessionId = this.$route.query.sessionId || "";
    this.form.callback = this.$route.query.callback || "";
  },
  computed: {}
};
</script>
