<template>
  <router-link class="cover" :to="link || ''" tag="a">
    <v-img :src="image || '/static/blank-album-200.png'"></v-img>
    <p class="name">{{ name || "untitled" }}</p>
    <p class="desc" v-if="desc">{{ desc }}</p>
  </router-link>
</template>

<script>
export default {
  name: 'CoverListItem',
  props: {
    name: {
      type: String,
      required: true
    },
    desc: [String, Number],
    image: String,
    link: String
  }
};
</script>

<style lang="scss" scoped>
.cover {
  display: block;
  color: white;
  transition: all 200ms ease-in-out;

  &:hover {
    opacity: 0.6;
    transition: all 100ms ease-in-out;
  }

  &:active {
    transform: scale(0.97);
    transition: all 100ms ease-in-out;
  }

  &:focus {
    outline: none;
  }

  p {
    margin: 0;
    font-weight: 500;

    &.name {
      margin-top: 8px;
      text-transform: capitalize;
      font-size: 16px;
      line-height: 1.25em;
    }

    &.desc {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.5);
    }
  }

  .cover-image {
    display: block;
    width: 100%;
  }
}

@media screen and (max-width: 1263px) {
  .cover {
    padding: 8px 0;

    p.name {
      font-size: 15px;
    }

    p.desc {
      font-size: 14px;
    }
  }
}

@media screen and (max-width: 600px) {
  .cover {

    p.name {
      font-size: 14px;
    }

    p.desc {
      font-size: 13px;
    }
  }
}
</style>
