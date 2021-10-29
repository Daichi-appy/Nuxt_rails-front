<template>
  <div>
    <logged-in-nav-drawer 
      :drawer.sync="drawer"
    />
    <logged-in-app-bar>
      <template #nav-icon>
        <v-app-bar-nav-icon 
          @click="drawer = !drawer"
        />
      </template>
    </logged-in-app-bar>
  </div>
</template>

<script>
import LoggedInAppBar from './header/loggedInAppBar.vue'
import loggedInNavDrawer from './header/loggedInNavDrawer.vue'
export default {
  components: { loggedInNavDrawer, LoggedInAppBar },
  data () {
    return {
      drawer: null
    }
  }
}
</script>