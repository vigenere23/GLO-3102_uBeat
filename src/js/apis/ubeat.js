import axiosHelper from '@/js/helpers/axios';

const BASE_URL = 'https://ubeat.herokuapp.com/unsecure';
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
    const data = await axiosHelper.axiosGet(url);
    const albums = axiosHelper.extractMultipleResults(data);
    return sortAlbumsDesc(albums);
  },

  async getArtistInfos(artistId) {
    const url = `${BASE_URL}/artists/${artistId}`;
    const data = await axiosHelper.axiosGet(url);
    return axiosHelper.extractSingleResult(data);
  },

  async getUserInfos(userId) {
    const url = `${BASE_URL}/users/${userId}`;
    return axiosHelper.axiosGet(url);
  },

  async getUserPlaylists(userId) {
    const url = `${BASE_URL}/playlists`;
    const data = await axiosHelper.axiosGet(url);
    return filterPlaylistsByUser(data, userId);
  },

  async getAlbumInfos(albumId) {
    const url = `${BASE_URL}/albums/${albumId}`;
    const data = await axiosHelper.axiosGet(url);
    return axiosHelper.extractSingleResult(data);
  },

  async getAlbumTracks(albumId) {
    const url = `${BASE_URL}/albums/${albumId}/tracks`;
    const data = await axiosHelper.axiosGet(url);
    return axiosHelper.extractMultipleResults(data);
  },

  async getPlaylistInfosAndTracks(playlistId) {
    const url = `${BASE_URL}/playlists/${playlistId}`;
    return axiosHelper.axiosGet(url);
  },

  async addPlaylist(newName, newOwner) {
    const url = `${BASE_URL}/playlists`;
    return axiosHelper.axiosPost(url, {
      name: newName,
      owner: newOwner,
    });
  },

  async deletePlaylists(playlistId) {
    const url = `${BASE_URL}/playlists/${playlistId}`;
    return axiosHelper.axiosDelete(url);
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
    return axiosHelper.axiosDelete(url);
  },

  async addSongToPlaylist(playlistId, track) {
    const url = `${BASE_URL}/playlists/${playlistId}/tracks`;
    return axiosHelper.axiosPost(url, track);
  },
  async searchSingleArtistByName(name) {
    const url = `${BASE_URL}/search/artists`;
    const params = { q: name, limit: 1 };
    return axiosHelper.axiosGet(url, { params });
  },

  async search(type, query) {
    const properType = (type === 'global') ? '' : type;
    const url = encodeURI(`${BASE_URL}/search/${properType}?q=${query}`);
    const results = await axiosHelper.axiosGet(url);
    if (type === 'global') {
      const urlUsers = encodeURI(`${BASE_URL}/search/users?q=${query}`);
      const usersResult = await axiosHelper.axiosGet(urlUsers);
      return axiosHelper.extractMultipleResults(results).concat(usersResult);
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
    return axiosHelper.axiosPost(url, body);
  },

  async unfollow(targetUserId) {
    const url = `${LOGIN}/follow/${targetUserId}`;
    return axiosHelper.axiosDelete(url);
  },

  async follow(targetUserId) {
    const url = `${LOGIN}/follow`;
    const body = {
      id: targetUserId,
    };
    return axiosHelper.axiosPost(url, body);
  },

  async login(userEmail, userPassword) {
    const url = `${LOGIN}/login`;
    const body = {
      email: userEmail,
      password: userPassword
    };
    return axiosHelper.axiosPost(url, body);
  },

  async tokenInfo(cookie) {
    const url = `${LOGIN}/tokenInfo`;
    const header = {
      headers: { Authorization: cookie }
    };
    return axiosHelper.axiosGet(url, header);
  }

};
