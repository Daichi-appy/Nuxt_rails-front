<template>
  <logged-in-container>
    <template #my-content>
      <v-container>
        {{ $store.state.current.project }}
        <!-- 削除ボタン -->
        <v-row 
          class="mt-3"
        >
          <v-col>
            <h1>
              テーマ : {{ $store.state.current.project.name }}
            </h1>
          </v-col>

          <v-col
            align="center"
          >
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

          </v-col>
        </v-row>


        <v-row class="mt-3">
          <v-col
            cols="3"
            v-for="(task, i) in recentTasks"
            :key="i"
          >
            <v-card
            >
              <v-card-title>
                {{ task.content }}
              </v-card-title>
              <v-card-text>
                {{ $my.format(task.updated_at) }}
              </v-card-text>
              <v-card-actions>
                <v-btn>
                  編集
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

    </template>
  </logged-in-container>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      tasks: [],
      dialog: false
    }
  },
  computed: {
    recentTasks () {
      const copyTasks = Array.from(this.$store.state.tasks)
      return copyTasks.sort((a, b) => {
        if (a.updated_at > b.updated_at) { return 1 } 
        if (a.updated_at < b.updated_at) { return -1 }
        return 0
      })
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
    },
  }
}
</script>