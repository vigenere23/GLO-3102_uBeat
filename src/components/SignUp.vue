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

    <v-btn id="SignUp" v-on:click="addPlaylist">Sign Up</v-btn>

  </div>
    
</template>

<script>
    export default {
      name: 'LogIn',
      data() {
        return {
          userName: '',
          userPassword: '',
          userConfirmPassword: '',
          userEmail: '',
        };
      },
    };
</script>

<style scoped>
  #SignUp{
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
