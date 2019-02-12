<template>
  <div class="cover-list">
    <h3>{{ title }}</h3>
    <ul class="better-scrollbar">
      <li v-for="(cover, i) in covers" :key="i">
        <cover
          :type="cover.type || type"
          :name="cover.name"
          :desc="cover.desc"
          :imageSrc="cover.imageSrc">
        </cover>
      </li>
    </ul>
  </div>
</template>

<script>
import Cover from '@/components/Cover';

export default {
  name: 'cover-list',
  components: {
    Cover
  },
  props: {
    title: String,
    type: String,
    covers: Array
  }
};
</script>

<style lang="scss">
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

  li {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 20%;

    &:not(:last-child) {
      margin-right: 32px;
    }
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
