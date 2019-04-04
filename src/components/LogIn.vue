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
    </div>

    <div>
      <v-snackbar
        v-model="snackbar"
        :timeout="4000">
        {{this.snackbarMessage}}
      </v-snackbar>
    </div>

  </div>
</template>

<script>
    import ubeat from '../js/apis/ubeat';

    export default {
      name: 'LogIn',
      data() {
        return {
          userEmail: '',
          userPassword: '',
          snackbar: false,
          snackbarMessage: ''

        };
      },
      methods: {
        async login() {
          if (this.userName.length === 0 || this.userPassword.length === 0) {
            this.snackbarMessage = 'you have an empty field';
            this.snackbar = true;
          } else {
            ubeat.login(this.userEmail, this.userPassword);
            // TODO erreur si usager n'existe pas
            // TODO log email et password variable globale
          }
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
