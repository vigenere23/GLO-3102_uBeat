<template>
  <router-link class="cover" :to="link || ''" tag="a">
    <div class="cover-image" :style="backgroundImage"></div>
    <p class="name">{{ nameWithAdvisory || "untitled" }}</p>
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
    advisory: String,
    desc: [String, Number],
    image: String,
    link: String
  },
  computed: {
    nameWithAdvisory() {
      return this.advisory ? `${this.name} [${this.advisory}]` : this.name;
    },
    imageOrDefault() {
      return this.image || '/static/blank-album-200.png';
    },
    backgroundImage() {
      return `background-image: url('${this.imageOrDefault}');`;
    }
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
    padding-bottom: 100%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
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
