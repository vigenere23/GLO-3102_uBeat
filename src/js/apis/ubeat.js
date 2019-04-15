import axiosHelper from '@/js/helpers/axios';
import Cookies from 'js-cookie';

const BASE_URL = 'https://ubeat.herokuapp.com';
const LOGIN = 'https://ubeat.herokuapp.com';

function sortAlbumsDesc(albums) {
  return albums.sort((album1, album2) => {
    const date1 = new Date(album1.releaseDate);
    const date2 = new Date(album2.releaseDate);
    return date1 < date2 ? 1 : -1;
  });
}

function filterPlaylistsByUser(playlists, userId) {
  return playlists.filter(playlist => playlist.owner && playlist.owner.id === userId);
}

export default {
  async getAlbumsOfArtist(artistId) {
    const url = `${BASE_URL}/artists/${artistId}/albums`;
    const options = { headers: { Authorization: Cookies.get('uBeatCookie') } };
    const data = await axiosHelper.axiosGet(url, options);
    const albums = axiosHelper.extractMultipleResults(data);
    return sortAlbumsDesc(albums);
  },

  async getArtistInfos(artistId) {
    const url = `${BASE_URL}/artists/${artistId}`;
    const options = { headers: { Authorization: Cookies.get('uBeatCookie') } };
    const data = await axiosHelper.axiosGet(url, options);
    return axiosHelper.extractSingleResult(data);
  },

  async getUserInfos(userId) {
    const url = `${BASE_URL}/users/${userId}`;
    const options = { headers: { Authorization: Cookies.get('uBeatCookie') } };
    return axiosHelper.axiosGet(url, options);
  },

  async getUserPlaylists(userId) {
    const url = `${BASE_URL}/playlists`;
    const options = { headers: { Authorization: Cookies.get('uBeatCookie') } };
    const data = await axiosHelper.axiosGet(url, options);
    return filterPlaylistsByUser(data, userId);
  },

  async getAlbumInfos(albumId) {
    const url = `${BASE_URL}/albums/${albumId}`;
    const options = { headers: { Authorization: Cookies.get('uBeatCookie') } };
    const data = await axiosHelper.axiosGet(url, options);
    return axiosHelper.extractSingleResult(data);
  },

  async getAlbumTracks(albumId) {
    const url = `${BASE_URL}/albums/${albumId}/tracks`;
    const options = { headers: { Authorization: Cookies.get('uBeatCookie') } };
    const data = await axiosHelper.axiosGet(url, options);
    return axiosHelper.extractMultipleResults(data);
  },

  async getPlaylistInfosAndTracks(playlistId) {
    const url = `${BASE_URL}/playlists/${playlistId}`;
    const options = { headers: { Authorization: Cookies.get('uBeatCookie') } };
    return axiosHelper.axiosGet(url, options);
  },

  async addPlaylist(newName, newOwner) {
    const url = `${BASE_URL}/playlists`;
    const options = { headers: { Authorization: Cookies.get('uBeatCookie') } };
    return axiosHelper.axiosPost(url, {
      name: newName,
      owner: newOwner,
    }, options);
  },

  async deletePlaylists(playlistId) {
    const url = `${BASE_URL}/playlists/${playlistId}`;
    const header = { headers: { Authorization: Cookies.get('uBeatCookie') } };
    return axiosHelper.axiosDelete(url, header);
  },

  async changeNamePlaylist(playlistId, newName, newOwner) {
    const url = `${BASE_URL}/playlists/${playlistId}`;
    return axiosHelper.axiosPut(url, {
      name: newName,
      owner: newOwner,
    });
  },

  async deleteSongTrackFromPlaylist(playlistId, songId) {
    const url = `${BASE_URL}/playlists/${playlistId}/tracks/${songId}`;
    const options = { headers: { Authorization: Cookies.get('uBeatCookie') } };
    return axiosHelper.axiosDelete(url, options);
  },

  async addSongToPlaylist(playlistId, track) {
    const url = `${BASE_URL}/playlists/${playlistId}/tracks`;
    const options = { headers: { Authorization: Cookies.get('uBeatCookie') } };
    return axiosHelper.axiosPost(url, track, options);
  },
  async searchSingleArtistByName(name) {
    const url = `${BASE_URL}/search/artists`;
    const options = {
      headers: { Authorization: Cookies.get('uBeatCookie') },
      params: { q: name, limit: 1 }
    };
    return axiosHelper.axiosGet(url, options);
  },

  async search(type, query) {
    const options = {
      headers: { Authorization: Cookies.get('uBeatCookie') },
      params: { q: query }
    };
    const properType = (type === 'global') ? '' : type;
    const url = `${BASE_URL}/search/${properType}`;
    const results = await axiosHelper.axiosGet(url, options);
    if (type === 'global') {
      const urlUsers = `${BASE_URL}/search/users`;
      const usersResult = await axiosHelper.axiosGet(urlUsers, options);
      return axiosHelper.extractMultipleResults(results)
        .concat(usersResult);
    } else if (type !== 'users') {
      return axiosHelper.extractMultipleResults(results);
    }
    return results;
  },

  async signup(userName, userEmail, userPassword) {
    const url = `${LOGIN}/signup`;
    const body = {
      name: userName,
      email: userEmail,
      password: userPassword
    };
    const options = { headers: { Authorization: Cookies.get('uBeatCookie') } };
    return axiosHelper.axiosPost(url, body, options);
  },

  async unfollow(targetUserId, cookie) {
    const url = `${LOGIN}/follow/${targetUserId}`;
    const header = {
      headers: { Authorization: cookie }
    };
    return axiosHelper.axiosDelete(url, header);
  },

  async follow(targetUserId, cookie) {
    const url = `${LOGIN}/follow`;
    const header = {
      headers: { Authorization: cookie }
    };
    const body = {
      id: targetUserId,
    };
    return axiosHelper.axiosPost(url, body, header);
  },

  async login(userEmail, userPassword) {
    const url = `${LOGIN}/login`;
    const body = {
      email: userEmail,
      password: userPassword
    };
    const options = { headers: { Authorization: Cookies.get('uBeatCookie') } };
    return axiosHelper.axiosPost(url, body, options);
  },

  async tokenInfo(cookie) {
    const url = `${LOGIN}/tokenInfo`;
    const header = {
      headers: { Authorization: cookie }
    };
    return axiosHelper.axiosGet(url, header);
  }

};
