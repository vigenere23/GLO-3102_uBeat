<template>
  <div>
    <li v-for="result in results">
      <Result :result="result"></Result>
    </li>
  </div>
</template>

<script>
  import api from '@/js/api';
  import Result from './Result';

  export default {
    components: { Result },
    async mounted() {
      this.results = await api.search(this.$route.params.type, this.$route.params.query);
    },
    data() {
      return {
        results: {}
      };
    },
    async beforeRouteUpdate(to, from, next) {
      this.results = await api.search(to.params.type, to.params.query);
      next();
    }
  };
</script>
