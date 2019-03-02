<template>
  <div id="playlist-page" class="page blue-grey darken-4">
    <div class="centered-page">

      <div class="centered-title">
        <h1 class="large-thin-title">Playlists</h1>
        <h2 class="large-thin-subtitle">for {{username}}</h2>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'playlists',
  data() {
    return {
      username: 'smithj235'
    };
  }
};
</script>
