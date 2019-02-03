<template>
    <div class="background">
        <h1>Home</h1>
        <div class="centerVertical">
            <div class="centerHorizontal bigger">
              <div> <big> Welcome to the best page in the world </big> </div>
              <div> Find your artist</div>
              <div> And listen to his best album !</div>
              <div> <a href="Navigation.vue"> Click here </a> to start your journey </div>
            </div>
        </div>
    </div>
</template>

<style>

  .bigger{
    font-size: xx-large;
  }

  .background{
    background-color: red;
  }

  .centerHorizontal{
      height: 100px;
    position: absolute;
    margin:auto;
    bottom:0;
    top:0;

  }

  .centerVertical{
    display: flex;
    justify-content: center;
  }
</style>

<!--homePageTest-->
