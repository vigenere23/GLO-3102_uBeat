<template>
  <div id="home-page" class="page">
    <div class="centered-page">

      <div class="centered-title">
        <h1 class="large-thin-title">Home</h1>
      </div>

      <cover-list
        v-for="(coverList, i) in coverLists"
        :key="i"
        :title="coverList.title"
        type="album"
        :covers="coverList.covers"
      />

    </div>
  </div>
</template>

<script>
import CoverList from '@/components/CoverList';
import homeAlbumLists from '@/js/homeAlbumLists';
import ubeat from '@/js/apis/ubeat';

export default {
  name: 'home',
  components: {
    CoverList
  },
  data() {
    return {
      coverLists: []
    };
  },
  mounted() {
    if (!this.coverLists.length) {
      homeAlbumLists.forEach((albumList) => {
        const coverList = {};
        coverList.title = albumList.title;
        coverList.covers = [];
        albumList.ids.forEach(async (id) => {
          coverList.covers.push(await ubeat.getAlbumInfos(id));
        });
        this.coverLists.push(coverList);
      });
    }
  }
};
</script>
