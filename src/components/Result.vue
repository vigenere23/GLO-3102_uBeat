<template>
  <div id="results">
    <div v-if="result.wrapperType === 'artist'" id="artist-result">
      <ResultArtist :v-if="result.wrapperType === 'artist'" :artist="result"></ResultArtist>
    </div>
    <div v-else-if="result.wrapperType === 'album'" id="album-result">
      <ResultAlbum :album="result"></ResultAlbum>
    </div>
    <div v-else-if="result.wrapperType === 'track'" id="track-result">
      <ResultTrack :track="result"></ResultTrack>
    </div>
    <div v-else-if="result.wrapperType === undefined" id="user-result">
      <ResultUser :user="result"></ResultUser>
    </div>
  </div>
</template>

<script>
  import ResultArtist from './ResultArtist';
  import ResultAlbum from './ResultAlbum';
  import ResultTrack from './ResultTrack';
  import ResultUser from './ResultUser';

  export default {
    components: { ResultArtist, ResultAlbum, ResultTrack, ResultUser },
    name: 'Result',
    props: {
      result: {},
      type: String
    }
  };
</script>
