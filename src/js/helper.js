export default {
  getImageUrlOfSize(url, size) {
    const baseUrl = url.substring(0, url.indexOf('/source/') + '/source/'.length);
    return `${baseUrl}${size}x${size}bb.jpg`;
  },

  getItunesLink(baseLink) {
    return `${baseLink.replace(/\/us\//, '/ca/')}&app=music`;
  }
};
