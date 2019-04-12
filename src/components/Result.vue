<template>
  <div :v-if="result.wrapperType === 'artist'" id="artist-result">
    <ResultArtist :artist="result"></ResultArtist>
  </div>
  <div :v-if="result.wrapperType === 'album'" id="album-result">
    <ResultAlbum :album="result"></ResultAlbum>
  </div>
  <div :v-if="result.wrapperType === 'track'" id="track-result">
    <ResultTrack :track="result"></ResultTrack>
  </div>
  <div :v-if="result.wrapperType === undefined" id="user-result">
    <ResultUser :user="result"></ResultUser>
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
      result: {}
    }
  };
</script>
