import consts from '@/js/constants';
import axios from 'axios';

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

export default {
  getImageUrlOfSize(url, size) {
    const baseUrl = url.substring(0, url.indexOf('/source/') + '/source/'.length);
    return `${baseUrl}${size}x${size}bb.jpg`;
  },

  getItunesLink(baseLink) {
    return `${baseLink.replace(/\/us\//, '/ca/')}&app=music`;
  },

  async getAlbumsOfArtist(artistId) {
    const url = `${consts.API_URL}/artists/${artistId}/albums`;
    const data = await getFromApi(url);
    const albums = extractMultipleResults(data);
    return sortAlbumsDesc(albums);
  },

  async getArtistInfos(artistId) {
    const url = `${consts.API_URL}/artists/${artistId}`;
    const data = await getFromApi(url);
    return extractSingleResult(data);
  }
};
