<template>
  <div v-if="!deleted">
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
          <v-list-tile-title class="song-title">{{ track.trackName }}</v-list-tile-title>
          <v-list-tile-sub-title class="song-duration">{{ durationText || '' }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon ripple @click="add">
            <v-icon color="white">playlist_add</v-icon>
          </v-btn>
        </v-list-tile-action>
        <v-list-tile-action @click="deleteSong" v-if="listType === 'playlist'">
          <v-btn icon ripple>
            <v-icon color="white">remove</v-icon>
          </v-btn>
        </v-list-tile-action>
        <v-list-tile-action v-else>
          <v-menu offset-x left transition="slide-x-transition">
            <v-btn icon ripple slot="activator"><v-icon color="white">add</v-icon></v-btn>
            <v-list dense class="blue-grey darken-4" id="listOfPlaylist">
              <v-list-tile-title id="PlaylistBtnTitle">Playlist</v-list-tile-title>
              <v-divider dark></v-divider>
              <v-list-tile @click="addToPlaylist(playlist)" v-for="playlist in playlists" :key="playlist.id">
                <v-list-tile-title id="playlistTitle">{{ playlist.name }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-list-tile-action>
      </v-list-tile>
    </v-hover>
  </div>
</template>

<script>
import formatter from '@/js/helpers/formatter'
import ubeat from '@/js/apis/ubeat'
import SongPlayer from '@/js/MusicControl'
import { bus } from '@/main'

export default {
  name: 'album-tracks-list-item',
  props: {
    listType: String,
    userId: String,
    playlistId: String,
    track: Object,
    number: Number,
    playlists: Array
  },
  computed: {
    durationText () {
      return formatter.prettyDuration(this.track.trackTimeMillis)
    },
    thisSong () {
      return {
        title: this.track.trackName,
        duration: this.track.trackTimeMillis,
        number: this.number,
        preview: this.track.previewUrl
      }
    }
  },
  data () {
    return {
      deleted: false,
      name: String,
      trackName: String
    }
  },
  methods: {
    play () {
      const song = new SongPlayer()
      song.pauseSong()
      song.deleteElementsInArray()
      this.add()
    },
    add () {
      const song = new SongPlayer()
      song.addSong(this.thisSong)
      if (song.listOfSongs.length === 1) {
        bus.$emit('firstElementInArray', song.listOfSongs[0].title)
      }
    },
    addToPlaylist (playlist) {
      if (!playlist.tracks.find(playlistTrack => playlistTrack.trackId === this.track.trackId)) {
        ubeat.addSongToPlaylist(playlist.id, this.track)
      }
    },
    async deleteSong () {
      await ubeat.deleteSongTrackFromPlaylist(this.playlistId, this.track.trackId)
      this.deleted = true
      bus.$emit('songDeletedOfPlaylist', this.number)
    }
  }
}
</script>

<style lang="scss">
.album-tracks-list-item {
  border-top: solid white 1px;
}

.song-number, .song-title, .song-duration, #playlistTitle, #PlaylistBtnTitle {
  color: white !important;
}

#PlaylistBtnTitle {
  padding-left: 10px;
  padding-right: 10px;
  margin-left: auto;
  margin-right: auto;
  width: 67px;
  font-weight: bold;
}

#listOfPlaylist {
  max-width: 215px;
}

.play-arrow {
  height: 100%;
}
</style>
