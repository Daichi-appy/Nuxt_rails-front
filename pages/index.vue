<template>
  <div id="logged-in-home">
    <v-parallax>
      <v-img
        :src="homeImg"
        alt="homeImg"
        :aspect-ratio="16/9"
        gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
      >
        <v-container
          fill-height
        >
          <v-row
            justify="center"
            align="center"
          >
            <v-col
              cols="12"
              :sm="container.sm"
              :md="container.md"
            >
              <v-card-title class="white--text">
                タスク一覧
              </v-card-title>

              <v-divider dark />

              <v-row
                align="center"
                class="my-2"
              >
                <v-col
                  cols="12"
                  :sm="card.sm"
                  :md="card.md"
                >
                  <modal
                    @add-project="addProject()"
                  />
                </v-col>

                <v-col
                  v-for="(project, i) in recentProjects.slice(0, 2)"
                  :key="`card-project-${i}`"
                  cols="12"
                  :sm="card.sm"
                  :md="card.md"
                >
                  <v-card
                    block
                    :height="card.height"
                    :elevation="card.elevation"
                    :to="$my.projectLinkTo(project.id)"
                    class="v-btn text-capitalize"
                  >
                    <v-card-title class="pb-1 d-block text-truncate">
                      {{ project.name }}
                    </v-card-title>
                    <v-card-text class="caption">
                      <v-icon size="14">
                        mdi-update
                      </v-icon>
                      {{ $my.format(project.updated_at) }}
                    </v-card-text>
                  </v-card>
                </v-col>

              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-img>
    </v-parallax>

    <v-container>
      <v-row justify="center">
        <v-col
          cols="12"
          :sm="container.sm"
          :md="container.md"
        >
          <v-card-title>
            全てのプロジェクト
          </v-card-title>

          <v-btn @click="test"></v-btn>

          <v-divider  class="mb-4" />
          
          <v-data-table
            :headers="tableHeaders"
            :items="recentProjects"
            item-key="id"
            hide-default-footer
          >
            <template v-slot:item.name="{ item }">
              <nuxt-link
                :to="$my.projectLinkTo(item.id)"
                class="text-decaration-none"
              >
                {{ item.name }}
              </nuxt-link>
            </template>
            <template v-slot:item.updated_at="{ item }">
              {{ $my.format(item.updated_at) }}
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
import homeImg from '~/assets/images/loggedIn/home.png'
import modal from '../components/modal.vue'

export default {
  components: { modal },
  middleware: ['authenticator', 'getProjects'],
  layout ({ $auth }) {
    return $auth.loggedIn ? 'loggedIn' : 'welcome'
  },
  data () {
    return {
      homeImg,
      container: {
        sm: 10,
        md: 8
      },
      card: {
        sm: 6,
        md: 4,
        height: 120,
        elevation: 4
      },
      tableHeaders: [
        {
          text: '名前',
          value: 'name'
        },
        {
          text: '更新日',
          width: 150,
          value: 'updated_at'
        }
      ]
    }
  },
  computed: {
    recentProjects () {
      const copyProjects = Array.from(this.$store.state.projects)
      return copyProjects.sort((a, b) => {
        if (a.updated_at > b.updated_at) { return -1 }
        if (a.updated_at < b.updated_at) { return 1 }
        return 0
      })
    }
  },
  methods: {
    addProject () {
      this.$axios.$get('/api/v1/projects')
        .then(response => this.$store.dispatch('getProjects', response))
        .then(console.log("success"))
    },
    // sortProjects () {
    //   const copyProjects = Array.from(this.$store.state.projects)
    //   copyProjects.sort((a, b) => {
    //     if (a.updated_at > b.updated_at) { return -1 }
    //     if (a.updated_at < b.updated_at) { return 1 }
    //     return 0
    //   })
    //   this.projects = copyProjects
    // },
    test () {
      console.log(this.recentProjects)
    }
  }
}
</script>

<!-- css 追加 -->
<style lang="scss">
#logged-in-home {
  .v-parallax__content {
    padding: 0;
  }
}
</style>