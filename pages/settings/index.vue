<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="onSubmit">
            <fieldset>
                <fieldset class="form-group">
                  <input v-model="setting.image" class="form-control" type="text" placeholder="URL of profile picture">
                </fieldset>
                <fieldset class="form-group">
                  <input v-model="setting.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
                </fieldset>
                <fieldset class="form-group">
                  <textarea v-model="setting.bio" class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input v-model="setting.email" class="form-control form-control-lg" type="email" placeholder="Email">
                </fieldset>
                <fieldset class="form-group">
                  <input v-model="password" class="form-control form-control-lg" minlength="8" type="password" placeholder="Password">
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
                </button>
            </fieldset>
          </form>
          <hr>
          <button class="btn btn-outline-danger" @click="logout()">
            Or click here to logout.
          </button>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { userSetting, updateSetting } from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'authenticated',
  name: 'SettingIndex',
  data() {
    return {
      setting: {
        image: '',
        username: '',
        bio: '',
        email: ''
      },
      password: ''
    }
  },
  async mounted() {
    const { data } = await userSetting()
    this.setting.image = data.user.image
    this.setting.username = data.user.username
    this.setting.bio = data.user.bio
    this.setting.email = data.user.email
  },
  methods: {
    async onSubmit () {
      const user = this.setting
      if (this.password) {
        user.password = password
      }
      const { data } = await updateSetting({ user })
      this.$router.push('/')
    },
    logout () {
      Cookie.remove('user')
      this.$store.commit('setUser', null)
      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
  
</style>
