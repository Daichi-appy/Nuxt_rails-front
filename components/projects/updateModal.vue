<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          small
          v-on="on"
          v-bind="attrs"
        >
          <v-icon color="green">mdi-pencil</v-icon>
        </v-btn> 
    </template>

    <v-card>
      <v-card-title>編集</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="title"
        >
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn outlined color="primary">
          登録
        </v-btn>
        <v-btn outlined color="red" @click="dialog = !dialog">
          キャンセル
        </v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script>
export default {
  props: {
    task_title: {
      type: String
    }
  },
  data () {
    return {
      dialog: false,
      title: "",
    }
  },
  mounted () {
    this.title = this.task_title
  }
}
</script>