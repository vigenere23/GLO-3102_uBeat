import axiosHelper from '@/js/helpers/axios';

const BASE_URL = 'http://localhost:9090';

export default {

  async getArtistInfosByName(artistName) {
    const url = `${BASE_URL}/search`;
    const params = {
      q: artistName,
      type: 'artist',
      limit: 1
    };

    const response = await axiosHelper.axiosGet(url, { params, withCredentials: true });
    return response.artists.items[0] || {};
  }

};
