<template>
  <div :v-if="result.wrapperType === 'artist'" id="artist-result">
    <ResultArtist :artist="result"></ResultArtist>
  </div>
</template>

<script>
  import ResultArtist from './ResultArtist';

  export default {
    components: { ResultArtist },
    name: 'Result',
    props: {
      result: {}
    }
  };
</script>
