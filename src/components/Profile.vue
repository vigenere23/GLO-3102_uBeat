<template>
  <div>
    <div>
      <h2> {{name}}</h2>
    </div>

    <div>
      <h2> {{email}}</h2>
    </div>

    <div>
      playlists
    </div>

    <div>
      follower
    </div>

    <div>
      friends
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import ubeat from '@/js/apis/ubeat';

  // TODO profile
  export default {
    name: 'profile.vue',
    data() {
      return {
        userId: '',
        playlists: [],
        newPlayListName: '',
        name: '',
        email: '',
        following: [],
        friend: []
      };
    },
    async beforeMount() {
      const cookie = Cookies.get('uBeatCookie');
      if (!(cookie === null || cookie === undefined || cookie === '')) {
        const json = await ubeat.tokenInfo(cookie);
        this.userId = json.id;
        this.name = json.name;
        this.email = json.email;
        this.following = json.following;
      } else {
        this.$router.push({ path: '/login' });
      }
    }
  };
</script>

<style scoped>

</style>
