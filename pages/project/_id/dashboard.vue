<template>
  <logged-in-container>
    <template #my-content>
      {{ $store.state.current.project }}
      <v-container>

        <v-btn outlined color="red" @click="deleteProject">削除する</v-btn>

      </v-container>
    </template>
  </logged-in-container>
</template>

<script>
export default {
  methods: {
    deleteProject () {

      alert('削除しますか？')
      const projectId = this.$store.state.current.project.id
      // console.log(projectId)
      const url = `/api/v1/projects/${projectId}`

      // 削除リクエスト
      this.$axios
        .delete(url)
        .catch((err) => {
          console.log(err)
        })
        .then(
          this.$router.push('/')
        )
      // ホーム画面に戻る
    }
  }
}
</script>