<template>
  <div class="cover-list">

    <h3 v-if="title">{{ title }}</h3>

    <ul v-if="type === 'year-album'" class="better-scrollbar" :class="{ wrap }">
      <li v-for="(cover, i) in covers" :key="i">
        <cover-list-item
          :name="cover.collectionName"
          :advisory="cover.contentAdvisoryRating"
          :desc="new Date(cover.releaseDate).getFullYear()"
          :link="`/album/${cover.collectionId}`"
          :image="imageHd(cover.artworkUrl100)"
        />
      </li>
    </ul>

    <ul v-else-if="type === 'playlist'" class="better-scrollbar" :class="{ wrap }">
      <li v-for="(cover, i) in covers" :key="i">
        <cover-list-item
          :name="cover.name"
          :link="`/playlists/${cover.id}`"
          image="/static/blank-album-200.png"
        />
      </li>
    </ul>

    <ul v-else-if="type === 'album'" class="better-scrollbar" :class="{ wrap }">
      <li v-for="(cover, i) in covers" :key="i">
        <cover-list-item
          :name="cover.collectionName"
          :advisory="cover.contentAdvisoryRating"
          :desc="cover.artistName"
          :link="`/album/${cover.collectionId}`"
          :image="imageHd(cover.artworkUrl100)"
        />
      </li>
    </ul>

    <ul v-else-if="type === 'artist'" class="better-scrollbar" :class="{ wrap }">
      <li v-for="(cover, i) in covers" :key="i">
        <cover-list-item
          :name="cover.name"
          :link="`/artist/${cover.artistId}`"
          :image="cover.images[0].url"
        />
      </li>
    </ul>

  </div>
</template>

<script>
import CoverListItem from '@/components/CoverListItem';
import formatter from '@/js/helpers/formatter';

export default {
  name: 'CoverList',
  components: {
    CoverListItem
  },
  props: {
    title: String,
    type: String,
    covers: {
      type: Array,
      required: true
    },
    wrap: Boolean
  },
  methods: {
    imageHd(image) {
      return formatter.imageUrlOfSize(image, 200);
    }
  }
};
</script>

<style lang="scss" scoped>
.cover-list {
  width: 100%;
  margin-bottom: 64px;

  h3 {
    margin-bottom: 16px;
    font-size: 34px;
    font-weight: 400;
    line-height: 1.2em;
    color: white;
  }

  ul {
    display: flex;
    overflow-x: auto;
    padding: 8px 0;
    list-style: none;
  }

  ul.wrap {
    flex-wrap: wrap;
    justify-content: center;
  }

  li {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 20%;
    margin-right: 32px;
  }
}

@media screen and (max-width: 1263px) {
  .cover-list {
    margin-top: 38px;
  
    h3 {
      font-size: 28px;
    }

    li {
      flex-basis: 28%;
    }
  }
}

@media screen and (max-width: 600px) {
  .cover-list {
    margin-top: 32px;
  
    h3 {
      font-size: 24px;
    }

    li {
      flex-basis: 50%;
    }
  }
}
</style>
