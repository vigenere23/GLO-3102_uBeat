import { bus } from '@/main';

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
    this.setBottomBarVisibleOrNot();
  }

  deleteSong(songNumberInList) {
    this.listOfSongs.splice(songNumberInList, 1);
  }

  deleteElementsInArray() {
    this.listOfSongs = [];
    this.listOfPastSongs = [];
  }

  playSong() {
    global.audio = new Audio(this.listOfSongs[0].preview);
    global.audio.play();
    global.audio.addEventListener('ended', SongPlayer.instance.playNextSong);
    this.setBottomBarVisibleOrNot();
    bus.$emit('musicStarted');
    bus.$emit('changeTitleOfSongPlaying', this.listOfSongs[0].title);
  }

  playPastSong() {
    if (this.listOfPastSongs.length > 0) {
      const pastSong = this.listOfPastSongs.pop();
      this.listOfSongs.splice(0, 0, pastSong);
      this.playSong();
    }
  }

  pauseSong() {
    if (this.listOfSongs.length > 0) {
      global.audio.pause();
      bus.$emit('musicStopped');
    }
  }

  static playNextSong() {
    if (SongPlayer.instance.listOfSongs.length > '1') {
      SongPlayer.instance.pauseSong();
      SongPlayer.instance.listOfPastSongs.push(SongPlayer.instance.listOfSongs[0]);
      SongPlayer.instance.deleteSong(0);
      SongPlayer.instance.playSong();
    } else {
      SongPlayer.instance.pauseSong();
      SongPlayer.instance.listOfPastSongs.push(SongPlayer.instance.listOfSongs[0]);
      SongPlayer.instance.deleteSong(0);
      SongPlayer.instance.setBottomBarVisibleOrNot();
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

  setBottomBarVisibleOrNot() {
    if (this.listOfSongs.length > 0) {
      bus.$emit('showBottomBar');
    } else {
      bus.$emit('hideBottomBar');
    }
  }

}
