<template>
  <div id="artist-page">

    <artist-infos
      v-if="Object.keys(infos).length"
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

    </div>
  </div>
</template>

<script>
import api from '@/js/api';
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
      infos: {},
      image: 'https://i.scdn.co/image/a5c28221d9d309fc94268bd216cdf1ca05a6b0c2'
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
    },
    async loadArtistInfos(artistId) {
      this.infos = await api.getArtistInfos(artistId);
    },
    async loadAlbums(artistId) {
      const albums = await api.getAlbumsOfArtist(artistId);

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
