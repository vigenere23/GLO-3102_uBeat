<template>
  <v-app id="inspire">
    <div id="app">
      <nav-menu></nav-menu>
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
  import Navigation from '@/components/Navigation';

  export default {
    name: 'app',
    components: {
      'nav-menu': Navigation
    }
  };
</script>

<style>
</style>
