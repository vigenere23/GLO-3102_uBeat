<template>
  <div>
  <div class="simple-input-field">
    <v-text-field
      label="user-name"
      placeholder="Email..."
      solo
      hide-details
      v-model="userEmail">

    </v-text-field>
    </div>

    <div class="simple-input-field">
      <v-text-field
        label="user-name"
        placeholder="Password..."
        type="password"
        solo
        hide-details
        v-model="userPassword">

      </v-text-field>
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
    import Cookies from 'js-cookie';
    import ubeat from '../js/apis/ubeat';

    export default {
      name: 'LogIn',
      data() {
        return {
          userEmail: '',
          userPassword: '',
          snackbar: false,
          snackbarMessage: '',
          color: 'red'

        };
      },
      methods: {
        async login() {
          if (this.userEmail.length === 0 || this.userPassword.length === 0) {
            this.snackbarMessage = 'you have an empty field';
            this.snackbar = true;
          } else {
            const json = await ubeat.login(this.userEmail, this.userPassword);
            if (json === null) {
              this.snackbarMessage = 'Email or password is invalid';
              this.snackbar = true;
            } else {
              const userId = json.id;
              await Cookies.set('uBeatCookie', json.token);
              this.$router.push({ path: `/users/${userId}/playlists` });
            }
          }
        },
        async redirect() {
          this.$router.push({ path: '/signup' });
        }
      },
      async beforeMount() {
        const cookie = Cookies.get('uBeatCookie');
        if (!(cookie === null || cookie === undefined || cookie === '')) {
          const json = await ubeat.tokenInfo(cookie);
          const userId = json.id;
          this.$router.push({ path: `/users/${userId}/playlists` });
        }
      }
    };
</script>

<style scoped>
  #logIn{
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
