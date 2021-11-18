<template>
  <v-app>
    <loggedInAppBar />
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import loggedInAppBar from '/components/loggedIn/header/loggedInAppBar'

export default {
  middleware: 'authenticator',
  components: {
    loggedInAppBar
  }
}
</script>
