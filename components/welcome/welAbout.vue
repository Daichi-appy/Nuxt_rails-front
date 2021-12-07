<template>
  <div>
    <v-card-title class="pb-5 text-subtitle-2 justify-center">
      アイディアや目標など、テーマを決めてカードにしたり、思いついたことをリストにしたり整理することができます。
    </v-card-title>

    <!-- <v-card-title class="text-subtitle-2 justify-center">
      「Rails6とNuxt.jsで作るユーザーJWT認証付きシングルページアプリケーション」
    </v-card-title> -->

    <v-btn
      class="d-flex mx-auto"
      width="150px"
      color="myblue"
      outlined
      to="/login"
    >
      利用を始める
    </v-btn>

    <v-card-text class="text-center">
      <a
        :href="gitHubUrl"
        rel="nofollow"
        target="_blank"
        class="text-decoration-none"
      >
        {{ gitHubUrl }}
      </a>
    </v-card-text>

    <v-row>

      <v-col
        cols="12"
        sm="6"
      >
        <v-list flat>
          <v-list-item
            v-for="(point, i) in points"
            :key="`point-${i}`"
          >
            <v-list-item-icon>
              <v-icon
                size="30"
                :color="point.color"
                v-text="point.icon"
              />
            </v-list-item-icon>
            <v-list-item-content>
              <div
                class="text-subtitle-1"
                v-text="point.text"
              />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-sparkline
          :value="sparkline.value"
          :gradient="sparkline.gradient"
          :smooth="sparkline.radius || false"
          :padding="sparkline.padding"
          :line-width="sparkline.width"
          :stroke-linecap="sparkline.lineCap"
          :gradient-direction="sparkline.gradientDirection"
          :fill="sparkline.fill"
          :type="sparkline.type"
          :auto-line-width="sparkline.autoLineWidth"
          auto-draw
        />
      </v-col>
    </v-row>

    <v-card-title class="text-subtitle-2 justify-center">
      採用している技術
    </v-card-title>

    <v-container
      fluid
      :style="{ maxWidth: '960px' }"
    >
      <v-row justify="space-around">
        <div
          v-for="(tec, i) in technologies"
          :key="`tec-${i}`"
          class="text-center pa-2"
        >
          <v-avatar
            :color="tec.color"
            size="80"
          >
            <span class="white--text">
              {{ tec.name }}
            </span>
          </v-avatar>
          <div class="pt-2 text-body-2 my-grey">
            {{ tec.use }}
          </div>
          <div class="pt-2 text-body-2 my-grey">
            {{ tec.v }}
          </div>
        </div>
      </v-row>
    </v-container>
  </div>

</template>

<script>
export default {
  data () {
    const gradients = [
      ['#222'],
      ['#42b3f4'],
      ['red', 'orange', 'yellow'],
      ['purple', 'violet'],
      ['#00c6ff', '#F0F', '#FF0']
    ]
    return {
      gitHubUrl: 'https://github.com/Daichi-appy',
      technologies: [
        { name: 'Docker', v: 'v20.10+', use: '開発環境', color: '#2496ED' },
        { name: 'Rails api', v: 'v6.0+', use: 'サーバーサイド', color: '#CC0000' },
        { name: 'Postgre SQL', v: '', use: 'データベース', color: '#336791' },
        { name: 'Nuxt.js spa', v: 'v2.13+', use: 'フロントエンド', color: '#00C48D' },
        { name: 'Heroku', v: '', use: 'ホスティング', color: '#6762A6' },
        { name: 'Vuetify', v: 'v2.3+', use: 'CSSフレームワーク', color: '#1867C0' }
      ],
      points: [
        {
          icon: 'mdi-file-table-box-multiple-outline',
          color: 'blue',
          text: '直感的な操作で快適に目標・テーマを作成'
        },
        {
          icon: 'mdi-chart-bar',
          color: 'green accent-4',
          text: 'テーマごとにタスクを設定'
        },
        {
          icon: 'mdi-chart-arc',
          color: 'deep-orange',
          text: 'ビジュアライズに優れたカテゴリー分け'
        }
      ],
      sparkline: {
        width: 4,
        radius: 10,
        padding: 4,
        lineCap: 'round',
        gradient: gradients[4],
        value: [0, 2, 5, 9, 5, 10, 8, 2, 9, 20],
        gradientDirection: 'right',
        gradients,
        fill: false,
        type: 'trend',
        autoLineWidth: true
      }
    }
  }
}
</script>