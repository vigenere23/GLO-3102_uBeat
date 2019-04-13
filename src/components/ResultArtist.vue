<template>
  <router-link
    :to="'/artist/' + artist.artistId">{{artist.artistName}} - {{artist.primaryGenreName}}
  </router-link>
</template>

<script>
  export default {
    name: 'ResultArtist',
    props: {
      artist: {}
    }
  };
</script>
