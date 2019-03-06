<template>
  <v-list two-line subheader class="blue-grey darken-3 album-tracks-list">
    <v-subheader inset class="album-tracks-list-title">Songs</v-subheader>
    <album-tracks-list-item
      v-for="(track, i) in tracks"
      :key="track.trackId"
      :title="track.trackName"
      :number="i + 1"
    ></album-tracks-list-item>
  </v-list>
</template>

<script>
import AlbumTracksListItem from '@/components/AlbumTracksListItem';

export default {
  name: 'album-tracks-list',
  components: {
    AlbumTracksListItem
  },
  props: {
    tracks: Array
  }
};
</script>

<style lang="scss">
.album-tracks-list {
  padding-bottom: 0;

  .album-tracks-list-title {
    font-size: 20px;
    color: white;
  }
}
</style>

