<template>
  <v-avatar
    size="34"
    class="my-app-log"
  >
    <v-img v-bind:src="AppLogo"></v-img>
  </v-avatar>
</template>

<script>
export default {
  data() {
    return {
      AppLogo: require("@/assets/images/AppLogo/logo.png")
    }
  }
}
</script>

<style lang="scss" scoped>
.my-app-log {
  margin-right: 8px;
  cursor: pointer;
}
</style>