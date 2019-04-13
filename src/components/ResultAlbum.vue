<template>
  <router-link
    :to="'/album/' + album.collectionId">{{album.collectionName}} - ({{album.artistName}})
  </router-link>
</template>

<script>
  export default {
    name: 'ResultAlbum',
    props: {
      album: {}
    }
  };
</script>
