<template>
  <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn 
          outlined
          color="red"
          v-on="on"
          v-bind="attrs"
        >
          削除する
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
  data () {
    return {
      dialog: false,
      loading: false
    }
  },
  methods: {
    async deleteProject () {
      // ローディング開始
      this.loading = true
      // 現在のプロジェクトののidを格納
      const projectId = this.$store.state.current.project.id
      // console.log(projectId)
      const url = `/api/v1/projects/${projectId}`

      // 削除リクエスト
      await this.$axios
          .delete(url)
          .catch((err) => {
            console.log(err)
          })
      // Apiからvuexにデータ更新
      await this.replaceProject()
      // 少し待つ
      await this.resolveAfter(2)
      // ローディング終了
      this.loading = false
      // ホーム画面に戻る
      this.$router.push('/')
    },
    resolveAfter (sec) {
      return new Promise(resolve => setTimeout(resolve, sec*1000))
    },
    replaceProject () {
      this.$axios.$get('/api/v1/projects')
        .then(response => this.$store.dispatch('getProjects', response))
        .then(console.log("success replace"))
    }
  }
}
</script>