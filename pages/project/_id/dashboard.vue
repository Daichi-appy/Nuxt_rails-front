<template>
  <logged-in-container>
    <template #my-content>
      <v-container>
        <!-- {{ $store.state.current.project }} -->
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
            <delete-modal />

          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <add-task />
          </v-col>
        </v-row>

        <!-- タスク一覧 -->
        <v-row class="mt-3">
          <v-col
            cols="3"
            v-for="(task, i) in recentTasks"
            :key="i"
          >
            <v-card
            >
              <v-card-title>
                {{ task.title }}
              </v-card-title>
              <v-card-text>
                {{ $my.format(task.updated_at) }}
              </v-card-text>
              <v-card-actions>
                <v-btn @click="test">
                  編集
                </v-btn>
                <delete-task-modal :task_id="task.id" />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

    </template>
  </logged-in-container>
</template>

<script>
import deleteTaskModal from '../../../components/deleteTaskModal.vue'
export default {
  components: { deleteTaskModal },
  middleware: ['getTasks'],
  data () {
    return {
      loading: false,
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
    test () {
      console.log()
    }
  }
}
</script>