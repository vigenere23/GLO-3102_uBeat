<template>
  <div id="track-result">
    <router-link
      :to="'/artist/' + artist.artistId">{{artist.artistName}} - {{artist.primaryGenreName}}</router-link>
  </div>
</template>

<script>
  export default {
    name: 'ResultArtist',
    props: {
      artist: {}
    }
  };
</script>
