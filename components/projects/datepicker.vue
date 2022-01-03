<template>
  <v-menu
    :close-on-content-click="false"
    transition="scale-transition"
    :return-value.sync="date"
    max-width="290px"
    min-width="auto"
    v-model="menu"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn 
        icon 
        color="primary"
        v-on="on"
        v-bind="attrs"
      >
        <v-icon>
          mdi-calendar
        </v-icon>
    </v-btn>
    </template>

    <v-card>
      <v-date-picker
        :close-on-content-click="false"
        transition="scale-transition"
        :return-value.sync="date"
        v-model="picker"
      >
      </v-date-picker>
      <v-card-actions>
        <v-btn outlined color="primary" @click="updateTask()">update</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  props: {
    task_id: Number
  },
  data () {
    return {
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      picker: new Date().toISOString().substr(0, 10),
    }
  },
  methods: {
    async updateTask() {
      // console.log('update', this.title, this.task_id)
      const id = this.$store.state.current.project.id
      const task = { period: this.picker }
      await this.$axios
        .$patch(`/api/v1/tasks/${this.task_id}`, task)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
      await this.getTasks(id)
      this.menu = !this.menu
      this.updateToaster()
    },
    getTasks (id) {
        this.$axios.$get('/api/v1/tasks', { params:{ project_id: id } } )
        .then(response => this.$store.dispatch('getTasks', response))
    },
    updateToaster () {
      this.$store.dispatch('getToast', { msg: '期限を編集しました', color: 'success' })
    }
  }
}
</script>