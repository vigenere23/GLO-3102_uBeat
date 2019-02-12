<template>
  <div id="home-page">
    <div class="centered-page">

      <h1>Home</h1>
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
import HomeAlbumList from '@/js/HomeAlbumList';

export default {
  name: 'home',
  components: {
    CoverList
  },
  data() {
    return {
      coverLists: HomeAlbumList
    };
  }
};
</script>
