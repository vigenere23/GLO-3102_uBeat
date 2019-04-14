<template>
  <div>
    <v-list
      dark>
      <v-list-tile
        v-for="result in results"
        three-line>
        <v-list-tile-action v-if="result.wrapperType === 'collection'">
          <v-img :src="result.artworkUrl60"></v-img>
        </v-list-tile-action>
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
      this.type = to.params.type;
      this.results = await ubeat.search(to.params.type, to.params.query, this.cookie);
      next();
    }
  };
</script>
