<template>
  <router-link
    :to="'/album/' + track.collectionId">{{track.trackName}} - ({{track.collectionName}})
  </router-link>
</template>

<script>
  export default {
    name: 'ResultTrack',
    props: {
      track: {},
      playlistId: String,
      playlists: Array
    },
  };
</script>
