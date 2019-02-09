<template>
  <v-app id="inspire">
    <div id="app" class="full-height-page">
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
  .centered-page {
    width: 100%;
    max-width: 1000px;
    box-sizing: border-box;
    padding: 16px;
    margin: auto;
  }

  .full-height-page {
    min-height: 100%;
  }

  a {
    text-decoration: inherit;
  }
</style>
