<template>
  <v-content>
    <v-bottom-nav fixed id="music-player" class="blue-grey darken-2" >
      <v-btn v-on:click="previousSong">
        <v-icon color="white">fast_rewind</v-icon>
      </v-btn>
      <v-btn v-on:click="continuSong">
        <v-icon color="white">play_arrow</v-icon>
      </v-btn>
      <v-btn v-on:click="pauseSong">
        <v-icon color="white">pause</v-icon>
      </v-btn>
      <v-btn v-on:click="nextSong">
        <v-icon color="white">fast_forward</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-content>
</template>

<script>
    import SongPlayer from '../js/MusicControl';

    export default {
      data() {
        return {
          isVisible: false,
        };
      },
      async mounted() {
        this.listOfSongsNotEmpty();
      },
      methods: {
        listOfSongsNotEmpty() {
          const song = new SongPlayer();
          if (song.getNumberOfItemsInListOfSongs() === 0) {
            this.isVisible = false;
          } else {
            this.isVisible = true;
          }
        },
        previousSong() {
          const song = new SongPlayer();
          song.restartSongOrPrevious();
        },
        nextSong() {
          const song = new SongPlayer();
          song.playNextSong();
        },
        continuSong() {
          global.audio.play();
        },
        pauseSong() {
          global.audio.pause();
        }
      },
      name: 'MusicPlayer'
    };
</script>

<style scoped>
 #music-player{
   bottom: 0px;
   margin-bottom: 60px;
   height: 50px;
 }
</style>
