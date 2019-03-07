<template>
  <v-list two-line subheader class="blue-grey darken-3 track-list">
    <v-subheader inset class="track-list-title">Songs</v-subheader>
    <track-list-item
      v-for="(track, i) in tracks"
      :key="track.trackId"
      :title="track.trackName"
      :number="i + 1"
      :duration="track.trackTimeMillis"
    ></track-list-item>
  </v-list>
</template>

<script>
import TrackListItem from '@/components/TrackListItem';

export default {
  name: 'track-list',
  components: {
    TrackListItem
  },
  props: {
    tracks: Array
  }
};
</script>

<style lang="scss">
.track-list {
  padding-bottom: 0;

  .track-list-title {
    font-size: 20px;
    color: white;
  }
}
</style>

