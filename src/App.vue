<template>
  <v-app id="inspire">
    <div id="app" class="blue-grey darken-4">
      <nav-menu></nav-menu>
      <router-view></router-view>
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
  max-width: 1200px;
  box-sizing: border-box;
  padding: 16px;
  margin: auto;
}

#app {
  min-height: 100%;
  box-sizing: border-box;
  padding-bottom: 64px;
}

a {
  text-decoration: inherit;
}

.better-scrollbar::-webkit-scrollbar {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  height: 10px;
  width: 10px;
}
 
.better-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 5px;
}
</style>
