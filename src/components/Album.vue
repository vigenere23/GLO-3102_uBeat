<template>
  <div id="album-page">
    <v-card id="album-card" class="blue-grey darken-4">
      <v-img
        id="album-cover"
        :src="imageUrl"
      >
      </v-img>
      <v-card-title primary-title>
        <div id="info-album">
          <h1>{{ infos.collectionName }}</h1>
          <h2>{{ infos.artistName }}</h2>
          <h3>Release on {{ releaseDate }}</h3>
          <h4>{{ infos.primaryGenreName }} &bull; {{ numberOfTracksText }}</h4>
          <h4>{{ infos.contentAdvisoryRating }}</h4>
          <a class="itunes-link" target="_blank" :href="itunesLink"></a>
        </div>
      </v-card-title>
    </v-card>
    <album-tracks-list :tracks="tracks"></album-tracks-list>
  </div>
</template>

<script>
import api from '@/js/api';
import helper from '@/js/helper';
import AlbumTracksList from '@/components/AlbumTracksList';

export default {
  name: 'album',
  components: {
    AlbumTracksList
  },
  data() {
    return {
      infos: {},
      tracks: [],
      itunesLink: '',
      numberOfTracks: 0,
      releaseDate: '',
      imageUrl: ''
    };
  },
  computed: {
    numberOfTracksText() {
      const songText = this.numberOfTracks > 1 ? 'songs' : 'song';
      return `${this.numberOfTracks} ${songText}`;
    }
  },
  async mounted() {
    this.loadPage(this.$route.params.albumId);
  },
  async beforeRouteUpdate(to, from, next) {
    await this.loadPage(to.params.albumId);
    next();
  },
  methods: {
    resetPage() {
      this.tracks = [];
    },
    loadPage(albumId) {
      this.resetPage();
      this.loadAlbumInfos(albumId);
      this.loadTracks(albumId);
    },
    async loadAlbumInfos(albumId) {
      this.infos = await api.getAlbumInfos(albumId);
      this.itunesLink = helper.getItunesLink(this.infos.collectionViewUrl);
      this.releaseDate = helper.getPrettyDate(this.infos.releaseDate);
      this.imageUrl = helper.getImageUrlOfSize(this.infos.artworkUrl100, 400);
    },
    async loadTracks(albumId) {
      this.tracks = await api.getAlbumTracks(albumId);
      this.numberOfTracks = this.tracks.length;
    }
  }
};
</script>

<style lang="scss">
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
