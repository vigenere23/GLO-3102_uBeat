<template>
  <div class="artist-infos page" :style="artistImageStyle">
    <div class="centered-title">
      <h1 class="large-thin-title">{{ infos.artistName }}</h1>
      <h2 class="large-thin-subtitle">{{ infos.primaryGenreName }}</h2>
      <a class="itunes-link" target="_blank" :href="itunesLink"></a>
    </div>
  </div>
</template>

<script>
import formatter from '@/js/helpers/formatter';
import styles from '@/js/helpers/styles';

export default {
  name: 'artist-infos',
  props: {
    infos: Object,
    image: String
  },
  computed: {
    itunesLink() {
      return formatter.itunesLink(this.infos.artistLinkUrl);
    },
    artistImageStyle() {
      return styles.fadingBackgroundImageStyle(this.image);
    }
  }
};
</script>

<style lang="scss">
.artist-infos {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
