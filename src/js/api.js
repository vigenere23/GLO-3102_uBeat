import axios from 'axios';

const API_URL = 'https://ubeat.herokuapp.com/unsecure';

async function getFromApi(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    return {};
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
    const data = await getFromApi(url);
    const albums = extractMultipleResults(data);
    return sortAlbumsDesc(albums);
  },

  async getArtistInfos(artistId) {
    const url = `${API_URL}/artists/${artistId}`;
    const data = await getFromApi(url);
    return extractSingleResult(data);
  },

  async getUserInfos(userId) {
    const url = `${API_URL}/users/${userId}`;
    return getFromApi(url);
  },

  async getUserPlaylists(userId) {
    const url = `${API_URL}/playlists`;
    const data = await getFromApi(url);
    return filterPlaylistsByUser(data, userId);
  }
};
