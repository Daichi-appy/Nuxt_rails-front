<template>
  <v-app>
    <befLoginAppBar />
    <v-main>
      <nuxt />
    </v-main>
    <beforeLogin-befLoginFooter />
  </v-app>
</template>

<script>
import befLoginAppBar from '/components/beforeLogin/befLoginAppBar'
export default {
  middleware: 'loggedInIsRedirects',
  components: {
    befLoginAppBar
  }
}
</script>