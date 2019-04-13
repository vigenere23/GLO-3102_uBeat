<template>
  <router-link
    :to="'/users/' + user.id">{{user.name}}
  </router-link>
</template>

<script>
  export default {
    name: 'ResultUser',
    props: {
      user: {}
    }
  };
</script>
