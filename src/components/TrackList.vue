<template>
  <v-list two-line subheader class="blue-grey darken-3 track-list">
    <v-subheader inset class="track-list-title">
      <v-btn icon ripple v-on:click="playAllAlbum">
        <v-icon color="white">play_arrow</v-icon>
      </v-btn>
      Songs
      <v-spacer></v-spacer>
      <v-list-tile-action>
        <v-menu offset-x left transition="slide-x-transition" v-if="listType !== 'playlist'">
          <v-btn ripple slot="activator">Add All</v-btn>
          <v-list dense class="blue-grey darken-4" id="listOfPlaylist">
            <v-list-tile-title id="PlaylistBtnTitle">Playlist</v-list-tile-title>
            <v-divider dark></v-divider>
            <v-list-tile @click="addAllTracksToPlaylist(playlist)" v-for="playlist in playlists" :key="playlist.id">
              <v-list-tile-title id="playlistTitle">{{ playlist.name }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-list-tile-action>
    </v-subheader>
    <track-list-item
      v-for="(track, i) in tracks"
      :listType="listType"
      :userId="userId"
      :playlistId="playlistId"
      :key="track.trackId"
      :track="track"
      :number="i + 1"
      :playlists="playlists"
    ></track-list-item>
  </v-list>
</template>

<script>
  import * as Cookies from 'js-cookie';
  import TrackListItem from '@/components/TrackListItem';
  import ubeat from '@/js/apis/ubeat';
  import { bus } from '@/main';
  import SongPlayer from '../js/MusicControl';

  export default {
    name: 'track-list',
    components: {
      TrackListItem
    },
    created() {
      bus.$on('songDeletedOfPlaylist', (data) => {
        this.tracks.splice(data - 1, 1);
        for (let i = data - 1; i < this.tracks.length; i += 1) {
          this.tracks[i].number -= 1;
        }
      });
    },
    async mounted() {
      const cookie = Cookies.get('uBeatCookie');
      if (!(cookie === null || cookie === undefined || cookie === '')) {
        const json = await ubeat.tokenInfo(cookie);
        const userId = json.id;
        this.playlists = await ubeat.getUserPlaylists(userId);
        this.playlists.sort();
      }
    },
    beforeMount() {
      const cookie = Cookies.get('uBeatCookie');
      if (cookie === null || cookie === undefined || cookie === '') {
        this.$router.push({ path: '/login' });
      }
    },
    data() {
      return {
        playlists: [],
      };
    },
    methods: {
      addAllTracksToPlaylist(playlist) {
        this.tracks.forEach((track) => {
          if (!playlist.tracks.find(playlistTrack => playlistTrack.trackId === track.trackId)) {
            ubeat.addSongToPlaylist(playlist.id, track);
          }
        });
      },
      playAllAlbum() {
        const song = new SongPlayer();
        song.pauseSong();
        song.deleteElementsInArray();
        this.tracks.forEach((track) => {
          song.addSong({ title: track.trackName,
            duration: track.trackTimeMillis,
            number: track.number,
            preview: track.previewUrl });
        });
      }
    },
    props: {
      tracks: Array,
      listType: String,
      playlistId: String,
      userId: String
    },
  };
</script>

<style lang="scss">
  .track-list {
    padding-bottom: 0;

    .track-list-title {
      font-size: 20px;
      color: white;
      margin-left: 0px;
    }
  }
</style>

