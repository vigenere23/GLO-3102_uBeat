<template>
  <div>
  <div class="bigspace"></div>
    <div class="content">
      <h1>Do you want to logout?</h1>
      <v-btn v-on:click="redirect">Yes</v-btn>
    </div>
  </div>

</template>

<script>
    import Cookies from 'js-cookie'

    export default {
      name: 'LogOut',
      data() {
        return {
          userEmail: '',
          userPassword: '',
          snackbar: false,
          snackbarMessage: ''

        }
      },
      methods: {
        async redirect() {
          Cookies.remove('uBeatCookie')
          this.$router.push('/login')
        }
      },
      async beforeMount() {
        if (!Cookies.get('uBeatCookie')) {
          this.$router.push('/login')
        }
      }
    }
</script>

<style scoped>
.content {
  max-width: 500px;
  margin: auto;
}

  .bigspace {
    height: 17em;
  }
</style>
