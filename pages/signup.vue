<template>
  <befLoginFormCard>
    <template #form-card-content>
      <v-form
        ref="form"
        v-model="isValid"
      >
        <userFormName
          :name.sync="params.user.name"
        />
        <userFormEmail
          :email.sync="params.user.email"
        />
        <userFormPassword
          :password.sync="params.user.password"
        />
        <v-btn
          :disabled="!isValid || loading"
          :loading="loading"
          block
          color="myblue"
          class="white--text"
          @click="signup"
        >
          登録する
        </v-btn>
      </v-form>
    </template>
  </befLoginFormCard>
</template>

<script>
import befLoginFormCard from '/components/beforeLogin/befLoginFormCard'
import userFormName from '/components/user/userFormName'
import userFormEmail from '/components/user/userFormEmail'
import userFormPassword from '/components/user/userFormPassword'

export default {
  layout: 'beforeLogin',
  components: {
    befLoginFormCard,
    userFormName,
    userFormEmail,
    userFormPassword
  },
  data () {
    return {
      isValid: false,
      loading: false,
      params: { user: { name: '', email: '', password:''} }
    }
  },
  methods: {
    signup () {
      this.loading = true
      this.postUser()
      // setTimeout(() => {
      //   this.formReset()
      //   this.loading = false
      // }, 1500)
      // console.log(this.params)
    },
    formReset () {
      this.$refs.form.reset()
      this.params = { user: { name: '', email: '', password: '' } }
    },
    async postUser () {
      const url = ('/api/v1/users')
      await this.$axios.post(url, this.params)
              .then((res) => {
                if (res.status === 200)
                  this.login()
              })
              .catch((err) => {
                console.log(err)
              })
    },
    async login () {
      const auth = { auth: { email: this.params.user.email , password: this.params.user.password } }
      await this.$axios.$post('/api/v1/user_token', auth)
          .then(response => this.authSuccessful(response))
          .catch(error => this.authFailure(error))
    },
    // ログイン成功
    authSuccessful (response) {
      this.$auth.login(response)
      this.$router.push(this.$store.state.rememberRoute)
    },
    // ログイン失敗
    authFailure ({ response }) {
      return (response.status === 404)
        ? this.$store.dispatch('getToast', {msg: 'ログインに失敗しました😩' })
        : this.$my.errorHandler(response)
    }

  }
}
</script>