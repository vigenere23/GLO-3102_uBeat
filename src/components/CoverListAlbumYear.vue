<template>
  <cover-list-item
    :name="name"
    :desc="year"
    :image="imageHd"
    :link="link"
  />
</template>

<script>
import helpers from '@/js/helpers';
import CoverListItem from '@/components/CoverListItem';

export default {
  name: 'CoverListAlbumYear',
  components: {
    CoverListItem
  },
  props: {
    name: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    albumId: {
      type: Number,
      required: true
    }
  },
  computed: {
    link() {
      return `/album/${this.albumId}`;
    },
    imageHd() {
      return helpers.getImageUrlOfSize(this.image, 200);
    }
  }
};
</script>
