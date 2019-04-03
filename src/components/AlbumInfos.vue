<template>
  <v-card id="album-card" class="blue-grey darken-4">
    <img
      id="album-cover"
      :src="imageUrl || '/static/blank-album-400.png'"
    >

    <v-card-title primary-title>
      <div id="info-album">
        <h1>{{ title || 'Untitled' }}</h1>
        <router-link tag="a" :to="subtitleLink" class="h2">{{ subtitle }}</router-link>
        <h3 v-if="releaseDate">Release on {{ releaseDate }}</h3>
        <h4><span v-if="genre">{{ genre }} &bull; </span>{{ numberOfTracksText }}</h4>
        <h4>{{ advisory }}</h4>
        <v-btn v-if="deleteButton" flat icon color="white" @click="$emit('delete')">
          <v-icon>delete</v-icon>
        </v-btn>
        <a v-if="itunesLink" class="itunes-link" target="_blank" :href="itunesLink"></a>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
  export default {
    name: 'album-infos',
    props: {
      title: String,
      subtitle: String,
      subtitleLink: {
        type: String,
        default: ''
      },
      releaseDate: String,
      genre: String,
      tracks: Array,
      advisory: String,
      itunesLink: String,
      imageUrl: String,
      deleteButton: Boolean
    },
    computed: {
      numberOfTracks() {
        return this.tracks.length || 0;
      },
      numberOfTracksText() {
        const songText = this.numberOfTracks > 1 ? 'songs' : 'song';
        return `${this.numberOfTracks} ${songText}`;
      }
    }
  };
</script>
<style lang="scss">
  h1 {
    line-height: 1.1em;
    margin-bottom: 0.3em;
    font-weight: 500;
  }

  .h2 {
    font-size: 22px;
    color: white;
    font-weight: 400;
    margin-bottom: 0.2em;
  }

  h3, h4 {
    color: rgba(255, 255, 255, 0.7);
    font-weight: 500;
    line-height: 1.1em;
    margin-bottom: 0.3em;
  }

  #album-card {
    display: flex;
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;

    #album-cover {
      width: 40vw;
      max-width: 400px;
      max-height: 400px;
      height: 40vw;
    }

    #info-album {
      display: flex;
      flex-direction: column;
      color: white;
    }
  }

  @media (max-width: 600px) {
    #album-card {
      height: 95vw;
      max-height: 440px;
      min-height: 300px;
      padding: 0;
      margin-top: 20px;

      #album-cover {
        width: 90vw;
        height: 90vw;
        max-width: 400px;
        position: absolute;
        filter: blur(2px);
        opacity: 0.5;
        z-index: 1;
      }

      #info-album {
        z-index: 2;
      }
    }
  }
</style>
