<template>
  <div id="album-page">

    <album-infos
      :title="infos.name"
      :number-of-tracks="tracks.length"
      image-url="/static/blank-album-400.png"
      :deleteButton="true"
      @delete="deletePlaylist"
    ></album-infos>

    <div class="simple-input-field">
      <v-text-field
        label="playlist-name"
        placeholder="New name..."
        solo
        hide-details
        v-model="newPlayListName"
      ></v-text-field>
      <v-btn v-on:click="changeName">Rename playlist</v-btn>
    </div>

    <track-list
      :listType="listType"
      :playlistId="playlistId"
      :tracks="tracks">
    </track-list>

  </div>
</template>

<script>
import api from '@/js/api';
import TrackList from '@/components/TrackList';
import AlbumInfos from '@/components/AlbumInfos';

export default {
  name: 'playlist-album',
  components: {
    TrackList,
    AlbumInfos
  },
  data() {
    return {
      infos: {},
      listType: 'playlist',
      tracks: [],
      imageUrl: '',
      playlistId: '',
      newPlayListName: ''
    };
  },
  async mounted() {
    this.loadPage(this.$route.params.playlistId);
  },
  async beforeRouteUpdate(to, from, next) {
    await this.loadPage(to.params.playlistId);
    next();
  },
  methods: {
    resetPage() {
      this.tracks = [];
      this.imageUrl = '';
    },
    loadPage(playlistId) {
      this.resetPage();
      this.loadPlaylistInfosAndTracks(playlistId);
    },
    async loadPlaylistInfosAndTracks(playlistId) {
      this.infos = await api.getPlaylistInfosAndTracks(playlistId);
      this.tracks = this.infos.tracks;
      this.playlistId = playlistId;
    },
    async deletePlaylist() {
      await api.deletePlaylists(this.$route.params.playlistId);
      setTimeout(this.goToPlaylists, 100);
    },
    async goToPlaylists() {
      await this.$router.push('/playlists');
    },
    async changeName() {
      if (this.newPlayListName) {
        const newInfos = await api.changeNamePlaylist(
          this.$route.params.playlistId,
          this.newPlayListName,
          this.infos.owner.email
        );
        if (newInfos) {
          this.infos = newInfos;
          this.newPlayListName = '';
        }
      }
    }
  }
};
</script>
