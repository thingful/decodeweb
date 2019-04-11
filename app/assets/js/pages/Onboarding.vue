<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    this.$router.replace({ name: "newDevice", query: this.$route.query });
  }
};
</script>
