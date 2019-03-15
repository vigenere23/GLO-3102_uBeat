<template>
  <v-hover>
    <v-list-tile class="album-tracks-list-item" slot-scope="{ hover }">
      <v-list-tile-avatar class="song-number">
        <div>
          <v-list-tile-title v-if="!hover">{{ number }}</v-list-tile-title>
          <v-list-tile-title v-else class="play-arrow" v-on:click="play">
            <v-btn icon ripple>
              <v-icon color="white">play_arrow</v-icon>
            </v-btn>
          </v-list-tile-title>
        </div>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title class="song-title">{{ title }}</v-list-tile-title>
        <v-list-tile-sub-title class="song-duration">{{ durationText || '' }}</v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-btn icon ripple v-on:click="add">
          <v-icon color="white">add</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-list-tile>
  </v-hover>

</template>

<script>
import helper from '@/js/helper';
import SongPlayer from '../js/MusicControl';

export default {
  name: 'album-tracks-list-item',
  props: {
    title: String,
    duration: Number,
    number: Number,
    preview: String
  },
  computed: {
    durationText() {
      return helper.getPrettyDuration(this.duration);
    }
  },
  methods: {
    thisSong() {
      return {
        title: this.title,
        duration: this.duration,
        number: this.number,
        preview: this.preview
      };
    },
    play() {
      const song = new SongPlayer();
      song.pauseSong();
      song.deleteElementsInArray();
      song.addSong(this.thisSong());
      song.playSong();
    },
    add() {
      const song = new SongPlayer();
      song.addSong(this.thisSong());
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
  .play-arrow{
    height: 100%;
  }

v-list-tile-title{
  position: relative;
}
</style>
