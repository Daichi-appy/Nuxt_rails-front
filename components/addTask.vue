<template>

  <v-dialog
    v-model="dialog"
    max-width="600px"
  >
    <template v-slot:activator="{ on , attrs }">
      <v-btn 
        color="myblue"
        outlined
        v-on="on"
        v-bind="attrs"
      >
        <v-icon>
          mdi-plus
        </v-icon>
      </v-btn>
    </template>

    <v-card
      :loading = loading
    >

      <v-card-title>
        <span class="text-h5">
          Taskを新規作成
        </span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                label="Task Name"
                v-model="name"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col align="center">
              <v-chip color="success" outlined>
                目標 {{ picker }}
              </v-chip>
            </v-col>
          </v-row>
          <v-row>
            <v-col align="center">
              <v-date-picker 
                v-model="picker" 
                elevation="15"
                color="light-blue lighten-2"
                ></v-date-picker>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          outlined
          @click="dialog = false"
        >
          閉じる
        </v-btn>
        <v-btn
          color="blue darken-1"
          outlined
          @click="addTask()"
          :loading = loading
        >
          追加
        </v-btn>
      </v-card-actions>

    </v-card>


  </v-dialog>

</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      loading: false,
      name: '',
      picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    }
  },
  methods: {
    async addTask () {
      //
      const id = this.$store.state.current.project.id
      const task = { title: this.name, project_id: id } 
      this.loading = true
      // console.log(task)
      await this.$axios
        .$post('/api/v1/tasks', task)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
      // Apiに追加したデータをApiからget
      await this.resolveAfter(2)
      await this.getTasks(id)
      // Modalリセット
      this.dialog = false
      this.loading = false
      this.name = ''
    },
    resolveAfter (sec) {
      return new Promise(resolve => setTimeout(resolve, sec*1000))
    },
    getTasks (id) {
        this.$axios.$get('/api/v1/tasks', { params:{ project_id: id } } )
        .then(response => this.$store.dispatch('getTasks', response))
    }
  }
}
</script>