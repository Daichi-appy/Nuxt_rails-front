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
      <v-card-text>
        {{ params }}
      </v-card-text>
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
      setTimeout(() => {
        this.formReset()
        this.loading = false
      }, 1500)
    },
    formReset () {
      this.$refs.form.reset()
      this.params = { user: { name: '', email: '', password: '' } }
    }
  }
}
</script>