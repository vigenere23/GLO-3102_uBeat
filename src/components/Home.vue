<template>
  <div id="home-page" class="page">
    <div class="centered-page">

      <div class="centered-title">
        <h1 class="large-thin-title">Home</h1>
      </div>

      <cover-list
        v-for="(coverList, i) in coverLists"
        :key="i"
        :title="coverList.title"
        type="album"
        :covers="coverList.covers"
      />

    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import homeAlbumLists from '@/js/homeAlbumLists'
import ubeat from '@/js/apis/ubeat'
import CoverList from '@/components/CoverList'

export default {
  name: 'home',
  components: {
    CoverList
  },
  data () {
    return {
      coverLists: []
    }
  },
  mounted () {
    if (!this.coverLists.length && Cookies.get('uBeatCookie')) {
      homeAlbumLists.forEach(async (albumList) => {
        const coverList = await this.getAlbumInfosOfAlbumList(albumList)
        this.coverLists.push(coverList)
      })
    }
  },
  beforeMount () {
    if (!Cookies.get('uBeatCookie')) {
      this.$router.push('/login')
    }
  },
  methods: {
    async getAlbumInfosOfAlbumList (albumList) {
      const coverList = {
        title: albumList.title,
        covers: []
      }
      for await (const id of albumList.ids) {
        const albumInfos = await ubeat.getAlbumInfos(id)
        if (albumInfos) coverList.covers.push(albumInfos)
      }
      return coverList
    }
  }
}
</script>
