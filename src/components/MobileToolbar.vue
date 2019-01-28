<template>
  <div id="mobileToolbar">
    <div id="phoneToolbar" class="hidden-md-and-up">
      <v-layout align-center justify-center>
        <v-container>
          <v-layout>
            <v-flex xs12 sm12 md12>
              <v-toolbar>
                <v-toolbar-side-icon
                  @click.stop="drawer = !drawer"
                >
                </v-toolbar-side-icon>
                <v-text-field
                  id="mobileSearchField"
                  solo
                  flat
                  hide-details
                  placeholder="Search">
                </v-text-field>
                <v-btn icon>
                  <v-icon>clear</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>search</v-icon>
                </v-btn>
              </v-toolbar>
            </v-flex>
          </v-layout>
        </v-container>
      </v-layout>

      <div id="tabletToolbar" class="md">
      </div>
      <v-layout>
        <v-navigation-drawer
          v-model="drawer"
          absolute
          temporary
        >
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
              v-for="item in items"
              :key="item.title"
              @click=""
            >
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
  </div>
</template>
<script>
  export default {
    name: 'mobileToolbar',
    data() {
      return {
        drawer: null,
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'Playlists', icon: 'queue_music' },
          { title: 'Profile', icon: 'person' },
          { title: 'Settings', icon: 'settings' },
          { title: 'Logout', icon: 'logout' }
        ]
      };
    }
  };
</script>
