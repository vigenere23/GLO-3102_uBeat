<template>
  <div>
    <div id="music-player">
      <v-toolbar class="blue-grey darken-2" id="toolbar">
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
        <div id="rightOptions">
          <v-btn icon ripple v-on:click="shuffle">
            <v-icon color="white">shuffle</v-icon>
          </v-btn>
          <v-btn icon ripple v-show="this.repeatBtn === false" v-on:click="repeatBtn = true">
            <v-icon color="white">repeat</v-icon>
          </v-btn>
          <v-btn icon ripple class="blue-grey darken-4" v-show="this.repeatBtn" v-on:click="repeatBtn = false">
            <v-icon color="white">repeat</v-icon>
          </v-btn>
          <v-menu nudge-left="200px" nudge-top="200px">
            <v-btn icon ripple slot="activator" v-on:click="chargeQueue"><v-icon color="white">queue_music</v-icon></v-btn>
            <v-list dense class="listInQueue">
              <v-list-tile-title class="queueList" id="TitleOfListQueue">Next songs</v-list-tile-title>
              <v-divider dark></v-divider>
              <v-list-tile class="listTileInQueue" v-for="(song, i) in listOfSongsInQueue.slice(1)" :key="song.id || i">
                <v-list-tile-title class="queueList" v-on:click="changeSongInQueue(i)">{{i + 1}}) {{ song.title }}</v-list-tile-title>
              </v-list-tile>
              <v-list-tile class="queueList" v-if="listOfSongsInQueue.length <= 1">
                <v-list-tile-title class="queueList">No next song :(</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </div>

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
        listOfSongsInQueue: [],
        repeatBtn: false
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
      bus.$on('checkForRepeat', () => {
        const song = new SongPlayer();
        if (this.repeatBtn === true) {
          song.listOfSongs = song.listOfPastSongs;
          song.playSong();
          song.listOfPastSongs = [];
        }
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
      },
      chargeQueue() {
        const song = new SongPlayer();
        this.listOfSongsInQueue = song.listOfSongs;
        // this.listOfSongsInQueue.shift();
      },
      changeSongInQueue(index) {
        const song = new SongPlayer();
        song.listOfSongs.splice(0, index);
        this.nextSong();
      },
      shuffle() {
        const song = new SongPlayer();
        song.shuffle();
      }
    },
    name: 'MusicPlayer'
  };
</script>

<style scoped>
  #music-player {
    display: flex;
    bottom: 0px;
    align-items: center;
    height: 50px;
    width: 100%;
    position: fixed;
    z-index: 5;
  }
  #bottom-bar-song-title {
    font-size: 16px;
    color: white;
    white-space: nowrap;
    overflow: hidden;
    width: auto;
  }
  #bottom-bar-3-buttons {
    margin-left: 10px;
    white-space: nowrap;
  }
  #rightOptions {
    display: flex;
    margin-left: auto;
    z-index: 100;
  }
  .queueList {
    font-size: 14px;
    color: white;
  }
  .listInQueue{
    background: rgb(27, 41, 50);
    max-height: 200px;
    width: 250px;
  }
  .listTileInQueue {
    background: rgb(27, 41, 50);
  }
  .listTileInQueue:hover {
    background: #3a474e;
    cursor: pointer;
  }
  #TitleOfListQueue {
    margin-left: auto;
    margin-right: auto;
    width: 80px;
    font-weight: bold;
  }

  @media (max-width: 450px) {
    #music-player {
      height: 100px;
      padding-top: 6px;
    }
    #toolbar{
      display: flex;
      height: 100px;
      flex-wrap: wrap-reverse;
    }
    #rightOptions {
      display: flex;
      position: fixed;
      bottom: 50px;
      width: 100%;
      justify-content: space-around;
      border-bottom: white 1px solid;
      left: 0px;
    }
  }

</style>
