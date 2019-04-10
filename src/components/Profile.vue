<template>
  <div>
    <div>
      <h1> {{name}}</h1>
    </div>

    <div>
      <h2> {{email}}</h2>
    </div>

    <div>
      <h3>Playlists</h3>
      <cover-list
        type="playlist"
        :covers="playlists"
        :wrap="true"
      ></cover-list>
    </div>

    <div>
      <h3>Following</h3>

    </div>

    <div v-if="userSearchResult">

    </div>

  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import ubeat from '@/js/apis/ubeat';
  import CoverList from '@/components/CoverList';

  // TODO profile
  export default {
    name: 'Profile',
    components: {
      CoverList
    },
    data() {
      return {
        userId: '',
        playlists: [],
        newPlayListName: '',
        name: '',
        email: '',
        following: [],
        userSearchResult: false
      };
    },
    async beforeMount() {
      if (this.$route.params.userTargetId) {
        this.userSearchResult = true;
        const infosUser = await ubeat.getUserInfos(this.$route.params.userTargetId);
        this.userId = infosUser.id;
        this.name = infosUser.name;
        this.email = infosUser.email;
        this.userSearchResult = true;
      } else {
        const cookie = Cookies.get('uBeatCookie');
        if (!(cookie === null || cookie === undefined || cookie === '')) {
          const json = await ubeat.tokenInfo(cookie);
          this.userId = json.id;
          this.name = json.name;
          this.email = json.email;
        } else {
          this.$router.push({ path: '/login' });
        }
      }
    },
    async mounted() {
      this.loadPlaylists(this.userId);
      this.loadFollowing(this.userId);
    },
    methods: {
      async loadPlaylists(userId) {
        this.playlists = await ubeat.getUserPlaylists(userId);
      },
      async loadFollowing(userId) {
        const infosUser = await ubeat.getUserInfos(userId);
        this.following = infosUser.following;
      }
    }
  };
</script>

<style scoped>

</style>
