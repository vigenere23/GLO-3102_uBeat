<template>
  <div>
    <div class="simple-input-field">
      <v-text-field
        label="user-name"
        placeholder="Name..."
        solo
        hide-details
        v-model="userName">

      </v-text-field>
    </div>

    <div class="simple-input-field">
      <v-text-field
        label="email"
        placeholder="Email..."
        solo
        hide-details
        v-model="userEmail">

      </v-text-field>
    </div>

    <div class="simple-input-field">
      <v-text-field
        label="password"
        placeholder="Password..."
        type="password"
        solo
        hide-details
        v-model="userPassword">

      </v-text-field>
    </div>

    <div class="simple-input-field">
      <v-text-field
        label="confirm-password"
        placeholder="Confirm Password..."
        type="password"
        solo
        hide-details
        v-model="userConfirmPassword">

      </v-text-field>
    </div>

    <div id="SignUp">
      <v-btn v-on:click="createUser">Sign Up</v-btn>
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
    import * as Cookies from 'js-cookie';
    import ubeat from '../js/apis/ubeat';


    export default {
      name: 'SignUp',
      data() {
        return {
          snackbar: false,
          userName: '',
          userPassword: '',
          userConfirmPassword: '',
          userEmail: '',
          snackbarMessage: '',
          color: 'red'
        };
      },
      methods: {
        async createUser() {
          if (this.userName.length === 0 || this.userEmail.length === 0
            || this.userPassword.length === 0 || this.userConfirmPassword.length === 0) {
            this.snackbarMessage = 'you have an empty field';
            this.snackbar = true;
          } else if (this.userPassword === this.userConfirmPassword) {
            await ubeat.signup(this.userName, this.userEmail, this.userPassword);
            const json = await ubeat.login(this.userEmail, this.userPassword);
            if (json === null) {
              this.snackbarMessage = 'Email or password is invalid';
              this.snackbar = true;
            } else {
              const userId = json.id;
              await Cookies.set('uBeatCookie', json.token);
              this.$router.push({ path: `/users/${userId}/playlists` });
            }
          } else {
            this.snackbarMessage = 'password and confirm password should be the same';
            this.snackbar = true;
            this.userPassword = '';
            this.userConfirmPassword = '';
          }
        }
      }
    };
</script>

<style scoped>
  #SignUp{
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
