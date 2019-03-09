const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default {
  getImageUrlOfSize(url, size) {
    const baseUrl = url.substring(0, url.indexOf('/source/') + '/source/'.length);
    return `${baseUrl}${size}x${size}bb.jpg`;
  },

  getItunesLink(baseLink) {
    return `${baseLink.replace(/\/us\//, '/ca/')}&app=music`;
  },

  getPrettyDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = MONTHS[date.getMonth()];
    const dayNumber = date.getDate();

    let suffix = '';
    if (dayNumber === 1) suffix = 'st';
    else if (dayNumber === 2) suffix = 'nd';
    else if (dayNumber === 3) suffix = 'rd';
    else suffix = 'th';

    return `${month} ${dayNumber}${suffix}, ${year}`;
  },

  getPrettyDuration(timeInMillis) {
    const time = new Date(timeInMillis);
    const hours = time.getHours();
    const minutes = time.getMinutes();
    let seconds = time.getSeconds();
    if (seconds < 10) seconds = `0${seconds}`;
    return hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
  }
};
