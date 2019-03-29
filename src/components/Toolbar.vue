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
  import api from '@/js/api';

  export default {
    name: 'toolbar',
    data() {
      return {
        home: { name: 'Home', icon: 'dashboard', path: '/' },
        results: [],
        search: null,
        select: null
      };
    },
    props: {
      drawer: {},
      toolbar: {},
      windowWidth: {}
    },
    computer: {
      items() {
        return this.results.map((result) => {
          const Description = result.Description.length > this.descriptionLimit
            ? `${result.Description.slice(0, this.descriptionLimit)}...`
            : result.Description;

          return Object.assign({}, result, { Description });
        });
      }
    },
    watch: {
      search(val) {
        // Items have already been loaded
        if (this.items.length > 0) return;

        // Items have already been requested
        if (this.isLoading) return;

        this.isLoading = true;

        // Lazily load input items
        api.globalSearch(val)
          .then(res => res.json())
          .then((res) => {
            const { count, results } = res;
            this.count = count;
            this.results = results;
          }).finally(() => (this.isLoading = false));
      }
    }
  };
</script>
