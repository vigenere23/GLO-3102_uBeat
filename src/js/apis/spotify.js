import axiosHelper from '@/js/helpers/axios'
import ubeat from '@/js/apis/ubeat'

const BASE_URL = 'http://localhost:9090'

export default class SpotifyApi {
  static async getArtistInfosByName (artistName) {
    const url = `${BASE_URL}/search`
    const params = {
      q: artistName,
      type: 'artist',
      limit: 1
    }

    const response = await axiosHelper.axiosGet(url, { params, withCredentials: true })
    return response.artists.items[0] || null
  }

  static async getArtistInfosById (artistId) {
    const url = `${BASE_URL}/artists/${artistId}`
    const response = await axiosHelper.axiosGet(url, { withCredentials: true })
    return response
  }

  static async getSimilarArtists (artistId) {
    const url = `${BASE_URL}/artists/${artistId}/similar`

    const response = await axiosHelper.axiosGet(url, { withCredentials: true })

    const artists = []
    const promises = response.artists.map(async (artist) => {
      const artistInfo = await this.getArtistInfosById(artist.id)
      if (!artistInfo.error) {
        const ubeatArtistInfo = await ubeat.searchSingleArtistByName(artistInfo.name)
        if (ubeatArtistInfo && !ubeatArtistInfo.error) {
          artists.push({ ...artistInfo, ...ubeatArtistInfo.results[0] })
        }
      }
    })
    await Promise.all(promises)

    return artists
  }
}
