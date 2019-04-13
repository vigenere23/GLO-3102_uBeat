import axios from 'axios';

const API_URL = 'https://ubeat.herokuapp.com/unsecure';


async function get(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    return null;
  }
}

async function post(url, body) {
  try {
    const response = await axios.post(url, body);
    return response.data;
  } catch (err) {
    return null;
  }
}

async function put(url, body) {
  try {
    const response = await axios.put(url, body);
    return response.data;
  } catch (err) {
    return null;
  }
}

async function deleteFromApi(url) {
  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (err) {
    return null;
  }
}

function extractSingleResult(data) {
  return data && data.results ? data.results[0] : {};
}

function extractMultipleResults(data) {
  return data ? data.results : [];
}

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
    const url = `${API_URL}/artists/${artistId}/albums`;
    const data = await get(url);
    const albums = extractMultipleResults(data);
    return sortAlbumsDesc(albums);
  },

  async getArtistInfos(artistId) {
    const url = `${API_URL}/artists/${artistId}`;
    const data = await get(url);
    return extractSingleResult(data);
  },

  async getUserInfos(userId) {
    const url = `${API_URL}/users/${userId}`;
    return get(url);
  },

  async getUserPlaylists(userId) {
    const url = `${API_URL}/playlists`;
    const data = await get(url);
    return filterPlaylistsByUser(data, userId);
  },

  async getAlbumInfos(albumId) {
    const url = `${API_URL}/albums/${albumId}`;
    const data = await get(url);
    return extractSingleResult(data);
  },

  async getAlbumTracks(albumId) {
    const url = `${API_URL}/albums/${albumId}/tracks`;
    const data = await get(url);
    return extractMultipleResults(data);
  },

  async getPlaylistInfosAndTracks(playlistId) {
    const url = `${API_URL}/playlists/${playlistId}`;
    return get(url);
  },

  async addPlaylist(newName, newOwner) {
    const url = `${API_URL}/playlists`;
    return post(url, {
      name: newName,
      owner: newOwner,
    });
  },

  async deletePlaylists(playlistId) {
    const url = `${API_URL}/playlists/${playlistId}`;
    return deleteFromApi(url);
  },

  async changeNamePlaylist(playlistId, newName, newOwner) {
    const url = `${API_URL}/playlists/${playlistId}`;
    return put(url, {
      name: newName,
      owner: newOwner,
    });
  },

  async deleteSongTrackFromPlaylist(playlistId, songId) {
    const url = `${API_URL}/playlists/${playlistId}/tracks/${songId}`;
    return deleteFromApi(url);
  },

  async addSongToPlaylist(playlistId, track) {
    const url = `${API_URL}/playlists/${playlistId}/tracks`;
    return post(url, track);
  }
  ,

  async search(type, query) {
    const properType = (type === 'global') ? '' : type;
    const url = encodeURI(`${API_URL}/search/${properType}?q=${query}`);
    const results = await get(url);
    if (type === 'global') {
      const urlUsers = encodeURI(`${API_URL}/search/users?q=${query}`);
      const usersResult = await get(urlUsers);
      return extractMultipleResults(results).concat(usersResult);
    } else if (type !== 'users') {
      return extractMultipleResults(results);
    }
    return results;
  }
};
