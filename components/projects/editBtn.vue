<template>
    <!-- <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          icon
          class="ml-auto"
        >
          <v-icon>
            mdi-dots-vertical
          </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu> -->
    <div class="ml-auto">
      <v-speed-dial
        v-model="fab"
        :direction="direction"
        :open-on-hover="hover"
        :transition="transition"
      >
        <template v-slot:activator>
          <v-btn
            v-model="fab"
            class="ml-auto"
            icon
          >
            <v-icon v-if="fab">
              mdi-dots-vertical
            </v-icon>
            <v-icon v-else>
              mdi-dots-vertical
            </v-icon>
          </v-btn>
        </template>
        <v-btn
          fab
          dark
          small
          color="green"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <delete-Task-Modal />
      </v-speed-dial>
    </div>
</template> 

<script>
// export default {
//   data () {
//     return {
//       items: [
//         {
//           title: "編集"
//         },
//         {
//           title: "削除"
//         }
//         ]
//     }
//   }
// }
  export default {
    data: () => ({
      direction: 'bottom',
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      transition: 'slide-y-transition',
    })
  }
</script>