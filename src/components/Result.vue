<template>
  <div id="results">
    <div v-if="result.wrapperType === 'artist'" id="artist-result">
      <ResultArtist :artist="result"></ResultArtist>
    </div>
    <div v-if="result.wrapperType === 'collection'" id="album-result">
      <ResultAlbum :album="result"></ResultAlbum>
    </div>
    <div v-if="result.wrapperType === 'track'" id="track-result">
      <ResultTrack :track="result"></ResultTrack>
    </div>
    <div v-if="result.wrapperType === 'user'" id="user-result">
      <ResultUser :user="result"></ResultUser>
    </div>
  </div>
</template>

<script>
  import ubeat from '@/js/apis/ubeat';
  import * as Cookies from 'js-cookie';
  import ResultArtist from './ResultArtist';
  import ResultAlbum from './ResultAlbum';
  import ResultTrack from './ResultTrack';
  import ResultUser from './ResultUser';

  export default {
    components: { ResultArtist, ResultAlbum, ResultTrack, ResultUser },
    name: 'Result',
    props: {
      result: {},
      type: String,
    },
    async mounted() {
      const cookie = Cookies.get('uBeatCookie');
      if (!(cookie === null || cookie === undefined || cookie === '')) {
        const json = await ubeat.tokenInfo(cookie);
        const userId = json.id;
        this.playlists = await ubeat.getUserPlaylists(userId);
        this.playlists.sort();
      }
    },
  };
</script>
