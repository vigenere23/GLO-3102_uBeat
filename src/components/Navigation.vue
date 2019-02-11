<template id="navigation-template">
  <div id="navigationContainer">
    <toolbar :drawer="drawer" :toolbar="toolbar" :window-width="windowWidth"/>
    <v-navigation-drawer
      app
      dark
      floating
      disable-resize-watcher
      class="secondary"
      :clipped="drawer.clipped"
      :fixed="drawer.fixed"
      :permanent="drawer.permanent"
      :mini-variant.sync="drawer.mini"
      v-model="drawer.open"
    >
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
            <v-list-tile-action v-if="windowWidth <= 600">
              <v-btn
                icon
                @click.stop="drawer.open = !drawer.open">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list>
        <v-divider></v-divider>
        <v-list-tile
          active-class="blue-grey darken-4"
          :class="item.path === $route.path ? 'blue-grey darken-4' : ''"
          v-for="item in navigationDrawerItems"
          :key="item.title"
          :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <!-- TODO: Remove this div for release 2, these are helper for correction -->
      <v-list id="correctionHelper">
        <v-divider></v-divider>
        <v-list-tile>
          HELPER
        </v-list-tile>
        <v-list-tile
          active-class="blue-grey darken-4"
          :class="item.path === $route.path ? 'blue-grey darken-4' : ''"
          v-for="item in correctionHelper"
          :key="item.title"
          :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list dense>
        <v-divider></v-divider>
        <v-list-tile
          active-class="blue-grey darken-4"
          :class="item.path === $route.path ? 'blue-grey darken-4' : ''"
          v-for="item in userMenuItem"
          :key="item.title"
          :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  import Toolbar from './Toolbar';

  export default {
    components: { Toolbar },
    tempplate: '#navigation-template',
    data() {
      return {
        screenSize: '',
        windowWidth: null,
        drawer: {
          open: false,
          clipped: true,
          fixed: true,
          permanent: true,
          mini: this.windowWidth > 600 && this.windowWidth < 1264,
          debounceMobile: this.windowWidth <= 600,
          debounceTablet: this.windowWidth > 600 && this.windowWidth < 1264,
          debounceDesktop: this.windowWidth >= 1264,
        },
        toolbar: {
          fixed: true,
          clippedLeft: true,
        },
        navigationDrawerItems: [
          { name: 'Home', icon: 'dashboard', path: '/' },
          { name: 'Playlists', icon: 'queue_music', path: '/playlists' }
        ],
        correctionHelper: [
          { name: 'Artist', icon: 'dashboard', path: '/artist' },
          { name: 'Album', icon: 'queue_music', path: '/album' }
        ],
        userMenuItem: [
          { name: 'Profile', icon: 'person', path: '/profile' },
          { name: 'Settings', icon: 'settings', path: '/settings' },
          { name: 'Logout', icon: 'logout', path: '/logout' }
        ],
      };
    },
    mounted() {
      this.windowWidth = window.innerWidth;
      this.$nextTick(() => {
        window.onresize = () => {
          this.windowWidth = window.innerWidth;
          if (this.windowWidth <= 600 && this.drawer.debounceMobile === false) {
            this.drawer.open = false;
            this.drawer.clipped = false;
            this.drawer.fixed = false;
            this.drawer.permanent = false;
            this.drawer.mini = false;
            this.toolbar.fixed = true;
            this.toolbar.clippedLeft = true;
            this.drawer.debounceMobile = true;
            this.drawer.debounceTablet = false;
            this.drawer.debounceDesktop = false;
          } else if (this.windowWidth > 600 && this.windowWidth < 1264 &&
                                        this.drawer.debounceTablet === false) {
            this.drawer.clipped = false;
            this.drawer.fixed = true;
            this.drawer.permanent = true;
            this.drawer.mini = true;
            this.toolbar.fixed = true;
            this.toolbar.clippedLeft = false;
            this.drawer.debounceMobile = false;
            this.drawer.debounceTablet = true;
            this.drawer.debounceDesktop = false;
          } else if (this.windowWidth >= 1264 && this.drawer.debounceDesktop === false) {
            this.drawer.open = true;
            this.drawer.clipped = true;
            this.drawer.fixed = true;
            this.drawer.permanent = true;
            this.drawer.mini = false;
            this.toolbar.fixed = false;
            this.toolbar.clippedLeft = true;
            this.drawer.debounceMobile = false;
            this.drawer.debounceTablet = false;
            this.drawer.debounceDesktop = true;
          }
        };
      });
    },
  };
</script>
