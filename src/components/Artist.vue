<template>
  <div id="artist-page" class="blue-grey darken-4 full-height-page">
    <div class="centered-page">

      <div id="title">
        <h1 class="display-4">Tame Impala</h1>
        <h2 class="display-2">Psychedelic rock</h2>
        <a href="https://itunes.apple.com/ca/artist/tame-impala/290242959" target="_blank">iTunes</a>
      </div>

      <div class="songs">
        <ul>
          <li></li>
        </ul>
      </div>

      <div class="cover-list">
        <h3 class="display-1">Albums</h3>
        <ul>
          <li>
            <a href="javascript:">
              <img src="https://payload.cargocollective.com/1/4/158872/9666476/Tame-Impala-Currents-final-packshot-1200px_800.jpg">
              <p>Currents</p>
            </a>
          </li>
          <li>
            <a href="javascript:">
              <img src="https://static.stereogum.com/uploads/2014/08/Tame-Impala-Feels-Like-We-Only-Go-Backwards-compressed.jpeg">
              <p>Feels Like We Only Go Backwards</p>
            </a>
          </li>
          <li>
            <a href="javascript:">
              <img src="http://i.imgur.com/iV6N6xe.jpg">
              <p>Innerspeaker</p>
            </a>
          </li>
          <li>
            <a href="javascript:">
              <img src="https://i.pinimg.com/originals/52/fb/7e/52fb7e1accd57afc524a49c8a605f35b.jpg">
              <p>Ripples</p>
            </a>
          </li>
          <li>
            <a href="javascript:">
              <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/554fc131138747.5642c93bdd5da.jpg">
              <p>Elephant</p>
            </a>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<style>

  #artist-page {
    width: 100%;
    padding-top: 56px;
    color: white;
  }

  #artist-page #title {
    text-align: center;
    margin-bottom: 56px;
  }

  #artist-page #title h1 {
    margin-bottom: 0.1em;
  }

  #artist-page #title a {
    color: rgba(255, 255, 2555, 0.68);
    font-size: 16px;
    font-weight: 400;
    margin-top: 16px;
  }

  #artist-page .songs {
    list-style: none;
    padding: 0;
  }

  #artist-page .songs ul {
    list-style: none;
    padding: 0;
  }

  .cover-list {
    width: 100%;
    margin-top: 64px;
  }

  .cover-list h3 {
    margin-bottom: 16px;
  }

  .cover-list ul {
    display: flex;
    overflow: auto;
    padding: 0;
    list-style: none;
  }

  .cover-list li:not(:last-child) {
    padding-right: 32px;
  }

  .cover-list a {
    display: block;
    color: white;
    transition: all 200ms ease-in-out;
  }

  .cover-list a:hover {
    opacity: 0.6;
    transition: all 100ms ease-in-out;
  }

  .cover-list a:active {
    transform: scale(0.97);
    transition: all 100ms ease-in-out;
  }

  .cover-list a:focus {
    outline: none;
  }

  .cover-list p {
    margin-top: 8px;
    text-transform: capitalize;
    font-size: 16px;
    line-height: 1.25em;
  }

  .cover-list img {
    width: 200px;
    height: 200px;
  }

  @media screen and (max-width:640px) {
    
  }


</style>
<!--
TODO: Logo itunes?
TODO: Liste de singles
TODO: Playlists
TODO: Liste de chansons populaires
-->
