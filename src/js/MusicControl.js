export default class SongPlayer {
  constructor() {
    if (!SongPlayer.instance) {
      this.listOfSongs = [];
      this.listOfPastSongs = [];
      SongPlayer.instance = this;
    }
    return SongPlayer.instance;
  }
  addSong(song) {
    this.listOfSongs.push(song);
  }
  deleteSong(songNumberInList) {
    this.listOfSongs.splice(songNumberInList, 1);
  }
  deleteElementsInArray() {
    this.listOfSongs = [];
    this.listOfPastSongs = [];
  }
  playSong() {
    // if (global.audio) global.audio.removeEventListener('ended');
    global.audio = new Audio(this.listOfSongs[0].preview);
    global.audio.play();
    global.audio.addEventListener('ended', SongPlayer.instance.playNextSong);
  }
  playPastSong() {
    if (this.listOfPastSongs > 0) {
      const pastSong = this.listOfPastSongs.pop();
      this.listOfSongs.splice(0, 0, pastSong);
      this.playSong();
    }
  }
  pauseSong() {
    if (this.listOfSongs.length > 0) {
      global.audio.pause();
    }
  }
  /* eslint-disable */
  playNextSong() {
    if (SongPlayer.instance.listOfSongs.length > '1') {
      SongPlayer.instance.pauseSong();
      SongPlayer.instance.listOfPastSongs.push(SongPlayer.instance.listOfSongs[0]);
      SongPlayer.instance.deleteSong(0);
      SongPlayer.instance.playSong();
    } else {
      SongPlayer.instance.pauseSong();
    }
  }
  /* eslint-enable */
  restartSongOrPrevious() {
    if (global.audio.currentTime > 5) {
      global.audio.currentTime = 0;
    } else {
      this.pauseSong();
      this.playPastSong();
    }
  }
  getNumberOfItemsInListOfSongs() {
    return this.listOfSongs.length;
  }
}
