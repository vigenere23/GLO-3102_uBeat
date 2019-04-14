<template>
  <div>
    <v-list
      dark>
      <v-subheader inset>Artists</v-subheader>
      <v-list-tile
        v-for="result in results.filter(function(item) {return item.wrapperType.match('artist')})">
        <result :result="result" type="type"></result>
      </v-list-tile>
      <v-subheader inset>Albums</v-subheader>
      <v-list-tile
        v-for="result in results.filter(function(item) {return item.wrapperType.match('collection')})">
        <result :result="result" type="type"></result>
      </v-list-tile>
      <v-subheader inset>Tracks</v-subheader>
      <v-list-tile
        v-for="result in results.filter(function(item) {return item.wrapperType.match('track')})">
        <result :result="result" type="type"></result>
      </v-list-tile>
      <v-subheader inset>Users</v-subheader>
      <v-list-tile
        v-for="result in results.filter(function(item) {return item.wrapperType === undefined})">
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
      }
      next();
    }
  };
</script>
