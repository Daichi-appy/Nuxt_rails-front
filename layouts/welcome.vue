<template>
  <v-app>
    <welcome-wel-app-bar 
      :menus="menus"
      :img-height="imgHeight"
    />
    <v-img
      id="scroll-top"
      dark
      src="https://picsum.photos/id/20/1920/1080?blur=5"
      gradient="to top right, rgba(19,84,122,.6), rgba(128,208,199,.9)"
      :height="imgHeight"
    >
    <v-container>

        <v-row
          align="end"
          justify="center"
          :style="{ height: `${imgHeight}px` }"
        >
          <v-col
            cols="12"
            class="text-center"
          >
            <h1 class="display-1">
              日々の気づきや振り返りを可視化
            </h1>
            <h4
              class="subheading mb-4"
              :style="{ letterSpacing: '5px' }"
            >
              やりたいこと、考えたいこと、ちょっとしたことをメモして管理できます。
            </h4>
          </v-col>
          <!-- ボタン -->
          <v-col cols="12" align-self="start" class="text-center">
            <div 
              >
                <v-btn 
                  class="mr-2 mb-3"
                  color="blue"
                  width="150px"
                  to="/signup"
                >
                  <v-icon>mdi-account</v-icon>
                  会員登録
                </v-btn>
                <v-btn 
                  class="mr-2 mb-3"
                  color="green darken-1"
                  width="150px"
                  to="/login"
                >
                  <v-icon>mdi-account-check</v-icon>
                  ログイン
                </v-btn>
                <v-btn
                  class="mr-2 mb-3"
                  width="150px"
                  @click="githubLink()"
                >
                  <v-icon>mdi-github</v-icon>
                  GITHUB
                </v-btn>
              </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
              
          </v-col>
        </v-row>
    </v-container>
      <!-- <v-row>
        <v-col cols="12" class="">
          <v-btn>AAA</v-btn>
        </v-col>
      </v-row> -->
    </v-img>

    <!-- <v-divider class="mt-5"></v-divider> -->

    <v-sheet>
      <v-container
      >
        <v-row
        class="mt-5"
        justify="center"
        >
          <v-col
            cols="12"
            sm="6"
          >
            <v-card
            elevation="5"
            >
              <v-img
                v-bind:src="image_src3"
              >
              </v-img>
            </v-card>
          </v-col>
        </v-row>
        <v-row
          justify="center"
        >
          <v-col
            cols="12"
            sm="6"
          >
            テーマを決めて
          </v-col>
        </v-row>

        <v-row
          justify="center"
          class="mt-5"
        >
          <v-col
            cols="12"
            sm="6"
          >
            <v-card
              elevation="10"
            >
              <v-img
                v-bind:src="image_src1"
              >  
              </v-img>
            </v-card>
          </v-col>
        </v-row>

        <v-row
          justify="center"
        >
          <v-col
            cols="12"
            sm="6"
          >
            タスクに期限を設定して、カレンダーから確認できます！
          </v-col>
        </v-row>

      </v-container>
    </v-sheet>

    <v-sheet>
      <v-container
        fluid
        :style="{ maxWidth: '1280px' }"
        class="mt-5"
      >
        <v-row
          v-for="(menu, i) in menus"
          :key="`menu-${i}`"
        >
          <v-col
            :id="menu.title"
            cols="12"
          >
            <v-card flat>
              <v-card-title class="justify-center display-1">
                {{ menu.title }}
              </v-card-title>
              <v-card-text class="text-center">
                {{ menu.subtitle }}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <div :is="`wel-${menu.title}`" />
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <befLoginFooter />
  </v-app>
</template>

<script>
import welAppBar from '~/components/welcome/welAppBar'
import welAbout from '~/components/welcome/welAbout'
import welProducts from '~/components/welcome/welProducts'
// import welPrice from '~/components/welcome/welPrice'
import welContact from '~/components/welcome/welContact'
// import welCompany from '~/components/welcome/welCompany'
import befLoginFooter from '~/components/beforeLogin/befLoginFooter'

export default {
  components: {
    welAppBar,
    welAbout,
    welProducts,
    // welPrice,
    welContact,
    // welCompany,
    befLoginFooter
  },
  data () {
    return {
      imgHeight: 500,
      menus: [
        { title: 'about', subtitle: 'About' },
        // { title: 'products', subtitle: '' },
        // { title: 'price', subtitle: '会社の成長に合わせた3つのプラン' },
        { title: 'contact', subtitle: 'お気軽にご連絡を' },
        // { title: 'company', subtitle: '私たちの会社' }
      ],
      image_src1: require("@/assets/images/AppImage/IdeaStocker1.png"),
      image_src2: require("@/assets/images/AppImage/IdeaStocker2.png"),
      image_src3: require("@/assets/images/AppImage/IdeaStocker3.png"),
      image_src4: require("@/assets/images/AppImage/IdeaStocker4.png"),
    }
  },
  methods: {
    githubLink() {
      const url = 'https://github.com/Daichi-appy/Nuxt_rails-root'
      window.open(url, '_blank')
    }
  }
}
</script>