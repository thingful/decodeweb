<template>
  <div>
    <h1>{{ $t('message.login') }}</h1>
    <p>{{ $t('message.dashboardLogin') }}</p>

    <b-button block type="submit" variant="primary">{{ $t("message.signIn") }}</b-button>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log("do the login logic");
  }
};
</script>
