<template>
  <logged-in-container>
    <template #my-content>
      {{ $store.state.current.project }}
      <v-container>

        <v-btn 
          outlined
          color="red"
          :loading = loading
          @click="deleteProject">削除する
        </v-btn>

      </v-container>
    </template>
  </logged-in-container>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
    }
  },
  methods: {
    async deleteProject () {
      alert('削除しますか？')
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
    },
  }
}
</script>