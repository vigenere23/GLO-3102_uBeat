<template>
    
</template>

<script>
    import Cookies from 'js-cookie';
    import ubeat from '@/js/apis/ubeat';

    export default {
      name: 'dynamicPlaylists',
      async beforeMount() {
        const cookie = Cookies.get('uBeatCookie');
        if (cookie) {
          const json = await ubeat.tokenInfo(cookie);
          const userId = json.id;
          this.$router.push({ path: `/users/${userId}/playlists` });
        } else {
          this.$router.push({ path: '/login' });
        }
      }
    };
</script>

<style scoped>

</style>
