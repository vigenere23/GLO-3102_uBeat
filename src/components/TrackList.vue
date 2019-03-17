<template>
  <v-list two-line subheader class="blue-grey darken-3 track-list">
    <v-subheader inset class="track-list-title">Songs
      <v-spacer></v-spacer>
      <v-list-tile-action>
        <v-menu offset-y v-if="listType !== 'playlist'">
          <v-btn ripple slot="activator" v-on:click="getPlaylistsNames">Add All</v-btn>
          <v-list dense>
            <v-list-tile v-on:click="addAllToPlaylist(i)" v-for="i in playlistsname" @click="">
              <v-list-tile-title>{{ i[0] }}</v-list-tile-title>
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
      :number="track.trackNumber"
      :duration="track.trackTimeMillis"
      :preview="track.previewUrl"
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
    data() {
      return {
        playlistsname: [],
      };
    },
    methods: {
      async getPlaylistsNames() {
        this.playlistsname.length = 0;
        const playlists = await api.getUserPlaylists('5c81361ad6f63a0004c26542');
        for (let i = 0; i < playlists.length; i += 1) {
          const test = [playlists[i].name, playlists[i].id];
          this.playlistsname.push(test);
        }
      },
      async addAllToPlaylist(trackToAdd) {
        this.tracks = await api.getAlbumTracks(this.$route.params.albumId);
        for (let i = 0; i < this.tracks.length; i += 1) {
          api.addSongToPlaylist(trackToAdd[1], this.tracks[i]);
        }
        this.playlistsname.length = 0;
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

