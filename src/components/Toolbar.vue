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
    <v-text-field
      id="searchField"
      flat
      solo
      hide-details
      style="max-width: 750px;"
      clearable
      append-icon='search'
      @click:append="search"
      placeholder="Search">
    </v-text-field>
    <v-select
      v-model="selected"
      id="searchType"
      flat
      solo
      hide-details
      style="max-width: 100px;"
      :items="items"
    ></v-select>
    <v-spacer v-if="windowWidth >= 1264"></v-spacer>
  </v-toolbar>
</template>
<script>
  export default {
    name: 'toolbar',
    data() {
      return {
        selected: 'Global',
        home: { name: 'Home', icon: 'dashboard', path: '/' },
        items: ['Global', 'Artists', 'Albums', 'Tracks', 'Users']
      };
    },
    props: {
      drawer: {},
      toolbar: {},
      windowWidth: {}
    },
    methods: {
      search() {
        const type = this.selected.toLowerCase();
        const query = document.getElementById('searchField').value.toLowerCase();
        this.$router.replace(`/search/${type}/${query}`);
      }
    }
  };
</script>
