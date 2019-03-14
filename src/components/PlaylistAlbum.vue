<template>
  <div id="album-page">
    <album-infos
      :title="infos.name"
      :number-of-tracks="tracks.length"
      image-url="/static/blank-album-400.png"
    ></album-infos>
    <div class="centerButton">
      <input class="inputStyle" type="text" placeholder="New name" v-model="newName">
      <v-btn v-on:click="changeName"> Change playlist name </v-btn>
    </div>
    <div>
      <v-btn class="centerButton" v-on:click="deletePlaylist"> delete playlist </v-btn>
    </div>
    <track-list :tracks="tracks"></track-list>
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
      tracks: [],
      imageUrl: '',
      newName: ''
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
    },
    async deletePlaylist() {
      await api.deletePlaylists(this.$route.params.playlistId);
      setTimeout(this.goToPlaylists, 100);
    },
    async goToPlaylists() {
      await this.$router.push('/playlists');
    },
    async changeName() {
      if (this.newName === '') {
        return false;
      } else if (this.newName !== '') {
        const infos = await api.getPlaylistInfosAndTracks(this.$route.params.playlistId);
        await api.changeNamePlaylist(this.$route.params.playlistId, this.newName,
          infos.owner.email);
        this.infos.name = this.newName;
        this.newName = '';
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="scss">

  .centerButton{
    display: table;
    margin: 0 auto;
  }

#album-card {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;

  #album-cover {
    width: 40%;
    max-width: 400px;
  }

  #info-album {
    display: flex;
    flex-direction: column;
    color: white;
  }
}

@media (max-width: 600px) {
  #album-card {
    height: 95vw;
    max-height: 440px;
    min-height: 300px;
    padding: 0;
    margin-top: 20px;

    #album-cover {
      width: 90vw;
      max-width: 400px;
      position: absolute;
      filter: blur(2px);
      opacity: 0.5;
      z-index: 1;
    }

    #info-album {
      z-index: 2;
    }
  }
}
</style>
