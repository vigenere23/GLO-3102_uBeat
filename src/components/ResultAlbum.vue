<template>
  <v-layout row>
    <router-link class="white--text"
                 :to="'/album/' + album.collectionId">{{album.collectionName}} - ({{album.artistName}})
    </router-link>
    <v-list-tile-action>
      <v-menu offset-x left>
        <v-btn icon ripple slot="activator">
          <v-icon color="white">add</v-icon>
        </v-btn>
        <v-list dense>
          <v-list-tile @click="addToPlaylist(playlist)" v-for="playlist in playlists" :key="playlist.id">
            <v-list-tile-title>{{ playlist.name }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-list-tile-action>
  </v-layout>
</template>

<script>
  import ubeat from '@/js/apis/ubeat';
  import * as Cookies from 'js-cookie';

  export default {
    name: 'ResultAlbum',
    props: {
      album: {}
    },
    data() {
      return {
        playlists: [],
      };
    },
    methods: {
      addToPlaylist(playlist) {
        ubeat.addAlbumToPlaylist(playlist.id, this.album.collectionId);
      }
    },
    async mounted() {
      const cookie = Cookies.get('uBeatCookie');
      if (!(cookie === null || cookie === undefined || cookie === '')) {
        const json = await ubeat.tokenInfo(cookie);
        const userId = json.id;
        this.playlists = await ubeat.getUserPlaylists(userId);
        this.playlists.sort();
      } else {
        this.$router.push({ path: '/login' });
      }
    },
  };
</script>
