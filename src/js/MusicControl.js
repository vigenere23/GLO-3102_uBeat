import { bus } from '@/main'

export default class SongPlayer {
  constructor () {
    if (!SongPlayer.instance) {
      this.listOfSongs = []
      this.listOfPastSongs = []
      SongPlayer.instance = this
    }
    return SongPlayer.instance
  }

  addSong (song) {
    this.listOfSongs.push(song)
    this.setBottomBarVisibleOrNot()
    if (this.listOfSongs.length === 1) {
      this.playSong()
    }
  }

  deleteSong (songNumberInList) {
    this.listOfSongs.splice(songNumberInList, 1)
  }

  deleteElementsInArray () {
    this.listOfSongs = []
    this.listOfPastSongs = []
  }

  playSong () {
    global.audio = new Audio(this.listOfSongs[0].preview)
    global.audio.play()
    global.audio.addEventListener('ended', this.playNextSong)
    this.setBottomBarVisibleOrNot()
    bus.$emit('musicStarted')
    bus.$emit('changeTitleOfSongPlaying', this.listOfSongs[0].title)
  }

  playPastSong () {
    if (this.listOfPastSongs.length > 0) {
      const pastSong = this.listOfPastSongs.pop()
      this.listOfSongs.splice(0, 0, pastSong)
      this.playSong()
    }
  }

  pauseSong () {
    if (this.listOfSongs.length > 0) {
      global.audio.pause()
      bus.$emit('musicStopped')
    }
  }
  /* eslint-disable */
  playNextSong () {
    SongPlayer.instance.pauseSong()
    SongPlayer.instance.listOfPastSongs.push(SongPlayer.instance.listOfSongs[0])
    SongPlayer.instance.deleteSong(0)
    if (SongPlayer.instance.listOfSongs.length >= 1) {
      SongPlayer.instance.playSong()
    } else {
      bus.$emit('checkForRepeat')
      global.audio.currentTime = 0
      SongPlayer.instance.setBottomBarVisibleOrNot()
    }
  }
  /* eslint-enable */
  restartSongOrPrevious () {
    if (global.audio.currentTime > 5) {
      global.audio.currentTime = 0
    } else {
      this.pauseSong()
      this.playPastSong()
    }
  }

  getNumberOfItemsInListOfSongs () {
    return this.listOfSongs.length
  }

  setBottomBarVisibleOrNot () {
    if (this.listOfSongs.length > 0) {
      bus.$emit('showBottomBar')
    } else {
      bus.$emit('hideBottomBar')
    }
  }
  shuffle () {
    for (let i = this.listOfSongs.length - 1; i > 0; i -= 1) {
      const randomSongIndex = Math.floor(Math.random() * (i + 1))
      const songToShuffle = this.listOfSongs[i]
      this.listOfSongs[i] = this.listOfSongs[randomSongIndex]
      this.listOfSongs[randomSongIndex] = songToShuffle
    }
  }
}
