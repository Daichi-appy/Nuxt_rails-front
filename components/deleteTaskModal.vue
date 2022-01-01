<template>
  <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn 
          small
          v-on="on"
          v-bind="attrs"
          class="ml-auto"
          icon
        >
          <v-icon color="red">
            mdi-delete
          </v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-container>

          <v-card-text>
            本当に削除しますか？
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="blue" 
              @click="dialog = !dialog"
            >
            いいえ
            </v-btn>
            <v-btn 
              color="red" 
              @click="deleteProject"
              :loading="loading"
            >
              削除します
            </v-btn>
          </v-card-actions>

        </v-container>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: {
    task_id: Number
  },
  data () {
    return {
      dialog: false,
      loading: false
    }
  },
  methods: {
    async deleteProject () {
      console.log(this.task_id)
      // ローディング開始
      // this.loading = true
      // 現在のプロジェクトののidを格納
      const task_id = this.task_id
      // 送信先URL
      const url = `/api/v1/tasks/${task_id}`

      // 削除リクエスト
      await this.$axios
          .delete(url)
          .catch((err) => {
            console.log(err)
          })
      // 少し待つ
      // await this.resolveAfter(2)
      // Apiからvuexにデータ更新
      this.replaceTasks()
      // ローディング終了,Modal閉じる
      // this.loading = false
      this.dialog = false
      // this.$emit('delete-toaster')
      this.deleteToaster()
    },
    resolveAfter (sec) {
      return new Promise(resolve => setTimeout(resolve, sec*1000))
    },
    async replaceTasks () {
      const id = this.$store.state.current.project.id
      await this.$axios.$get('/api/v1/tasks', { 
        params: { 
          project_id: id
        } 
      })
      .then(response => this.$store.dispatch('getTasks', response))
      .then(console.log("success replace"))
    },
    deleteToaster () {
      this.$store.dispatch('getToast', {msg: 'タスクを削除しました', color: 'error' })
      console.log('Toaster')
    }
  }
}
</script>