<template>
    <div id="toolbar">
      <v-layout align-center justify-center>
        <v-container>
          <v-layout>
            <v-flex>
              <v-toolbar
              :fixed="toolbar.fixed"
              :clipped-left="toolbar.clippedLeft">
                <v-toolbar-side-icon
                  v-if="!toolbar.fixed"
                  @click.stop="toggleDrawer">
                </v-toolbar-side-icon>
                <v-btn flat id="toolbarHomeBtn" v-if="toolbar.fixed">
                  <router-link to="/"><v-icon>headset</v-icon>  UBeat</router-link>
                </v-btn>
                <v-spacer v-if="toolbar.fixed"></v-spacer>
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
                <v-spacer v-if="toolbar.fixed"></v-spacer>
                <desktopToolbarItems :fixed="toolbar.fixed"/>
              </v-toolbar>
            </v-flex>
          </v-layout>
        </v-container>
      </v-layout>
      <v-layout>
        <v-navigation-drawer
          :clipped="drawer.clipped"
          :fixed="drawer.fixed"
          :permanent="drawer.permanent"
          :mini-variant="drawer.mini"
          v-model="drawer.open">
          <v-list class="pa-1">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="/static/generic-avatar.png">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>User</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn
                  @click.stop="mini = !mini"
                  icon
                >
                  <v-icon>chevron_left</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
          <v-list class="pt-0" dense>
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
        </v-navigation-drawer>
      </v-layout>
    </div>
</template>

<script>
  import DesktopToolbarItems from './DesktopToolbarItems';

  export default {
    name: 'Toolbar',
    components: { DesktopToolbarItems },
    data() {
      return {
        drawer: {
          open: false,
          clipped: false,
          fixed: false,
          permanent: false,
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
        methods: {
          makeDrawerDesktop() {
            this.drawer.open = false;
            this.drawer.clipped = false;
            this.drawer.fixed = true;
            this.drawer.permanent = false;
            this.drawer.mini = false;
            this.toolbar.fixed = true;
            this.toolbar.clippedLeft = false;
          },
          makeDrawerTablet() {
            this.drawer.open = true;
            this.drawer.clipped = false;
            this.drawer.fixed = true;
            this.drawer.permanent = true;
            this.drawer.mini = false;
            this.toolbar.fixed = false;
            this.toolbar.clippedLeft = false;
          },
          makeDrawerPhone() {
            this.drawer.open = false;
            this.drawer.clipped = true;
            this.drawer.fixed = true;
            this.drawer.permanent = true;
            this.drawer.mini = false;
            this.toolbar.fixed = true;
            this.toolbar.clippedLeft = false;
          },
          toggleMiniDrawer() {
            this.drawer.mini = !this.drawer.mini;
          },
          toggleDrawer() {
            if (this.drawer.permanent) {
              this.drawer.permanent = !this.drawer.permanent;
              // set the clipped state of the drawer and toolbar
              this.drawer.clipped = true;
              this.toolbar.clippedLeft = true;
            } else {
              // normal drawer
              this.drawer.open = !this.drawer.open;
            }
          }
        }
      };
    },
    mounted() {
      this.$nextTick(() => {
        window.addEventListener('resize', () => {
          if (window.innerWidth > 1024) {
            console.log('DESKTOP MODE ACTIVATED');
            this.methods.makeDrawerDesktop();
          } else if (window.innerWidth < 1024 && window.innerWidth > 640) {
            console.log('TABLET MODE ACTIVATED');
            this.methods.makeDrawerTablet();
          } else {
            console.log('PHONE MODE ACTIVATED');
            this.methods.makeDrawerPhone();
          }
        });
      });
    },
  };
</script>
