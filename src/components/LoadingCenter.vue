<template>
  <div class="loading-center">
    <v-progress-circular
      indeterminate
      color="blue"
      :size="60"
      :width="6"
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: 'loading-center'
};
</script>

<style>
.loading-center {
  text-align: center;
}
</style>
