<template>
  <v-list two-line subheader class="blue-grey darken-3 track-list">
    <v-subheader inset class="track-list-title">Songs
      <v-spacer></v-spacer>
      <v-list-tile-action>
        <v-menu offset-x left v-if="listType !== 'playlist'">
          <v-btn ripple slot="activator">Add All</v-btn>
          <v-list dense>
            <v-list-tile @click="addAllTracksToPlaylist(playlist)" v-for="playlist in playlists" :key="playlist.id">
              <v-list-tile-title>{{ playlist.name }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-list-tile-action>
    </v-subheader>
    <track-list-item
      v-for="(track, i) in tracks"
      :listType="listType"
      :userId="userId"
      :playlistID="playlistID"
      :key="track.trackId"
      :trackId="track.trackId"
      :title="track.trackName"
      :number="i + 1"
      :duration="track.trackTimeMillis"
      :preview="track.previewUrl"
      :playlistsname="playlists"
    ></track-list-item>
  </v-list>
</template>

<script>
  import TrackListItem from '@/components/TrackListItem';
  import api from '@/js/api';

  export default {
    name: 'track-list',
    components: {
      TrackListItem
    },
    async mounted() {
      this.playlists = await api.getUserPlaylists('5c81361ad6f63a0004c26542');
      this.playlists.sort();
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
            api.addSongToPlaylist(playlist.id, track);
          }
        });
      },
    },
    props: {
      tracks: Array,
      listType: String,
      playlistID: String,
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
    }
  }
</style>

