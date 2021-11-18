<template>
  <befLoginFormCard>
    <template #form-card-content>
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
    </template>
  </befLoginFormCard>
</template>

<script>
import befLoginFormCard from '/components/beforeLogin/befLoginFormCard'
import userFormEmail from '/components/user/userFormEmail'
import userFormPassword from '/components/user/userFormPassword'

export default {
  layout: 'beforeLogin',
  components: {
    befLoginFormCard,
    userFormEmail,
    userFormPassword
  },
  data () {
    return {
      isValid: false,
      loading: false,
      params: { auth: { email: '', password: ''} }
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
    // ログイン成功
    authSuccessful (response) {
      this.$auth.login(response)
      this.$router.push(this.$store.state.rememberRoute)
    },
    // ログイン失敗
    authFailure ({ response }) {
      console.log(response)
    }
  }
}
</script>