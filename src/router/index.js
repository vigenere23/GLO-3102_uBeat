import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Album from '@/components/Album';
import Artist from '@/components/Artist';
import Playlists from '@/components/Playlists';
import PlaylistAlbum from '@/components/PlaylistAlbum';
import Search from '@/components/Search';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import LogIn from '../components/LogIn';
import SignUp from '../components/SignUp';
import LogOut from '../components/LogOut';
import Profile from '../components/Profile';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/artist/:artistId',
      name: 'Artist',
      component: Artist
    },
    {
      path: '/album/:albumId',
      name: 'Album',
      component: Album
    },
    {
      path: '/users/:userId/playlists',
      name: 'Playlists',
      component: Playlists
    },
    {
      path: '/playlists',
      name: 'playlistRedirection',
      component: Playlists
    },
    {
      path: '/playlists/:playlistId',
      name: 'PlaylistAlbum',
      component: PlaylistAlbum
    },
    {
      path: '/search/:type/:query',
      name: 'Search',
      component: Search
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/logout',
      name: 'LogOut',
      component: LogOut
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ],
});
