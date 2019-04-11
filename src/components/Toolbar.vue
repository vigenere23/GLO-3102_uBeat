<template>
  <v-toolbar id="toolbar"
             app
             height="64px"
             color="primary"
             :fixed="toolbar.fixed"
             :clipped-left="toolbar.clippedLeft">
    <v-toolbar-side-icon
      dark
      v-if="windowWidth <= 600"
      @click.stop="drawer.open = !drawer.open">
    </v-toolbar-side-icon>
    <v-toolbar-title
      min-width="200px"
      v-if="windowWidth > 600">
      <v-btn
        flat
        :to="home.path"
        small
        active-class=""
        color="white">
        <v-icon>headset</v-icon>
        UBeat
      </v-btn>
    </v-toolbar-title>
    <v-spacer v-if="windowWidth >= 1264"></v-spacer>
    <v-autocomplete
      v-model="select"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      cache-items
      id="searchField"
      flat
      solo
      hide-details
      hide-no-data
      style="max-width: 750px;"
      clearable
      append-icon='search'
      placeholder="Search">
    </v-autocomplete>
    <v-spacer v-if="windowWidth >= 1264"></v-spacer>
  </v-toolbar>
</template>
<script>

  export default {
    name: 'toolbar',
    data() {
      return {
        home: { name: 'Home', icon: 'dashboard', path: '/' }
      };
    },
    props: {
      drawer: {},
      toolbar: {},
      windowWidth: {}
    }
  };
</script>
