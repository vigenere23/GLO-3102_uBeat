import axiosHelper from '@/js/helpers/axios';

const BASE_URL = 'https://guarded-falls-12203.herokuapp.com';

export default class SpotifyApi {

  static async getArtistInfosByName(artistName) {
    const url = `${BASE_URL}/search`;
    const params = {
      q: artistName,
      type: 'artist',
      limit: 1
    };

    const response = await axiosHelper.axiosGet(url, { params, withCredentials: true });
    return response.artists.items[0] || null;
  }

  static async getArtistInfosById(artistId) {
    const url = `${BASE_URL}/artists/${artistId}`;
    const response = await axiosHelper.axiosGet(url, { withCredentials: true });
    return response;
  }

  static async getSimilarArtists(artistId) {
    const url = `${BASE_URL}/artists/${artistId}/similar`;

    const response = await axiosHelper.axiosGet(url, { withCredentials: true });

    const artists = [];
    response.artists.forEach(async (artist) => {
      const artistInfo = await this.getArtistInfosById(artist.id);
      if (!artistInfo.error) {
        artists.push(artistInfo);
      }
    });
    return artists;
  }

}
