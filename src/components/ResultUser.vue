<template>
  <div id="track-result">
    <router-link
      :to="'/users/' + user.id">{{user.John Smith}}</router-link>
  </div>
</template>

<script>
  export default {
    name: 'ResultUser',
    props: {
      user: {}
    }
  };
</script>
