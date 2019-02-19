import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Album from '@/components/Album';
import Artist from '@/components/Artist';
import ArtistExample from '@/components/ArtistExample';
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
      name: 'ArtistExample',
      component: ArtistExample
    },
    {
      path: '/artist/:artistId',
      name: 'Artist',
      component: Artist,
      props: true
    },
    {
      path: '/album',
      name: 'Album',
      component: Album
    }
  ],
});
