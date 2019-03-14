<template>
  <div v-if="deleted === false">
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
       <v-list-tile-action v-on:click="deleteSong">
         <v-btn icon ripple v-if="listType === 'playlist'">
            <v-icon color="white">remove</v-icon>
          </v-btn>
          <v-btn icon ripple v-else>
            <v-icon color="white">add</v-icon>
         </v-btn>
       </v-list-tile-action>
     </v-list-tile>
   </v-hover>
  </div>


</template>

<script>
import helper from '@/js/helper';
import MusicControl from '@/js/MusicControl';
import api from '@/js/api';

export default {
  name: 'album-tracks-list-item',
  props: {
    title: String,
    listType: String,
    trackKey: String,
    playlistID: String,
    duration: Number,
    number: Number,
    preview: String
  },
  computed: {
    durationText() {
      return helper.getPrettyDuration(this.duration);
    }
  },
  data() {
    return {
      deleted: false
    };
  },
  methods: {
    play() {
      MusicControl.stopSong();
      MusicControl.playSong(this.preview);
    },
    async deleteSong() {
      await api.deleteSongTrackFromPlaylist(this.playlistID, this.trackKey);
      this.deleted = true;
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
