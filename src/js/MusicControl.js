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
  }
  playSong() {
    global.audio = new Audio(this.listOfSongs[0].preview);
    global.audio.play();
  }
  playPastSong() {
    const pastSong = this.listOfPastSongs.pop();
    this.listOfSongs.splice(0, 0, pastSong);
    this.playSong();
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
  getNumberOfItemsInListOfSongs() {
    return this.listOfSongs.length;
  }
}
