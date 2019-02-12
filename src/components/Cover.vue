<template>
  <a class="cover" href="javascript:">
    <img src="{{ imageSrc }}">
    <p class="name">{{ name }}</p>
    <p class="year">{{ year }}</p>
  </a>
</template>

<script>
export default {
  name: "cover",
  porps: {
    type: String,
    name: String,
    year: Number,
    imageSrc: String
  }
}
</script>

<style lang="sass">
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

    &.year {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.5);
    }
  }

  img {
    display: block;
    width: 100%;
  }
}

@media screen and (max-width: 1263px) {
  .cover {

    p.name {
      font-size: 15px;
    }

    p.year {
      font-size: 14px;
    }
  }
}

@media screen and (max-width: 600px) {
  .cover {

    p.name {
      font-size: 14px;
    }

    p.year {
      font-size: 13px;
    }
  }
}
</style>
