<template>
  <div class="cover-list">

    <h3 v-if="title">{{ title }}</h3>

    <ul class="better-scrollbar" :class="{ wrap }" v-if="type === 'year-album'">
      <li v-for="(cover, i) in covers" :key="i">
        <cover-list-album-year
          :name="cover.collectionName"
          :year="new Date(cover.releaseDate).getFullYear()"
          :advisory="cover.contentAdvisoryRating"
          :albumId="cover.collectionId"
          :image="cover.artworkUrl100"
        />
      </li>
    </ul>

    <ul class="better-scrollbar" :class="{ wrap }" v-else-if="type === 'playlist'">
      <li v-for="(cover, i) in covers" :key="i">
        <cover-list-item
          :name="cover.name"
          :link="`/playlists/${cover.id}`"
          image="/static/blank-album-200.png"
        />
      </li>
    </ul>

    <ul class="better-scrollbar" :class="{ wrap }" v-else>
      <li v-for="(cover, i) in covers" :key="i">
        <cover-list-item
          :name="cover.name"
          :desc="cover.desc"
          :link="cover.link"
          :image="cover.image"
        />
      </li>
    </ul>

  </div>
</template>

<script>
import CoverListItem from '@/components/CoverListItem';
import CoverListAlbumYear from '@/components/CoverListAlbumYear';

export default {
  name: 'CoverList',
  components: {
    CoverListItem,
    CoverListAlbumYear
  },
  props: {
    title: String,
    type: String,
    covers: {
      type: Array,
      required: true
    },
    wrap: Boolean
  }
};
</script>

<style lang="scss" scoped>
.cover-list {
  width: 100%;
  margin-top: 64px;

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
