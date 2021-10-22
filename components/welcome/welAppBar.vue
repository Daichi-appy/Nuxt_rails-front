<template>
  <v-app-bar
    app
    dark
  >
    <applogo />
    <v-toolbar-title>
      {{ appName }}
    </v-toolbar-title>

    <v-spacer />

    <v-toolbar-items class="ml-2">
      <v-btn
        v-for="(menu, i) in menus"
        :key="`menu-btn-${i}`"
        text
      >
        {{ $t(`menus.${menu.title}`) }}
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import applogo from '~/components/ui/appLogo'
export default {
  props: {
    menus: {
      type: Array,
      default: () => []
    }
  },
  components: {
    applogo
  },
  data ({ $config: { appName } }) {
    return {
      appName
    }
  }
}
</script>