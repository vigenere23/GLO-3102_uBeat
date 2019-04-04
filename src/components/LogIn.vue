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
        label="user-name"
        placeholder="Password..."
        type="password"
        solo
        hide-details
        v-model="userPassword">

      </v-text-field>
    </div>

    <div id="logIn">
      <v-btn v-on:click="addPlaylist">Log In</v-btn>
    </div>

  </div>
</template>

<script>
    export default {
      name: 'Profile',
      data() {
        return {
          userName: '',
          userPassword: ''
        };
      },
    };
</script>

<style scoped>
  #logIn{
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
