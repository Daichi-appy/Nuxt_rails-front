<template>
  <v-app>
    index.vue
  </v-app>
</template>

<script>
export default {
  layout ({ store }) {
    return store.state.loggedIn ? 'loggedIn' : 'welcome'
  }
}
</script>