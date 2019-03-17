<template>
  <v-list two-line subheader class="blue-grey darken-3 track-list">
    <v-subheader inset class="track-list-title">Songs
      <v-spacer></v-spacer>
      <v-list-tile-action>
        <v-menu offset-x left v-if="listType !== 'playlist'">
          <v-btn ripple slot="activator">Add All</v-btn>
          <v-list dense>
            <v-list-tile v-on:click="addAllToPlaylist(i)" v-for="i in playlistsname" :key="i.playlistID"  @click="">
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
      :number="i + 1"
      :duration="track.trackTimeMillis"
      :preview="track.previewUrl"
      :playlistsname="playlistsname"
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
    mounted() {
      this.getPlaylistsNames();
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
        this.playlistsname.sort();
      },
      async addAllToPlaylist(trackToAdd) {
        this.tracks = await api.getAlbumTracks(this.$route.params.albumId);
        for (let i = 0; i < this.tracks.length; i += 1) {
          api.addSongToPlaylist(trackToAdd[1], this.tracks[i]);
        }
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

