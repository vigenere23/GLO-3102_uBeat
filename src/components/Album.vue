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
          <v-card-actions id="apple-music-link">
            <a class="itunes-link" target="_blank" :href="itunesLink"></a>
          </v-card-actions>
        </div>
      </v-card-title>
    </v-card>
    <v-list two-line subheader class="blue-grey darken-3">
      <v-subheader inset id="liste-title">Songs</v-subheader>
      <v-list-tile
        v-for="item in items"
        :key="item.number"
        id="lines-between-songs">
        <v-list-tile-avatar id="songs-number">
          <v-list-tile-title>{{item.number}}</v-list-tile-title>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title id="songs-title">{{item.title}}</v-list-tile-title>
          <v-list-tile-sub-title id="songs-lenght">{{item.time}}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon ripple>
            <v-icon color="white">play_arrow</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import api from '@/js/api';
import helper from '@/js/helper';

export default {
  name: 'album',
  data() {
    return {
      infos: {},
      tracks: [],
      itunesLink: '',
      numberOfTracks: 0,
      releaseDate: '',
      imageUrl: '',
      items: [
        { number: '1', title: 'Imagine', time: '3:32' },
        { number: '2', title: 'Needy', time: '2:51' },
        { number: '3', title: 'NASA', time: '2:52' },
        { number: '4', title: 'Bloodline', time: '3:35' },
        { number: '5', title: 'Fake smile', time: '3:28' },
        { number: '6', title: 'Bad idea', time: '4:26' },
        { number: '7', title: 'Make up', time: '2:20' },
        { number: '8', title: 'Ghostin', time: '4:30' },
        { number: '9', title: 'In my head', time: '3:42' },
        { number: '10', title: '7 rings', time: '2:59' },
        { number: '11', title: 'Thank u, next', time: '3:27' },
        { number: '12', title: 'Break up with your girlfriend, i\'m bored', time: '3:09' },
      ]
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
