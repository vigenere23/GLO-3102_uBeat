<template>
  <v-toolbar
    app
    dark
    :fixed="toolbar.fixed"
    :clipped-left="toolbar.clippedLeft">
    <v-toolbar-side-icon
      v-if="!toolbar.fixed">
    </v-toolbar-side-icon>
    <v-toolbar-title>
      <v-btn flat>
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
      style="max-width: 800px; width: 500px;"
      clearable
      append-icon='search'
      placeholder="Search">
    </v-text-field>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat>Playlists</v-btn>
      <v-menu offset-y>
        <v-btn slot="activator" flat>Username
          <v-avatar id="userAvatar"><img src="/static/generic-avatar.png"></v-avatar>
        </v-btn>
        <v-list>
          <v-list-tile
            v-for="(item, index) in toolbarMenuItems"
            :key="index"
            @click=""
          >
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>

  export default {
    components: {},
    el: '#toolbar',
    name: 'Toolbar',
    data() {
      return {
        drawer: {
          open: false,
          clipped: false,
          fixed: false,
          permanent: true,
          mini: false,
        },
        toolbar: {
          fixed: true,
          clippedLeft: false,
        },
        navigationDrawerItems: [
          { title: 'Home', icon: 'dashboard', ref: '/' },
          { title: 'Playlists', icon: 'queue_music', ref: '/playlists' },
          { title: 'Profile', icon: 'person', ref: '/profile' },
          { title: 'Settings', icon: 'settings', ref: '/settings' },
          { title: 'Logout', icon: 'logout', ref: '/logout' }
        ],
        toolbarMenuItems: [
          { title: 'Profile', ref: '/profile' },
          { title: 'Settings', ref: '/settings' },
          { title: 'Logout', ref: '/logout' }
        ],
        methods: {
          toggleMiniDrawer() {
            this.drawer.mini = !this.drawer.mini;
          },
          toggleDrawer() {
            this.drawer.open = !this.drawer.open;
          },
        }
      };
    },
    mounted() {
      this.$nextTick(() => {
        window.addEventListener('resize', () => {
        });
      });
    },
  };
</script>
