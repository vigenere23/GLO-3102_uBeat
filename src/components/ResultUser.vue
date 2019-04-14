<template>
  <router-link
    :to="'/profile/' + user.id">{{user.name}}
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
