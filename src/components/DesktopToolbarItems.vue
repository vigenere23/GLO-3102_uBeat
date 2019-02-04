<template>
    <div id="desktopToolbarItems" v-if="isFixed">
        <v-toolbar-items>
            <v-btn flat>Playlists</v-btn>
            <v-menu offset-y>
                <v-btn slot="activator" flat>Username
                    <v-avatar id="userAvatar"><img src="/static/generic-avatar.png"></v-avatar>
                </v-btn>
                <v-list>
                    <v-list-tile
                            v-for="(item, index) in this.items"
                            :key="index"
                            @click=''>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar-items>
    </div>
</template>
<script>
  export default {
    name: 'desktopToolbarItems',
    data: () => ({
      items: [
        { title: 'Profile', ref: '/profile' },
        { title: 'Settings', ref: '/settings' },
        { title: 'Logout', ref: '/logout' }
      ],
    }),
    props: {
      isFixed: {},
    }
  };
</script>
