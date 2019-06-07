<template>
  <div>
    <v-list
      :two-line="$route.params.type === 'albums'"
      class="blue-grey darken-4"
      dark>
      <v-subheader v-if="this.$route.params.type === 'global'">Artists</v-subheader>
      <v-list-tile
        v-for="result in results.filter((item) => {return item.wrapperType.match('artist')})"
        :key="result.id">
        <result :result="result" type="type"></result>
      </v-list-tile>
      <v-subheader v-if="this.$route.params.type === 'global'">Albums</v-subheader>
      <v-list-tile
        v-for="result in results.filter((item) => {return item.wrapperType.match('collection')})"
        :key="result.id">
        <img
          v-if="$route.params.type === 'albums'"
          :src="result.artworkUrl60">
        <result :result="result" type="type"></result>
      </v-list-tile>
      <v-subheader v-if="this.$route.params.type === 'global'">Tracks</v-subheader>
      <v-list-tile
        v-for="result in results.filter((item) => {return item.wrapperType.match('track')})"
        :key="result.id">
        <result :result="result" type="type"></result>
      </v-list-tile>
      <v-subheader v-if="this.$route.params.type === 'global'">Users</v-subheader>
      <v-list-tile
        v-for="result in results.filter((item) => {return 'user'.match(item.wrapperType)})"
        :key="result.id">
        <result :result="result" type="type"></result>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import ubeat from '@/js/apis/ubeat'
import Result from '@/components/Result'

export default {
  components: {
    Result
  },
  data () {
    return {
      type: String,
      results: {}
    }
  },
  async mounted () {
    const cookie = Cookies.get('uBeatCookie')
    if (cookie) {
      this.type = this.$route.params.type
      this.results = await ubeat.search(
        this.$route.params.type,
        this.$route.params.query,
        cookie
      )
    }
  },
  async beforeRouteUpdate (to, from, next) {
    const cookie = Cookies.get('uBeatCookie')
    this.type = to.params.type
    if (cookie) {
      this.type = this.$route.params.type
      this.results = await ubeat.search(
        to.params.type,
        to.params.query,
        cookie
      )
    } else {
      this.$router.push('/login')
    }
    next()
  }
}
</script>
