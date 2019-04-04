<template>
  <div id="playlist-page" class="page blue-grey darken-4">
    <div class="centered-page">

      <div class="centered-title">
        <h1 class="large-thin-title">Playlists</h1>
        <h2 class="large-thin-subtitle">for {{ user.name }}</h2>
      </div>

      <div class="simple-input-field" v-if="!loading">
        <v-text-field
          label="playlist-name"
          placeholder="Name..."
          solo
          hide-details
          v-model="newPlayListName"
        ></v-text-field>
        <v-btn v-on:click="addPlaylist">Add playlist</v-btn>
      </div>

      <cover-list
        type="playlist"
        :covers="playlists"
        :wrap="true"
      ></cover-list>

      <loading-center v-if="loading"></loading-center>

    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import CoverList from '@/components/CoverList';
import LoadingCenter from '@/components/LoadingCenter';
import ubeat from '@/js/apis/ubeat';

export default {
  name: 'playlists',
  components: {
    CoverList,
    LoadingCenter
  },
  data() {
    return {
      user: {},
      playlists: [],
      newPlayListName: '',
      loading: true
    };
  },
  async mounted() {
    this.loadPage(this.$route.params.userId);
  },
  async beforeRouteUpdate(to, from, next) {
    await this.loadPage(to.params.userId);
    next();
  },
  async beforeMount() {
    const cookie = Cookies.get('uBeatCookie');
    if (!(cookie === null || cookie === undefined || cookie === '')) {
      const json = await ubeat.tokenInfo(cookie);
      const userId = json.id;
      this.$router.push({ path: `/users/${userId}/playlists` });
    } else {
      this.$router.push({ path: '/login' });
    }
  },
  methods: {
    async loadPage(userId) {
      this.resetPage();
      this.loading = true;
      this.loadUserInfos(userId);
      this.loadPlaylists(userId);
    },
    resetPage() {
      this.playlists = [];
      this.username = '';
    },
    async loadUserInfos(userId) {
      const user = await ubeat.getUserInfos(userId);
      this.user = user;
    },
    async loadPlaylists(userId) {
      const playlists = await ubeat.getUserPlaylists(userId);
      this.loading = false;
      this.playlists = playlists;
    },
    async addPlaylist() {
      if (this.newPlayListName !== '') {
        const infos = await ubeat.getUserInfos(this.$route.params.userId);
        const newPlaylist = await ubeat.addPlaylist(this.newPlayListName, infos.email);
        if (newPlaylist) {
          this.playlists.push(newPlaylist);
          this.newPlayListName = '';
        }
      }
    }
  },
};
</script>
