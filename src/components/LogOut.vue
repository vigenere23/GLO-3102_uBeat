<template>
    <div>
      <h2> Do you want to logout</h2>
      <v-btn v-on:click="redirect"> Yes </v-btn>
    </div>

</template>

<script>
    import Cookies from 'js-cookie';

    export default {
      name: 'LogOut',
      data() {
        return {
          userEmail: '',
          userPassword: '',
          snackbar: false,
          snackbarMessage: ''

        };
      },
      methods: {
        async redirect() {
          Cookies.set('uBeatCookie', '');
          this.$router.push('/login');
        }
      },
      async beforeMount() {
        const cookie = Cookies.get('uBeatCookie');
        if (cookie === null || cookie === undefined || cookie === '') {
          this.$router.push({ path: '/login' });
        }
      }
    };
</script>

<style scoped>

</style>
