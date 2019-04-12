<template>
  <div>
    <li v-for="result in results">
      <Result :result="result" type="type"></Result>
    </li>
  </div>
</template>

<script>
  import api from '@/js/api';
  import Result from './Result';

  export default {
    components: { Result },
    async mounted() {
      this.type = this.$route.params.type;
      this.results = await api.search(this.$route.params.type, this.$route.params.query);
    },
    data() {
      return {
        type: String,
        results: {}
      };
    },
    async beforeRouteUpdate(to, from, next) {
      this.type = to.params.type;
      this.results = await api.search(to.params.type, to.params.query);
      next();
    }
  };
</script>
