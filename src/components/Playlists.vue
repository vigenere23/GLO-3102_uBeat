<template>
  <div id="playlist-page" class="page blue-grey darken-4">
    <div class="centered-page">

      <div class="centered-title">
        <h1 class="large-thin-title">Playlists</h1>
        <h2 class="large-thin-subtitle">for {{ user.name }}</h2>
      </div>

      <div class="simple-input-field">
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
import api from '@/js/api';
import CoverList from '@/components/CoverList';
import LoadingCenter from '@/components/LoadingCenter';

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
      const user = await api.getUserInfos(userId);
      this.user = user;
    },
    async loadPlaylists(userId) {
      const playlists = await api.getUserPlaylists(userId);
      this.loading = false;
      this.playlists = playlists;
    },
    async addPlaylist() {
      if (this.newPlayListName !== '') {
        const infos = await api.getUserInfos(this.$route.params.userId);
        const newPlaylist = await api.addPlaylist(this.newPlayListName, infos.email);
        if (newPlaylist) {
          this.playlists.push(newPlaylist);
          this.newPlayListName = '';
        }
      }
    }
  }
};
</script>
