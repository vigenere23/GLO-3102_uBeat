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
        <v-container>
          <v-menu offset-y>
            <v-btn icon ripple slot="activator"><v-icon color="white">add</v-icon></v-btn>
            <v-list dense>
              <v-list-tile v-for="i in 4" :key="i" @click="">
                <v-list-tile-title>{{ i }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-container>
      </v-list-tile-action>
    </v-list-tile>
  </v-hover>
</template>
<script>
import helper from '@/js/helper';
import MusicControl from '@/js/MusicControl';

export default {
  name: 'album-tracks-list-item',
  props: {
    title: String,
    duration: Number,
    number: Number,
    preview: String
  },
  data() {
    return {
      items: ['Allo', 'boo']
    };
  },
  computed: {
    durationText() {
      return helper.getPrettyDuration(this.duration);
    }
  },
  methods: {
    play() {
      MusicControl.stopSong();
      MusicControl.playSong(this.preview);
    },
    addToPlaylist() {
      console.log('send help');
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
