<template>
  <div>
    <div id="music-player">
      <v-toolbar class="blue-grey darken-2">
        <div id="bottom-bar-3-buttons">
          <v-btn icon ripple right class="blue-grey darken-4" v-on:click="previousSong">
            <v-icon color="white">fast_rewind</v-icon>
          </v-btn>
          <v-btn icon ripple right class="blue-grey darken-4" v-show="this.displayPlayButton" v-on:click="continuSong">
            <v-icon color="white">play_arrow</v-icon>
          </v-btn>
          <v-btn icon ripple right class="blue-grey darken-4" v-show="this.displayPlayButton === false"
                 v-on:click="pauseSong">
            <v-icon color="white">pause</v-icon>
          </v-btn>
          <v-btn icon ripple right class="blue-grey darken-4" v-on:click="nextSong">
            <v-icon color="white">fast_forward</v-icon>
          </v-btn>
        </div>
        <span id="bottom-bar-song-title">
          {{titleOfTheSong}}
        </span>
      </v-toolbar>
    </div>
  </div>
</template>

<script>
  import { bus } from '@/main';
  import SongPlayer from '../js/MusicControl';

  export default {
    data() {
      return {
        displayPlayButton: true,
        titleOfTheSong: '',
      };
    },
    created() {
      bus.$on('musicStopped', () => {
        this.displayPlayButton = true;
      });
      bus.$on('musicStarted', () => {
        this.displayPlayButton = false;
      });
      bus.$on('changeTitleOfSongPlaying', (data) => {
        this.titleOfTheSong = data;
      });
      bus.$on('firstElementInArray', (data) => {
        this.titleOfTheSong = data;
      });
    },
    methods: {
      previousSong() {
        const song = new SongPlayer();
        song.restartSongOrPrevious();
      },
      nextSong() {
        const song = new SongPlayer();
        song.playNextSong();
      },
      continuSong() {
        const song = new SongPlayer();
        if (song.listOfSongs.length > 0) {
          if (global.audio !== undefined) {
            if (global.audio.currentTime === 0) {
              song.playSong();
            } else {
              global.audio.play();
              this.displayPlayButton = false;
            }
          } else {
            song.playSong();
          }
        }
      },
      pauseSong() {
        const song = new SongPlayer();
        song.pauseSong();
      }
    },
    name: 'MusicPlayer'
  };
</script>

<style scoped>
  #music-player {
    bottom: 0px;
    margin-top: 0px;
    height: 55px;
    width: 100%;
    position: fixed;
    z-index: 100;
  }

  #bottom-bar-song-title {
    font-size: 16px;
    color: white;
    white-space: nowrap;
  }

  #bottom-bar-3-buttons {
    margin-left: 10px;
    white-space: nowrap;
  }
</style>
