<template>
  <v-breadcrumbs
    :items="items"
  >
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item
        exact
        class="text-truncate"
      >
        {{ item.text }}
      </v-breadcrumbs-item>
    </template>
    <template v-slot:divier>
      <v-icon>
        mdi-chvron-right
      </v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  computed: {
    items () {
      return [
        { text: this.$my.pageTitle(this.$route.name) }
      ]
    }
  }
  
}
</script>