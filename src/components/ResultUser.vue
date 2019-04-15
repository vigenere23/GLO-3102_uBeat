<template>
  <v-layout row>
    <router-link class="white--text"
                 :to="'/profile/' + user.id">{{user.name}}
    </router-link>
    <v-list-tile-action>
      <v-menu offset-x left>
        <v-btn icon ripple slot="activator" @click="follow()">
          <v-icon color="white">add</v-icon>
        </v-btn>
      </v-menu>
    </v-list-tile-action>
  </v-layout>
</template>

<script>
  import ubeat from '@/js/apis/ubeat';
  import Cookies from 'js-cookie';

  export default {
    name: 'ResultUser',
    props: {
      user: {}
    },
    data() {
      return {
      };
    },
    methods: {
      async follow() {
        await ubeat.follow(this.user.id, Cookies.get('uBeatCookie'));
      },
    },
  };
</script>
