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
      <v-row
        align="center"
        justify="center"
        :style="{ height: `${imgHeight}px` }"
      >
        <v-col
          cols="12"
          class="text-center"
        >
          <h1 class="display-1 mb-4">
            日々の気づきや振り返りを可視化
          </h1>
          <h4
            class="subheading"
            :style="{ letterSpacing: '5px' }"
          >
            やりたいこと、考えたいこと、ちょっとしたことをメモして管理できます。
          </h4>
        </v-col>
      </v-row>
    </v-img>

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
      ]
    }
  }
}
</script>