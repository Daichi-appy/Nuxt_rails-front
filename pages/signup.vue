<template>
  <befLoginFormCard>
    <template #form-card-content>
      <v-form
        v-model="isValid"
      >
        <userFormName />
        <userFormEmail />
        <userFormPassword />
        <v-btn
          :disabled="!isValid"
          block
          color="myblue"
          class="white--text"
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
      isValid: false
    }
  }
}
</script>