import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Album from '@/components/Album';
import Artist from '@/components/Artist';
import Playlists from '@/components/Playlists';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/artist',
      redirect: '/artist/290242959'
    },
    {
      path: '/artist/:artistId',
      name: 'Artist',
      component: Artist
    },
    {
      path: '/album',
      name: 'Album',
      component: Album
    },
    {
      path: '/playlists',
      redirect: '/users/5be872a1e495370004798456/playlists'
      // 5c81361ad6f63a0004c26542 Our user id
    },
    {
      path: '/users/:userId/playlists',
      name: 'Playlists',
      component: Playlists
    }
  ],
});
