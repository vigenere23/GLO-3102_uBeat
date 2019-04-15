<template>
  <div>
    <v-list
      :two-line="$route.params.type === 'albums'"
      class="blue-grey darken-4"
      dark>
      <v-subheader v-if="this.$route.params.type === 'global'">Artists</v-subheader>
      <v-list-tile
        v-for="result in results.filter(function(item) {return item.wrapperType.match('artist')})"
        :key="result.id || i">
        <result :result="result" type="type"></result>
      </v-list-tile>
      <v-subheader v-if="this.$route.params.type === 'global'">Albums</v-subheader>
      <v-list-tile
        v-for="result in results.filter(function(item) {return item.wrapperType.match('collection')})"
        :key="result.id || i">
        <img
          v-if="$route.params.type === 'albums'"
          :src="result.artworkUrl60">
        <result :result="result" type="type"></result>
      </v-list-tile>
      <v-subheader v-if="this.$route.params.type === 'global'">Tracks</v-subheader>
      <v-list-tile
        v-for="result in results.filter(function(item) {return item.wrapperType.match('track')})"
        :key="result.id || i">
        <result :result="result" type="type"></result>
      </v-list-tile>
      <v-subheader v-if="this.$route.params.type === 'global'">Users</v-subheader>
      <v-list-tile
        v-for="result in results.filter(function(item) {return item.wrapperType.match('user')})"
        :key="result.id || i">
        <result :result="result" type="type"></result>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
  import * as Cookies from 'js-cookie';
  import ubeat from '@/js/apis/ubeat';
  import Result from './Result';

  export default {
    components: { Result },
    async mounted() {
      this.cookie = Cookies.get('uBeatCookie');
      if (!(this.cookie === null || this.cookie === undefined || this.cookie === '')) {
        this.type = this.$route.params.type;
        this.results = await ubeat.search(this.$route.params.type,
          this.$route.params.query, this.cookie);
      }
    },
    data() {
      return {
        type: String,
        results: {},
        cookie: Object
      };
    },
    async beforeRouteUpdate(to, from, next) {
      this.cookie = Cookies.get('uBeatCookie');
      this.type = to.params.type;
      if (!(this.cookie === null || this.cookie === undefined || this.cookie === '')) {
        this.type = this.$route.params.type;
        this.results = await ubeat.search(to.params.type, to.params.query, this.cookie);
      } else {
        this.$router.push({ path: '/login' });
      }
      next();
    }
  };
</script>

<style scoped>
  #SignUp{
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
