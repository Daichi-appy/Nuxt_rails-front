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
        {{ task_id }}
      </v-card-text>
      <v-card-actions>
        <v-btn outlined color="primary" @click="updateTask()">
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
    },
    task_id: {
      type: Number
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
  },
  methods: {
    async updateTask() {
      // console.log('update', this.title, this.task_id)
      const id = this.$store.state.current.project.id
      const task = { project_id: id, title: this.title }
      await this.$axios
        .$patch(`/api/v1/tasks/${this.task_id}`, task)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
      await this.getTasks(id)
      this.dialog = !this.dialog
      this.updateToaster()
    },
    getTasks (id) {
        this.$axios.$get('/api/v1/tasks', { params:{ project_id: id } } )
        .then(response => this.$store.dispatch('getTasks', response))
    },
    updateToaster () {
      this.$store.dispatch('getToast', { msg: 'タスクを編集しました', color: 'success' })
    }
  }
}
</script>