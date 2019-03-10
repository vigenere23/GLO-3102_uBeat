let songPlaying;
export default {
  async playSong(url) {
    const audio = new Audio(url);
    songPlaying = audio;
    songPlaying.play();
  },
  async stopSong() {
    if (songPlaying !== undefined) {
      songPlaying.pause();
    }
  }
};
