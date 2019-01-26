<link rel="stylesheet" type="text/css" href="../css/style.css"/>
<template>
  <div id="navigationContainer">
    <div id="mobileToolbarContainer" class="hidden-lg-and-up">
      <mobileToolbar/>
    </div>
    <div id="desktopToolbarContainer" class="hidden-md-and-down">
      <desktopToolbar/>
    </div>
  </div>
</template>

<script>
  import DesktopToolbar from './DesktopToolbar';
  import MobileToolbar from './MobileToolbar';

  export default {
    components: { MobileToolbar, DesktopToolbar }
  };
</script>

