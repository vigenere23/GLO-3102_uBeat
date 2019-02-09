<link rel="stylesheet" type="text/css" href="../css/style.css"/>
<template id="navigation-template">
  <div id="navigationContainer">
    <v-toolbar
      dark
      app
      height="64px"
      :fixed="toolbar.fixed"
      :clipped-left="toolbar.clippedLeft">
      <v-toolbar-side-icon v-if="windowWidth <= 600"
        @click.stop="drawer.open = !drawer.open">
      </v-toolbar-side-icon>
      <v-toolbar-title v-if="windowWidth > 600">
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
    </v-toolbar>
    <v-navigation-drawer
      app
      dark
      :clipped="windowWidth > 600"
      :fixed="windowWidth > 600"
      :permanent="windowWidth > 600"
      :mini-variant.sync="drawer.mini"
      v-model="drawer.open">
      <v-toolbar flat class="transparent">
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="/static/generic-avatar.png">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>User</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action v-if="windowWidth > 600 && windowWidth < 1264">
              <v-btn
                icon
                @click.stop="drawer.mini = !drawer.mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list>
        <v-divider></v-divider>
        <v-list-tile
          v-for="item in navigationDrawerItems"
          :key="item.title"
          @click="">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list dense>
        <v-divider></v-divider>
        <v-list-tile
          v-for="item in userMenuItem"
          :key="item.title"
          @click="">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  export default {
    tempplate: '#navigation-template',
    data() {
      return {
        screenSize: '',
        windowWidth: 1920,
        drawer: {
          open: false,
          clipped: true,
          fixed: true,
          permanent: true,
          mini: false,
          debounce: false,
        },
        toolbar: {
          fixed: true,
          clippedLeft: true,
        },
        navigationDrawerItems: [
          { title: 'Home', icon: 'dashboard', ref: '/' },
          { title: 'Playlists', icon: 'queue_music', ref: '/playlists' }
        ],
        userMenuItem: [
          { title: 'Profile', icon: 'person', ref: '/profile' },
          { title: 'Settings', icon: 'settings', ref: '/settings' },
          { title: 'Logout', icon: 'logout', ref: '/logout' }
        ],
      };
    },
    mounted() {
      this.$nextTick(() => {
        window.onresize = () => {
          if (this.windowWidth > 600 && this.windowWidth < 1264 && this.drawer.debounce === false) {
            this.drawer.mini = true;
            this.drawer.debounce = true;
          } else if (this.windowWidth >= 1264 && this.drawer.debounce === true) {
            this.drawer.mini = false;
            this.drawer.debounce = false;
          } else if (this.windowWidth <= 600) {
            this.drawer.mini = false;
            this.drawer.debounce = false;
          }
          this.windowWidth = window.innerWidth;
        };
      });
    },
  };
</script>

<style>
  html {
    overflow-y: hidden;
  }
</style>
