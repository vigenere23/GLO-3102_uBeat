<template>
  <cover-list-item
    :name="nameWithAdvisory"
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
    advisory: String,
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
    nameWithAdvisory() {
      return this.advisory ? `${this.name} [${this.advisory}]` : this.name;
    },
    link() {
      return `/album/${this.albumId}`;
    },
    imageHd() {
      return helpers.getImageUrlOfSize(this.image, 200);
    }
  }
};
</script>
