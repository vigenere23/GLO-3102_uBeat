<template>
  <v-card id="album-card" class="blue-grey darken-4">
    <v-img
      id="album-cover"
      :src="imageUrl"
    >
    </v-img>
    <v-card-title primary-title>
      <div id="info-album">
        <h1>{{ title }}</h1>
        <h2>{{ subtitle }}</h2>
        <h3 v-if="releaseDate">Release on {{ releaseDate }}</h3>
        <h4><span v-if="genre">{{ genre }} &bull; </span>{{ numberOfTracksText }}</h4>
        <h4>{{ advisory }}</h4>
        <a class="itunes-link" target="_blank" :href="itunesLink"></a>
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
    releaseDate: String,
    genre: String,
    numberOfTracks: Number,
    advisory: String,
    itunesLink: String,
    imageUrl: String
  },
  computed: {
    numberOfTracksText() {
      const songText = this.numberOfTracks > 1 ? 'songs' : 'song';
      return `${this.numberOfTracks} ${songText}`;
    }
  }
};
</script>
