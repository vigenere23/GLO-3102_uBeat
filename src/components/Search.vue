<template>
  <div>
    <v-list
      dark>
      <v-subheader inset>Artists</v-subheader>
      <v-list-tile
        v-for="(result, i) in artistResults"
        :key="result.id || i"
      >
        <result :result="result" type="type"></result>
      </v-list-tile>
      <v-subheader inset>Albums</v-subheader>
      <v-list-tile
        v-for="(result, i) in collectionResults"
        :key="result.id || i"
      >
        <result :result="result" type="type"></result>
      </v-list-tile>
      <v-subheader inset>Tracks</v-subheader>
      <v-list-tile
        v-for="(result, i) in trackResults"
        :key="result.id || i"
      >
        <result :result="result" type="type"></result>
      </v-list-tile>
      <v-subheader inset>Users</v-subheader>
      <v-list-tile
        v-for="(result, i) in otherResults"
        :key="result.id || i"
      >
        <result :result="result" type="type"></result>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import ubeat from '@/js/apis/ubeat';
  import Result from './Result';

  export default {
    components: { Result },
    computed: {
      artistResults() {
        return this.results.filter(item => item.wrapperType.match('artist'));
      },
      collectionResults() {
        return this.results.filter(item => item.wrapperType.match('collection'));
      },
      trackResults() {
        return this.results.filter(item => item.wrapperType.match('track'));
      },
      otherResults() {
        return this.results.filter(item => !item.wrapperType);
      }
    },
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
      }
      next();
    }
  };
</script>
