<template>
  <div id="results">
    <div v-if="result.wrapperType === 'artist'" id="artist-result">
      <ResultArtist :v-if="result.wrapperType === 'artist'" :artist="result"></ResultArtist>
    </div>
    <div v-if="result.wrapperType === 'collection'" id="album-result">
      <ResultAlbum :album="result"></ResultAlbum>
    </div>
    <div v-if="result.wrapperType === 'track'" id="track-result">
      <ResultTrack :track="result"></ResultTrack>
      <v-list-tile-action>
        <v-menu offset-x left>
          <v-btn icon ripple slot="activator"><v-icon color="white">add</v-icon></v-btn>
          <v-list dense>
            <v-list-tile @click="addToPlaylist(playlist)" v-for="playlist in playlists" :key="playlist.id">
              <v-list-tile-title>{{ playlist.name }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-list-tile-action>
    </div>
    <div v-if="result.wrapperType === undefined" id="user-result">
      <ResultUser :user="result"></ResultUser>
    </div>
  </div>
</template>

<script>
  import ubeat from '@/js/apis/ubeat';
  import ResultArtist from './ResultArtist';
  import ResultAlbum from './ResultAlbum';
  import ResultTrack from './ResultTrack';
  import ResultUser from './ResultUser';

  export default {
    components: { ResultArtist, ResultAlbum, ResultTrack, ResultUser },
    name: 'Result',
    props: {
      result: {},
      type: String,
      playlistId: String,
      playlists: Array
    },
    methods: {
      addToPlaylist(playlist) {
        if (!playlist.tracks.find(playlistTrack => playlistTrack.trackId === this.track.trackId)) {
          ubeat.addSongToPlaylist(playlist.id, this.track);
        }
      }
    },
    data() {
      return {
        playlists: [],
      };
    },
  };
</script>
