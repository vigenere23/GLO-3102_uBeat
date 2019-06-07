<template>
  <div id="album-page">
    <album-infos
      :title="infos.collectionName"
      :subtitle="infos.artistName"
      :subtitleLink="`/artist/${infos.artistId}`"
      :release-date="releaseDate"
      :genre="infos.primaryGenreName"
      :tracks="tracks"
      :advisory="infos.contentAdvisoryRating"
      :itunes-link="itunesLink"
      :image-url="imageUrl"
    ></album-infos>
    <track-list :tracks="tracks"></track-list>
  </div>
</template>

<script>
import ubeat from '@/js/apis/ubeat'
import formatter from '@/js/helpers/formatter'
import TrackList from '@/components/TrackList'
import AlbumInfos from '@/components/AlbumInfos'

export default {
  name: 'album',
  components: {
    TrackList,
    AlbumInfos
  },
  data () {
    return {
      infos: {},
      tracks: [],
      itunesLink: '',
      releaseDate: '',
      imageUrl: ''
    }
  },
  async mounted () {
    this.loadPage(this.$route.params.albumId)
  },
  async beforeRouteUpdate (to, from, next) {
    await this.loadPage(to.params.albumId)
    next()
  },
  methods: {
    resetPage () {
      this.tracks = []
      this.imageUrl = ''
    },
    loadPage (albumId) {
      this.resetPage()
      this.loadAlbumInfos(albumId)
      this.loadTracks(albumId)
    },
    async loadAlbumInfos (albumId) {
      this.infos = await ubeat.getAlbumInfos(albumId)
      this.itunesLink = formatter.itunesLink(this.infos.collectionViewUrl)
      this.releaseDate = formatter.prettyDate(this.infos.releaseDate)
      this.imageUrl = formatter.imageUrlOfSize(this.infos.artworkUrl100, 400)
    },
    async loadTracks (albumId) {
      this.tracks = await ubeat.getAlbumTracks(albumId)
    }
  }
}
</script>

<style lang="scss">
#album-card {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;

  #album-cover {
    width: 40%;
    max-width: 400px;
  }

  #info-album {
    display: flex;
    flex-direction: column;
    color: white;
  }
}

@media (max-width: 600px) {
  #album-card {
    height: 95vw;
    max-height: 440px;
    min-height: 300px;
    padding: 0;
    margin-top: 20px;

    #album-cover {
      width: 90vw;
      max-width: 400px;
      position: absolute;
      filter: blur(2px);
      opacity: 0.5;
      z-index: 1;
    }

    #info-album {
      z-index: 2;
    }
  }
}
</style>
