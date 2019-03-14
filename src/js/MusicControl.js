/* let songPlaying;
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
}; */


export default class SongPlayer {
  constructor() {
    if (!SongPlayer.instance) {
      this.listOfSongs = [];
      this.listOfPastSongs = [];
      SongPlayer.instance = this;
    }
    return SongPlayer.instance;
  }
  addSong(url) {
    this.listOfSongs.push(url);
  }
  deleteSong(songNumberInList) {
    this.listOfSongs.splice(songNumberInList, 1);
  }
  playSong() {
    global.audio = new Audio(this.listOfSongs[0]);
    global.audio.play();
  }
  playPastSong() {
    global.audio = new Audio(this.listOfPastSongs.pop());
    global.audio.play();
  }
  pauseSong() {
    if (this.listOfSongs.length > 0) {
      global.audio.pause();
    }
  }
  playNextSong() {
    if (this.listOfSongs.length > 1) {
      this.pauseSong();
      this.listOfPastSongs.push(this.listOfSongs[0]);
      this.deleteSong(0);
      this.playSong();
    } else {
      this.pauseSong();
    }
  }
  restartSongOrPrevious() {
    if (global.audio.currentTime > 5) {
      global.audio.currentTime = 0;
    } else {
      this.pauseSong();
      this.playPastSong();
    }
  }
}

