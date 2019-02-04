<template>
    <div id="toolbar">
      <v-layout align-center justify-center>
        <v-container>
          <v-layout>
            <v-flex>
              <v-toolbar
              :fixed="isFixed">
                <v-toolbar-side-icon
                  v-if="!isFixed"
                  @click.stop="drawer = !drawer">
                </v-toolbar-side-icon>
                <v-btn flat id="toolbarHomeBtn" v-if="isFixed">
                  <router-link to="/"><v-icon>headset</v-icon>  UBeat</router-link>
                </v-btn>
                <v-spacer v-if="isFixed"></v-spacer>
                <v-text-field
                  id="searchField"
                  solo
                  flat
                  hide-details
                  style="max-width: 800px; width: 500px;"
                  @blur="inputIsSelectedIcon = 'search'"
                  @input="inputIsSelectedIcon = 'clear'"
                  :append-icon="inputIsSelectedIcon"
                  placeholder="Search">
                </v-text-field>
                <v-spacer v-if="isFixed"></v-spacer>
                <desktopToolbarItems :is-fixed="isFixed"/>
              </v-toolbar>
            </v-flex>
          </v-layout>
        </v-container>
      </v-layout>
      <v-layout>
        <v-navigation-drawer
          v-model="drawer"
          absolute
          temporary>
          <v-list class="pa-1">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="/static/generic-avatar.png">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>User</v-list-tile-title>
              </v-list-tile-content>
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
        drawer: null,
        isFixed: true,
        isTablet: false,
        inputIsSelectedIcon: 'search',
        navigationDrawerItems: [
          { title: 'Home', icon: 'dashboard', ref: '/' },
          { title: 'Playlists', icon: 'queue_music', ref: '/playlists' },
          { title: 'Profile', icon: 'person', ref: '/profile' },
          { title: 'Settings', icon: 'settings', ref: '/settings' },
          { title: 'Logout', icon: 'logout', ref: '/logout' }
        ],
      };
    },
    mounted() {
      this.$nextTick(() => {
        window.addEventListener('resize', () => {
          this.isFixed = window.innerWidth > 1024;
          this.isTablet = window.innerWidth < 1024 && window.innerWidth > 640;
        });
      });
    },
  };
</script>
