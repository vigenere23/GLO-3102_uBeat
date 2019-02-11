<template>
  <v-app id="inspire">
    <div id="app" class="blue-grey darken-4">
      <nav-menu></nav-menu>
      <v-content>
        <v-flex shrink>
          <router-view></router-view>
        </v-flex>
      </v-content>
    </div>
  </v-app>
</template>

<script>
  import 'typeface-roboto/index.css';
  import Navigation from '@/components/Navigation';

  export default {
    name: 'app',
    components: {
      'nav-menu': Navigation
    }
  };
</script>

<style>
  @import './css/style.css';
</style>
