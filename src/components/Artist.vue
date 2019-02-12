<template>
  <div id='artist-page' class='blue-grey darken-4'>
    <div class="centered-page">

      <div id="title">
        <h1>Tame Impala</h1>
        <h2>Psychedelic rock</h2>
        <a target="_blank" href="https://geo.itunes.apple.com/ca/artist/tame-impala/290242959?mt=1&app=music' style='display:inline-block;overflow:hidden;background:url(https://linkmaker.itunes.apple.com/en-us/badge-lrg.svg?releaseDate=&kind=artist&bubble=apple_music) no-repeat;width:158px;height:45px;"></a>
      </div>

      <cover-list
        v-for="(coverList, i) in coverLists"
        :key="i"
        :title="coverList.title"
        :type="coverList.type"
        :covers="coverList.covers"
      />
      
    </div>
  </div>
</template>

<script>
import CoverList from '@/components/CoverList';
import ArtistAlbumList from '@/js/ArtistAlbumList';

export default {
  name: 'artist',
  components: {
    CoverList
  },
  data() {
    return {
      coverLists: ArtistAlbumList
    };
  }
};
</script>