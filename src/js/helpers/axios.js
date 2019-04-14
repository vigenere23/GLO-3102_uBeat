import axios from 'axios';
import qs from 'qs';
import Cookies from 'js-cookie';

export default {
  async axiosGet(url, header) {
    try {
      const response = await axios.get(url, header);
      return response.data;
    } catch (err) {
      return null;
    }
  },

  async axiosPost(url, body, options) {
    try {
      const response = await axios.post(url, qs.stringify(body), options);
      return response.data;
    } catch (err) {
      return null;
    }
  },

  async axiosPut(url, body) {
    try {
      const params = { headers: { Authorization: Cookies.get('uBeatCookie') } };
      const response = await axios.put(url, body, params);
      return response.data;
    } catch (err) {
      return null;
    }
  },

  async axiosDelete(url, header) {
    try {
      const response = await axios.delete(url, header);
      return response.data;
    } catch (err) {
      return null;
    }
  },

  extractSingleResult(data) {
    return data && data.results ? data.results[0] : {};
  },

  extractMultipleResults(data) {
    return data ? data.results : [];
  }
};
