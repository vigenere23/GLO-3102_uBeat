<template>
  <router-link class="white--text"
    :to="'/artist/' + artist.artistId">{{artist.artistName}}
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
