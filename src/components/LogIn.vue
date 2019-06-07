<template>
  <div>
  <div class="simple-input-field">
    <v-text-field
      label="user-name"
      placeholder="Email..."
      solo
      hide-details
      v-model="userEmail"
    ></v-text-field>
    </div>

    <div class="simple-input-field">
      <v-text-field
        label="user-name"
        placeholder="Password..."
        type="password"
        solo
        hide-details
        v-model="userPassword"
      ></v-text-field>
    </div>

    <div id="logIn">
      <v-btn v-on:click="login">Log In</v-btn>
      <v-btn v-on:click="redirect">Sign Up</v-btn>
    </div>

    <div>
      <v-snackbar
        v-model="snackbar"
        :timeout="4000"
        :top=true
        :color="color">
        {{this.snackbarMessage}}
      </v-snackbar>
    </div>

  </div>
</template>

<script>
import Cookies from 'js-cookie'
import ubeat from '@/js/apis/ubeat'

export default {
  name: 'LogIn',
  data () {
    return {
      userEmail: '',
      userPassword: '',
      snackbar: false,
      snackbarMessage: '',
      color: 'red'

    }
  },
  methods: {
    async login () {
      if (!this.userEmail || !this.userPassword) {
        this.snackbarMessage = 'you have an empty field'
        this.snackbar = true
      } else {
        const response = await ubeat.login(this.userEmail, this.userPassword)
        if (!response) {
          this.snackbarMessage = 'Email or password is invalid'
          this.snackbar = true
        } else {
          Cookies.set('uBeatCookie', response.token)
          this.$router.push(`/users/${response.id}/playlists`)
        }
      }
    },
    async redirect () {
      this.$router.push({ path: '/signup' })
    }
  },
  async beforeMount () {
    const cookie = Cookies.get('uBeatCookie')
    if (cookie) {
      const user = await ubeat.tokenInfo(cookie)
      this.$router.push(`/users/${user.id}/playlists`)
    }
  }
}
</script>

<style scoped>
  #logIn{
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
