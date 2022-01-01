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
              <v-card-subtitle>
                テーマ
              </v-card-subtitle>
              <v-card-title>
                <p class="text-h4">
                 {{ $store.state.current.project.name }}
                </p>
                  <!-- <v-btn absolute right></v-btn> -->
                <delete-modal />
              </v-card-title>
              <v-btn icon class="ml-auto">
                <v-icon>
                  mdi-dots-vertical
                </v-icon>
              </v-btn>
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
                <!-- 削除編集ボタンモーダル -->
                <div class="ml-auto">
                  <v-menu
                    transition="scale-transition"
                    rounded="lg"
                  >
                    <template v-slot:activator="{ on, attrs}">
                      <v-btn
                        v-on="on"
                        v-bind="attrs"
                        icon
                      >
                        <v-icon>
                          mdi-dots-vertical
                        </v-icon>
                      </v-btn>
                    </template>

                    <v-list>
                      <v-list-item>
                        <updateTaskModal  :task_title="task.title" />
                      </v-list-item>

                      <v-divider></v-divider>

                      <v-list-item>
                        <delete-task-modal :task_id="task.id" @delete-toaster="deleteToaster()" />
                      </v-list-item>
                    </v-list>

                  </v-menu>
                </div>

              </v-card-title>

              <v-card-text>
                {{ $my.format(task.updated_at) }}
                <v-btn icon color="primary">
                  <v-icon>
                    mdi-calendar
                  </v-icon>
                </v-btn>
              </v-card-text>
              <v-card-actions>
                <!-- <v-btn color="primary" icon @click="test">
                  <v-icon>
                    mdi-update
                  </v-icon>
                </v-btn> -->
                <!-- <delete-task-modal :task_id="task.id" @delete-toaster="deleteToaster()" /> -->
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
import updateTaskModal from '../../../components/projects/updateModal.vue'
export default {
  components: { deleteTaskModal, toaster, updateTaskModal },
  middleware: ['getTasks'],
  data () {
    return {
      direction: 'bottom',
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      transition: 'slide-y-transition',
      loading: false,
      dialog: false,
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
      console.log('Toaster')
    },
    test () {
      console.log('update')
    }
  }
}
</script>