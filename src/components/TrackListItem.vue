<template>
  <v-list-tile class="album-tracks-list-item">
    <v-list-tile-avatar class="song-number">
      <v-list-tile-title>{{ number }}</v-list-tile-title>
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title class="song-title">{{ title }}</v-list-tile-title>
      <v-list-tile-sub-title class="song-duration">{{ durationText || '' }}</v-list-tile-sub-title>
    </v-list-tile-content>
    <v-list-tile-action>
      <v-btn icon ripple>
        <v-icon color="white">play_arrow</v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
import helper from '@/js/helper';

export default {
  name: 'album-tracks-list-item',
  props: {
    title: String,
    duration: Number,
    number: Number
  },
  computed: {
    durationText() {
      return helper.getPrettyDuration(this.duration);
    }
  }
};
</script>

<style lang="scss">
.album-tracks-list-item {
  border-top: solid white 1px;
}

.song-number, .song-title, .song-duration {
  color: white !important;
}
</style>
