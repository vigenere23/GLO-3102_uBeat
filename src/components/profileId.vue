<template>
  <div>
    <div class="profileInfos">
      <h1> {{name}}</h1>
    </div>

    <div class="profileInfos">
      <h2> {{email}}</h2>
    </div>

    <div v-if="userSearchResult">
      <v-btn v-on:click="unfollow" v-if="alreadyFollow">UNFOLLOW</v-btn>
      <v-btn v-on:click="follow" v-else>FOLLOW</v-btn>
    </div>

    <div class="profileInfos" id="playlistsInfos">
      <h3>Playlists</h3>
      <cover-list
        type="playlist"
        :covers="playlists"
        :wrap="true"
      ></cover-list>
    </div>

    <div id="followingInfos">
      <h3>Following</h3>
      <ul id="following">
        <div class="followingElements" v-for="(value, i) in following" :key="value.id || i" v-on:click="goToOtherProfile(value.id)">
          <span>Name: {{ value.name }}</span>
          <span>Email: {{ value.email }}</span>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import ubeat from '@/js/apis/ubeat';
  import CoverList from '@/components/CoverList';

  export default {
    name: 'userProfile',
    components: {
      CoverList
    },
    data() {
      return {
        userId: '',
        myId: '',
        playlists: [],
        newPlayListName: '',
        name: '',
        email: '',
        following: [],
        userSearchResult: false,
        alreadyFollow: false,
        cookie: ''
      };
    },
    async beforeRouteUpdate(to, from, next) {
      await this.fetchData();
      next();
    },
    async mounted() {
      await this.fetchData();
    },
    methods: {
      async fetchData() {
        await this.setMyId();
        if (this.$route.params.userTargetId) { // we are on a different user's profile page
          this.userSearchResult = true;
          const infosUser = await ubeat.getUserInfos(this.$route.params.userTargetId);
          this.userId = infosUser.id;
          this.name = infosUser.name;
          this.email = infosUser.email;
          this.userSearchResult = true;
          this.alreadyFollow = await this.determineIfFollowed(this.userId);
        } else { // we are on our own profile page
          this.cookie = Cookies.get('uBeatCookie');
          if (!(this.cookie === null || this.cookie === undefined || this.cookie === '')) {
            const json = await ubeat.tokenInfo(this.cookie);
            this.userId = json.id;
            this.name = json.name;
            this.email = json.email;
          } else {
            this.$router.push({ path: '/login' });
          }
        }
        this.loadPlaylists(this.userId);
        this.loadFollowing(this.userId);
      },
      async loadPlaylists(userId) {
        this.playlists = await ubeat.getUserPlaylists(userId);
      },
      async loadFollowing(userId) {
        const infosUser = await ubeat.getUserInfos(userId);
        this.following = infosUser.following;
      },
      async setMyId() {
        this.cookie = Cookies.get('uBeatCookie');
        if (!(this.cookie === null || this.cookie === undefined || this.cookie === '')) {
          const json = await ubeat.tokenInfo(this.cookie);
          this.myId = json.id;
        }
      },
      goToOtherProfile(otherUserId) {
        this.$router.push({ path: `/profile/${otherUserId}` });
      },
      async follow() {
        if (!(this.myId === '')) { // if passed therefore there's a cookie
          if (!(this.userId === '' || this.userId === this.myId)) {
            await ubeat.follow(this.userId, this.cookie);
          }
          this.alreadyFollow = true;
        } else {
          this.$router.push({ path: '/login' });
        }
      },
      async unfollow() {
        if (!(this.myId === '')) { // if passed therefore there's a cookie
          if (!(this.userId === '' || this.userId === this.myId)) {
            await ubeat.unfollow(this.userId, this.cookie);
            this.alreadyFollow = false;
          }
        } else {
          this.$router.push({ path: '/login' });
        }
      },
      async determineIfFollowed(targetUserId) {
        let followed = false;
        if (!(this.myId === '')) {
          const infosUser = await ubeat.getUserInfos(this.myId);
          const following = infosUser.following;
          for (let i = 0; i < following.length; i += 1) {
            if (following[i].id === targetUserId) {
              followed = true;
            }
          }
        }
        return followed;
      }
    }
  };
</script>

<style scoped>

  .profileInfos {
    margin-left: 5vh;
    margin-top: 1vh;
  }

  .profileInfos > h3 {
    margin-top: 5vw;
    margin-bottom: 2vw;
  }

  .followingElements {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    margin-bottom: 1vw;
    margin-left: 5vh;
  }

  #followingInfos  > h3{
    margin-left: 5vh;
    margin-bottom: 2vw;
  }

</style>

