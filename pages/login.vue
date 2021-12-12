<template>
  <befLoginFormCard>
    <template #form-card-content>
      <!-- toaster -->
      <toaster />
      <v-form
        ref="form"
        v-model="isValid"
      >
        <userFormEmail
          :email.sync="params.auth.email"
          no-validation
        />
        <userFormPassword
          :password.sync="params.auth.password"
          no-validation
        />
      </v-form>
      <v-card-actions>
        <nuxt-link
          to="#"
          class="body-2 text-decoration-none"
        >
          パスワード忘れた？
        </nuxt-link>
      </v-card-actions>
      <v-card-text class="px-0">
        <v-btn
          :disabled="!isValid || loading"
          :loading="loading"
          block
          color="myblue"
          class="white--text"
          @click="login"
        >
          ログインする
        </v-btn>
      </v-card-text>
      <v-card-text class="px-0">
        <v-btn
          :loading="guestLoading"
          block
          color="myblue"
          class="white--text"
          @click="guestLogin"
        >
          ゲストログイン
        </v-btn>
      </v-card-text>
    </template>
  </befLoginFormCard>
</template>

<script>
import befLoginFormCard from '/components/beforeLogin/befLoginFormCard'
import userFormEmail from '/components/user/userFormEmail'
import userFormPassword from '/components/user/userFormPassword'
import toaster from '/components/ui/toaster'

export default {
  layout: 'beforeLogin',
  components: {
    befLoginFormCard,
    userFormEmail,
    userFormPassword,
    toaster
  },
  data () {
    return {
      isValid: false,
      loading: false,
      guestLoading: false,
      params: { auth: { email: '', password: ''} },
      guestParams: { auth: { email: 'user0@example.com', password: 'password' } }
    }
  },
  methods: {
    async login () {
      this.loading = true
      if (this.isValid) {
        await this.$axios.$post('/api/v1/user_token', this.params)
          .then(response => this.authSuccessful(response))
          .catch(error => this.authFailure(error))
      }
      this.loading = false
    },
    //ゲストログイン
    async guestLogin () {
      this.guestLoading = true
      await this.$axios.$post('/api/v1/user_token', this.guestParams)
        .then(response => this.authSuccessful(response))
        .catch(error => this.authFailure(error))
      this.guestLoading = false
    },
    // ログイン成功
    authSuccessful (response) {
      this.$auth.login(response)
      this.$router.push(this.$store.state.rememberRoute)
    },
    // ログイン失敗
    authFailure ({ response }) {
      return (response.status === 404)
        ? this.$store.dispatch('getToast', {msg: 'ユーザーが見つかりません😩' })
        : this.$my.errorHandler(response)
    }
  }
}
</script>