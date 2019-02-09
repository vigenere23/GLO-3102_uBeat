<template>
  <v-toolbar
    app
    height="64px"
    color="primary"
    :fixed="toolbar.fixed"
    :clipped-left="toolbar.clippedLeft">
    <v-toolbar-side-icon v-if="windowWidth <= 600"
                         @click.stop="drawer.open = !drawer.open">
    </v-toolbar-side-icon>
    <v-toolbar-title
      v-if="windowWidth > 600">
      <v-btn
        flat
        :to="home.path"
        large
        active-class=""
        color="accent">
        <v-icon>headset</v-icon>
        UBeat
      </v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-text-field
      id="searchField"
      flat
      solo
      hide-details
      background-color="accent"
      style="max-width: 800px; width: 500px;"
      clearable
      append-icon='search'
      placeholder="Search">
    </v-text-field>
    <v-spacer></v-spacer>
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
