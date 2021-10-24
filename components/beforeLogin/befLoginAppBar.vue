<template>
  <v-app-bar
    app
    :height="appBarHeight"
    color="white"
  >
    <nuxt-link
      to="/"
      class="text-decoration-none"
    >
      <ui-appLogo />
    </nuxt-link>

    <ui-appTitle
      class="hidden-mobile-and-down"
    />

    <v-spacer />

    <beforeLogin-signupLink />
    <loginLink />
  </v-app-bar>
</template>

<script>
import loginLink from '~/components/beforeLogin/loginLink'
export default {
  components: {
    loginLink
  },
  data ({ $store }) {
    return {
      appBarHeight: $store.state.styles.beforeLogin.appBarHeight
    }
  }
}
</script>