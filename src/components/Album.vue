<template>
    <div id="album">
      <v-app class="blue-grey darken-4 full-height-page">
        <v-card id="albumCard" class="blue-grey darken-4 full-height-page">
          <v-img
            src="https://is5-ssl.mzstatic.com/image/thumb/Music124/v4/4e/26/d5/4e26d5f3-2d62-1b5c-689a-e8de4e6f3797/00602577465284.rgb.jpg/400x400bb.jpeg"
            id="albumCover"
          ></v-img>
          <v-card-title primary-title>
            <div id="infoAlbum">
              <h1>
                Thank You, Next
              </h1>
              <h2>
                Ariana Grande
              </h2>
              <h3>
                Release date: February 10<span class="exposant">th</span>, 2019
              </h3>
              <h4>
                Pop &bull; 12 songs
              </h4>
              <v-card-actions id="AppleMusicLink">
                <a href="https://geo.itunes.apple.com/us/album/thank-u-next/1450330588?mt=1&app=music" style="display:inline-block;overflow:hidden;background:url(https://linkmaker.itunes.apple.com/en-us/badge-lrg.svg?releaseDate=2019-02-08&kind=album&bubble=apple_music) no-repeat;width:158px;height:45px;"></a>
              </v-card-actions>
            </div>
            </v-card-title>
        </v-card>
        <v-list two-line subheader class="blue-grey darken-3 full-height-page">
          <v-subheader inset id="listeTitle">Songs</v-subheader>
          <v-list-tile
            v-for="item in items"
            :key="item.number"
            id="linesBetweenSongs"
          >

            <v-list-tile-avatar id="songsNumber">
              <v-list-tile-title>{{item.number}}</v-list-tile-title>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title id="songsTitle">{{item.title}}</v-list-tile-title>
              <v-list-tile-sub-title id="songsLenght">{{item.time}}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="white">play_arrow</v-icon>
              </v-btn>
            </v-list-tile-action>

          </v-list-tile>
        </v-list>
      </v-app>

    </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          { number: '1', title: 'Imagine', time: '3:32' },
          { number: '2', title: 'Needy', time: '2:51' },
          { number: '3', title: 'NASA', time: '2:52' },
          { number: '4', title: 'Bloodline', time: '3:35' },
          { number: '5', title: 'Fake smile', time: '3:28' },
          { number: '6', title: 'Bad idea', time: '4:26' },
          { number: '7', title: 'Make up', time: '2:20' },
          { number: '8', title: 'Ghostin', time: '4:30' },
          { number: '9', title: 'In my head', time: '3:42' },
          { number: '10', title: '7 rings', time: '2:59' },
          { number: '11', title: 'Thank u, next', time: '3:27' },
          { number: '12', title: 'Break up with your girlfriend, i\'m bored', time: '3:09' },
        ]
      };
    }
  };

</script>

<style>

  #albumCover{
    width: 40%;
    max-width: 400px;
  }
  #albumCard{
    display: flex;
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-left: 20px;
    margin-right: 20px;
  }
  .exposant{
    position: relative;
    bottom: 1px;
    font-size: .8em;
    line-height: .8em;
    vertical-align:super;
    text-decoration:none;
  }
  #AppleMusicLink{
    margin-top: 30px;
  }
  #infoAlbum{
    display: flex;
    flex-direction: column;
    color: white;

  }
  #songsNumber, #songsTitle, #songsLenght{
    color: white;
  }

  #listeTitle{
    color: white;
    font-size: 20px;
  }

  #linesBetweenSongs{
    border-top: solid white 1px;
  }

  @media (max-width: 600px){
    #albumCover{
      width: 90vw;
      max-width: 400px;
      position: absolute;
      filter: blur(2px);
      opacity: 0.5;
      z-index: 1;
    }
    #infoAlbum{
      z-index: 2;
    }
    #albumCard{
      height: 100vw;
      max-height: 440px;
      min-height: 300px;
    }
  }

</style>
