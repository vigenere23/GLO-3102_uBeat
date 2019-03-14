<template>
  <div id="playlist-page" class="page blue-grey darken-4">
    <div class="centered-page">

      <div class="centered-title">
        <h1 class="large-thin-title">Playlists</h1>
        <h2 class="large-thin-subtitle">{{username}}</h2>
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
      username: '',
      playlists: []
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
      const infos = await api.getUserInfos(userId);
      this.username = infos.name;
    },
    async loadPlaylists(userId) {
      const playlists = await api.getUserPlaylists(userId);
      this.playlists = playlists;
    }
  }
};
</script>
