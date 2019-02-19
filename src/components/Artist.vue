<template>
  <div id='artist-page' class='blue-grey darken-4'>
    <div class="centered-page">

      <div id="title">
        <h1>{{ artistName }}</h1>
        <h2>{{ artistGenre }}</h2>
        <a id="itunes-link" target="_blank" :href="itunesLink"></a>
      </div>

      <cover-list
        title="Albums"
        type="year-album"
        :covers="albums"
      />

      <cover-list
        title="Singles"
        type="year-album"
        :covers="singles"
      />

      <cover-list
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
  props: {
    artistId: {
      type: Number,
      required: true
    }
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
    this.loadArtistInfos();
    this.loadAlbums();
  },
  methods: {
    async loadArtistInfos() {
      const infos = await helpers.getArtistInfos(this.artistId);
      this.artistName = infos.artistName;
      this.artistGenre = infos.primaryGenreName;
      this.itunesLink = helpers.getItunesLink(infos.artistLinkUrl);
    },
    async loadAlbums() {
      const albums = await helpers.getAlbumsOfArtist(this.artistId);

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