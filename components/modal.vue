<template>

    <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          block
          height="120"
          v-bind="attrs"
          v-on="on"
        >
          <div>
            <v-icon
              size="24"
              color="myblue"
              class="my-2"
            >
              mdi-plus
            </v-icon>
            <div class="caption myblue--text">
              プロジェクトを追加
            </div>
          </div>
        </v-btn>
      </template>

      <v-card
        :loading = loading
      >

        <v-card-title>
          <span class="text-h5">
            Projectを新規作成
          </span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  label="Project Name"
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
            @click="addProject()"
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
      user_id: this.$store.state.current.user.id,
      name: "",
      picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      loading: false,
      // project: {
      //   user_id: this.user_id,
      //   name: this.name,
      //   picker: this.picker,
      //   updated_at: "2021-11-26T12:00:00.000+09:00"
      //   // period: "" 
      // }
    }
  },
  methods: {
    async addProject () {
      const project = { name: this.name }
      console.log(project)
      this.loading = true
      // this.$store.commit('setProjects', project)
      // this.name = ""
      // this.picker = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
      // this.period = ""
      await this.$axios
        .$post('/api/v1/projects', project)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
      await this.resolveAfter(2)
      this.$emit('add-project')
      this.dialog = false
    },
    resolveAfter (sec) {
      return new Promise(resolve => setTimeout(resolve, sec*1000))
    }

  }
}
</script>