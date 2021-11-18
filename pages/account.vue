<template>
  <v-container>
    <nuxt-child />
  </v-container>
</template>

<script>
export default {
  layout: 'loggedIn',
  middleware ({ route, redirect }) {
    if (route.name === 'account') { return redirect('/') }
  },
  validate ({ route }) {
    return route.name !== 'account'
  }
}
</script>