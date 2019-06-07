<template>
  <div id="album-page">

    <album-infos
      :title="infos.name"
      :tracks="tracks"
      :image-url="require('@/assets/images/blank-album-400.png')"
      :deleteButton="true"
      @delete="deletePlaylist"
    ></album-infos>

    <div class="simple-input-field">
      <v-text-field
        label="playlist-name"
        placeholder="New name..."
        solo
        hide-details
        v-model="newPlayListName"
      ></v-text-field>
      <v-btn v-on:click="changeName">Rename playlist</v-btn>
    </div>

    <track-list
      :listType="listType"
      :playlistId="playlistId"
      :tracks="tracks">
    </track-list>

  </div>
</template>

<script>
import ubeat from '@/js/apis/ubeat'
import TrackList from '@/components/TrackList'
import AlbumInfos from '@/components/AlbumInfos'

export default {
  name: 'playlist-album',
  components: {
    TrackList,
    AlbumInfos
  },
  data () {
    return {
      infos: {},
      listType: 'playlist',
      tracks: [],
      imageUrl: '',
      playlistId: '',
      newPlayListName: ''
    }
  },
  async mounted () {
    this.loadPage(this.$route.params.playlistId)
  },
  async beforeRouteUpdate (to, from, next) {
    await this.loadPage(to.params.playlistId)
    next()
  },
  methods: {
    resetPage () {
      this.tracks = []
      this.imageUrl = ''
    },
    loadPage (playlistId) {
      this.resetPage()
      this.loadPlaylistInfosAndTracks(playlistId)
    },
    async loadPlaylistInfosAndTracks (playlistId) {
      this.infos = await ubeat.getPlaylistInfosAndTracks(playlistId)
      this.tracks = this.infos.tracks
      this.playlistId = playlistId
    },
    async deletePlaylist () {
      await ubeat.deletePlaylists(this.$route.params.playlistId)
      this.$router.go(-1)
    },
    async changeName () {
      if (this.newPlayListName) {
        const newInfos = await ubeat.changeNamePlaylist(
          this.$route.params.playlistId,
          this.newPlayListName,
          this.infos.owner.email
        )
        if (newInfos) {
          this.infos = newInfos
          this.newPlayListName = ''
        }
      }
    }
  }
}
</script>
