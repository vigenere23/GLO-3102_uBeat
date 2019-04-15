import axios from 'axios';
import Cookies from 'js-cookie';
import router from '@/router/index';

export default {
  async axiosGet(url, header) {
    try {
      const response = await axios.get(url, header);
      return response.data;
    } catch (err) {
      if (err.response.status === 401) {
        Cookies.remove('uBeatCookie');
        router.push('/login');
      }
      return null;
    }
  },

  async axiosPost(url, body, options) {
    try {
      const response = await axios.post(url, body, options);
      return response.data;
    } catch (err) {
      if (err.response.status === 401) {
        Cookies.remove('uBeatCookie');
        router.push('/login');
      }
      return null;
    }
  },

  async axiosPut(url, body) {
    try {
      const options = { headers: { Authorization: Cookies.get('uBeatCookie') } };
      const response = await axios.put(url, body, options);
      return response.data;
    } catch (err) {
      if (err.response.status === 401) {
        Cookies.remove('uBeatCookie');
        router.push('/login');
      }
      return null;
    }
  },

  async axiosDelete(url, header) {
    try {
      const response = await axios.delete(url, header);
      return response.data;
    } catch (err) {
      if (err.response.status === 401) {
        Cookies.remove('uBeatCookie');
        router.push('/login');
      }
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
