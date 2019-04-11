<template>
  <div id="artist-page">

    <artist-infos
      v-if="infos"
      :infos="infos"
      :image="image"
    />

    <div class="centered-page">

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

      <cover-list
        v-if="similarArtists.length"
        title="Similar artists"
        type="artist"
        :covers="similarArtists"
      />

    </div>
  </div>
</template>

<script>
import * as Cookies from 'js-cookie';
import ubeat from '@/js/apis/ubeat';
import spotify from '@/js/apis/spotify';
import ArtistInfos from '@/components/ArtistInfos';
import CoverList from '@/components/CoverList';

export default {
  name: 'artist',
  components: {
    ArtistInfos,
    CoverList
  },
  data() {
    return {
      albums: [],
      eps: [],
      singles: [],
      infos: null,
      spotifyInfos: null,
      similarArtists: []
    };
  },
  computed: {
    image() {
      return this.spotifyInfos && this.spotifyInfos.images
        ? this.spotifyInfos.images[0].url
        : '';
    }
  },
  async mounted() {
    this.loadPage(this.$route.params.artistId);
  },
  async beforeRouteUpdate(to, from, next) {
    await this.loadPage(to.params.artistId);
    next();
  },
  beforeMount() {
    const cookie = Cookies.get('uBeatCookie');
    if (cookie === null || cookie === undefined || cookie === '') {
      this.$router.push({ path: '/login' });
    }
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
      this.infos = null;
      this.spotifyInfos = null;
      this.similarArtists = [];
    },
    async loadArtistInfos(artistId) {
      this.infos = await ubeat.getArtistInfos(artistId);
      this.spotifyInfos = await spotify.getArtistInfosByName(this.infos.artistName);
      if (this.spotifyInfos) {
        const similarArtists = await spotify.getSimilarArtists(this.spotifyInfos.id);
        this.similarArtists = similarArtists.filter(x => x);
      }
    },
    async loadAlbums(artistId) {
      const albums = await ubeat.getAlbumsOfArtist(artistId);

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
