<link rel = "stylesheet" type = "text/css" href = "../css/style.css" />
<template>
  <div id="navigationContainer">
    <div id="mobileToolbarContainer" class="hidden-md-and-up">
      <v-toolbar floating></v-toolbar>
    </div>
    <div id="desktopToolbarContainer" class="hidden-sm-and-down">
      <v-toolbar id="desktopToolbar">
        <v-toolbar-icon><v-icon>headset</v-icon></v-toolbar-icon>
        <v-toolbar-title>UBeat</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          id="desktopSearchField"
          solo
          flat
          box
          prepend-inner-icon="search">
        </v-text-field>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn flat>Playlists</v-btn>
          <v-menu offset-y>
            <v-btn slot="activator" flat>Username<v-avatar id="userAvatar"><img src="/static/generic-avatar.png"></v-avatar></v-btn>
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
    </div>
  </div>
</template>

<style>
  #desktopSearchField{
    color: black;
  }
</style>

<script type="text/javascript" src="../js/Navigation.js">
</script>

