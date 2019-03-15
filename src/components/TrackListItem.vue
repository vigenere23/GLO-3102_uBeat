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
        </v-list-tile-action>
        <v-list-tile-action>
          <v-container>
            <v-menu offset-y>
              <v-btn icon ripple slot="activator" v-if="listType !== 'playlist'"><v-icon v-on:click="getPlaylistsNames" color="white">add</v-icon></v-btn>
              <v-list dense>
                <v-list-tile v-on:click="addToPlaylist(i)" v-for="i in playlistsname" :key="i" @click="">
                  <v-list-tile-title>{{ i[0] }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-container>
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
    trackId: [String, Number],
    userId: String,
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
      deleted: false,
      playlistsname: [],
      tracks: [],
      name: String,
      trackName: String
    };
  },
  methods: {
    play() {
      MusicControl.stopSong();
      MusicControl.playSong(this.preview);
    },
    async getPlaylistsNames() {
      const playlists = await api.getUserPlaylists('5c81361ad6f63a0004c26542');
      for (let i = 0; i < playlists.length; i += 1) {
        const test = [playlists[i].name, playlists[i].id];
        this.playlistsname.push(test);
      }
    },
    async addToPlaylist(trackToAdd) {
      this.tracks = await api.getAlbumTracks(this.$route.params.albumId);
      for (let i = 0; i < this.tracks.length; i += 1) {
        if (this.tracks[i].trackName === this.title) {
          api.addSongToPlaylist(trackToAdd[1], this.tracks[i]);
        }
      }
    },
    async deleteSong() {
      await api.deleteSongTrackFromPlaylist(this.playlistID, this.trackId);
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

.play-arrow {
  height: 100%;
}
</style>
