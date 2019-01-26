<template>
  <v-toolbar id="desktopToolbar">
    <v-btn flat icon>
      <router-link to="/artist"><v-icon>headset</v-icon></router-link>
    </v-btn>
    <v-toolbar-title class="toolbarTitle"><router-link to="/">UBeat</router-link></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-text-field
      id="desktopSearchField"
      solo
      flat
      box
      hide-details
      style="max-width: 600px; min-width: 600px;"
      placeholder="Search"
      prepend-inner-icon="search">
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
            v-for="(item, index) in items"
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
    name: 'desktopToolbar',
    data: () => ({
      items: [
        { title: 'Profile' },
        { title: 'Settings' },
        { title: 'Logout' }
      ]
    })
  };
</script>
<style>
  #desktopSearchField {
    color: black;
  }
</style>
