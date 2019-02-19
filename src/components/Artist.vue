<template>
  <div id='artist-page' class='blue-grey darken-4'>
    <div class="centered-page">

      <div id="title">
        <h1>{{ artistName }}</h1>
        <h2>{{ artistGenre }}</h2>
        <a target="_blank" href="https://geo.itunes.apple.com/ca/artist/tame-impala/290242959?mt=1&app=music' style='display:inline-block;overflow:hidden;background:url(https://linkmaker.itunes.apple.com/en-us/badge-lrg.svg?releaseDate=&kind=artist&bubble=apple_music) no-repeat;width:158px;height:45px;"></a>
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
      artistGenre: ''
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