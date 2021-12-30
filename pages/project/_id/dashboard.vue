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
            <toaster />
            <!-- <h1>
              テーマ : {{ $store.state.current.project.name }}
            </h1> -->
            <v-card>
              <v-card-text>
                <div>テーマ</div>
                <div>
                  <p class="text-h4 text--primary">
                    {{ $store.state.current.project.name }}
                    <!-- <v-btn absolute right></v-btn> -->
                    <delete-modal />
                  </p>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- <v-col
            align="center"
          >
            <delete-modal />

          </v-col> -->
        </v-row>

        <v-divider class="my-10"></v-divider>

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
                <v-btn color="primary" icon @click="test">
                  <v-icon>
                    mdi-update
                  </v-icon>
                </v-btn>
                <delete-task-modal :task_id="task.id" @delete-toaster="deleteToaster()" />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- ボタン右下 -->
          <add-task @add-toaster="addToaster()" />

      </v-container>

    </template>
  </logged-in-container>
</template>

<script>
import deleteTaskModal from '../../../components/deleteTaskModal.vue'
import toaster from '../../../components/ui/toaster'
export default {
  components: { deleteTaskModal, toaster },
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
    addToaster () {
      this.$store.dispatch('getToast', {msg: 'タスクを追加しました', color: 'success' })
    },
    deleteToaster () {
      this.$store.dispatch('getToast', {msg: 'タスクを削除しました', color: 'error' })
    },
    test () {
      console.log('update')
    }
  }
}
</script>