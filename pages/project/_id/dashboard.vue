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
                <!-- <delete-modal /> -->
                <!-- 削除編集menu -->
                <div class="ml-auto">
                  <v-menu
                    transition="scale-transition"
                    rounded="lg"
                  >
                    <template v-slot:activator="{ on, attrs }">
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
                        <v-btn small icon >
                          <v-icon color="green" @click="toSettings()">mdi-pencil</v-icon>
                        </v-btn>
                      </v-list-item>

                      <v-divider></v-divider>

                      <v-list-item>
                        <delete-modal />
                      </v-list-item>
                    </v-list>

                  </v-menu>
                </div>

              </v-card-title>
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
                        <updateTaskModal  :task_title="task.title" :task_id="task.id" />
                      </v-list-item>

                      <v-divider></v-divider>

                      <v-list-item>
                        <delete-task-modal :task_id="task.id" @delete-toaster="deleteToaster()" />
                      </v-list-item>
                    </v-list>

                  </v-menu>
                </div>

              </v-card-title>

              <!-- カレンダー -->
              <v-card-text>
                目標 : {{ task.period }}
                <datepicker :task_id="task.id" />
              </v-card-text>

              <!-- お気に入りスター -->
              <v-card-actions>
                <!-- <v-btn color="primary" icon @click="test">
                  <v-icon>
                    mdi-update
                  </v-icon>
                </v-btn> -->
                <!-- <delete-task-modal :task_id="task.id" @delete-toaster="deleteToaster()" /> -->
                <v-btn v-if="icon" class="ml-auto" @click="icon = !icon" icon >
                  <v-icon>mdi-star-outline</v-icon>
                </v-btn>

                <v-btn v-else class="ml-auto" @click="icon = !icon" icon >
                  <v-icon color="yellow darken-1">mdi-star</v-icon>
                </v-btn>
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
import datepicker from '../../../components/projects/datepicker.vue'

export default {
  components: { deleteTaskModal, toaster, updateTaskModal, datepicker },
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
      icon: true,
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
    },
    toSettings() {
      const id = this.$store.state.current.project.id
      this.$router.push(`/project/${id}/settings`)
    }
  }
}
</script>