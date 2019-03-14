<template>
  <div id="playlist-page" class="page blue-grey darken-4">
    <div class="centered-page">

      <div class="centered-title">
        <h1 class="large-thin-title">Playlists</h1>
        <h2 class="large-thin-subtitle">for {{ user.name }}</h2>
      </div>

      <div class="add-playlist">
        <v-text-field
          label="playlist-name"
          placeholder="Name..."
          solo
          hide-details
          v-model="newPlayListName"
        ></v-text-field>
        <v-btn v-on:click="addPlaylist"> Add playlist </v-btn>
      </div>

      <cover-list
        type="playlist"
        :covers="playlists"
        :wrap="true"
      ></cover-list>

    </div>
  </div>
</template>

<script>
import api from '@/js/api';
import CoverList from '@/components/CoverList';

export default {
  name: 'playlists',
  components: {
    CoverList
  },
  data() {
    return {
      user: {},
      playlists: [],
      newPlayListName: ''
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
      this.loadUserInfos(userId);
      this.loadPlaylists(userId);
    },
    resetPage() {
      this.playlists = [];
      this.username = '';
    },
    async loadUserInfos(userId) {
      const user = await api.getUserInfos(userId);
      console.log(user);
      this.user = user;
    },
    async loadPlaylists(userId) {
      const playlists = await api.getUserPlaylists(userId);
      this.playlists = playlists;
    },
    async addPlaylist() {
      if (this.newPlayListName !== '') {
        const infos = await api.getUserInfos(this.$route.params.userId);
        await api.addPlaylist(this.newPlayListName, infos.email);
        this.playlists.push({
          name: this.newPlayListName,
          owner: this.user,
          tracks: []
        });
        this.newPlayListName = '';
      }
    }
  }
};
</script>

<style lang="scss">
.add-playlist {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  button {
    flex-shrink: 0;
  }

  .v-input {
    max-width: 300px;
    min-width: 100px
  }
}
</style>
