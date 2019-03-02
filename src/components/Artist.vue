<template>
  <div id="artist-page" class="page blue-grey darken-4">
    <div class="centered-page">

      <div class="centered-title">
        <h1 class="large-thin-title">{{ artistName }}</h1>
        <h2 class="large-thin-subtitle">{{ artistGenre }}</h2>
        <a id="itunes-link" target="_blank" :href="itunesLink"></a>
      </div>

      <cover-list
        v-if="albums.length"
        title="Albums"
        type="year-album"
        :covers="albums"
      />

      <cover-list
        v-if="singles.length"
        title="Singles"
        type="year-album"
        :covers="singles"
      />

      <cover-list
        v-if="eps.length"
        title="EPs"
        type="year-album"
        :covers="eps"
      />

    </div>
  </div>
</template>

<script>
import helpers from '@/js/helpers';
import CoverList from '@/components/CoverList';

export default {
  name: 'artist',
  components: {
    CoverList
  },
  data() {
    return {
      albums: [],
      eps: [],
      singles: [],
      artistName: '',
      artistGenre: '',
      itunesLink: ''
    };
  },
  async mounted() {
    this.loadPage(this.$route.params.artistId);
  },
  async beforeRouteUpdate(to, from, next) {
    await this.loadPage(to.params.artistId);
    next();
  },
  methods: {
    async loadPage(artistId) {
      this.resetPage();
      this.loadArtistInfos(artistId);
      this.loadAlbums(artistId);
    },
    resetPage() {
      this.albums = [];
      this.eps = [];
      this.singles = [];
      this.artistName = '';
      this.artistGenre = '';
      this.itunesLink = '';
    },
    async loadArtistInfos(artistId) {
      const infos = await helpers.getArtistInfos(artistId);
      this.artistName = infos.artistName;
      this.artistGenre = infos.primaryGenreName;
      this.itunesLink = helpers.getItunesLink(infos.artistLinkUrl);
    },
    async loadAlbums(artistId) {
      const albums = await helpers.getAlbumsOfArtist(artistId);

      albums.forEach((result) => {
        if (/EP$/.test(result.collectionName)) {
          this.eps.push(result);
        } else if (/Single$/.test(result.collectionName)) {
          this.singles.push(result);
        } else {
          this.albums.push(result);
        }
      });
    }
  }
};
</script>