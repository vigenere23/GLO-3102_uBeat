<template>
  <div id="results">
    <div v-if="result.wrapperType === 'artist'" id="artist-result">
      <ResultArtist :artist="result"></ResultArtist>
    </div>
    <div v-if="result.wrapperType === 'collection'" id="album-result">
      <ResultAlbum :album="result"></ResultAlbum>
    </div>
    <div v-if="result.wrapperType === 'track'" id="track-result">
      <ResultTrack :track="result"></ResultTrack>
    </div>
    <div v-if="result.wrapperType === 'user'" id="user-result">
      <ResultUser :user="result"></ResultUser>
    </div>
  </div>
</template>

<script>
import ubeat from '@/js/apis/ubeat'
import Cookies from 'js-cookie'
import ResultArtist from '@/components/ResultArtist'
import ResultAlbum from '@/components/ResultAlbum'
import ResultTrack from '@/components/ResultTrack'
import ResultUser from '@/components/ResultUser'

export default {
  components: {
    ResultArtist,
    ResultAlbum,
    ResultTrack,
    ResultUser
  },
  name: 'Result',
  props: {
    result: {},
    type: String
  },
  async mounted () {
    const cookie = Cookies.get('uBeatCookie')
    if (cookie) {
      const user = await ubeat.tokenInfo(cookie)
      this.playlists = await ubeat.getUserPlaylists(user.id)
      this.playlists.sort()
    }
  }
}
</script>
