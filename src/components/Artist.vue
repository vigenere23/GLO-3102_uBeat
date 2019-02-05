<template>

    <div> <!-- Le "root" element-->
      <div id="title">
        <h1 id="name">Tame Impala</h1>
        <h2 id="genre">Psychedelic rock</h2>
        <h3 id="itunes-link">Insert Itune link here</h3>
      </div>

        <div id="album-list">
          <img class="album" src="https://payload.cargocollective.com/1/4/158872/9666476/Tame-Impala-Currents-final-packshot-1200px_800.jpg">
          <img class="album" src="https://static.stereogum.com/uploads/2014/08/Tame-Impala-Feels-Like-We-Only-Go-Backwards-compressed.jpeg">
          <img class="album" src="http://i.imgur.com/iV6N6xe.jpg">
          <img class="album" src="https://i.pinimg.com/originals/52/fb/7e/52fb7e1accd57afc524a49c8a605f35b.jpg">
          <img class="album" src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/554fc131138747.5642c93bdd5da.jpg">
        </div>
    </div>

</template>

<style>
  #title {
    text-align: center;
  }

  #name {
  font-size: 5em;
  }

  #genre {
  font-size: 2em;
  }

  #itunes-link {
  font-size: 1.5em;
  }

  .album {
    width: 300px;
    height: 300px;
    padding: 5px;
  }

  #album-list {
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
  }

    @media screen and (max-width:640px) {
      #name {
        line-height: 1.5em;
        font-size: 2.5em;
      }

      #genre {
      font-size: 1.5em;
      }

      #itunes-link {
        font-size: 1em;
      }

      .album {
        width: 200px;
        height: 200px;
        padding: 2px;
      }
  }


</style>
<!--
TODO: Lien vers page Itune avec logo (avec logo?)
TODO: Mettre un petit titre écrit "Album" avant les images des albums et séparé les albums plus du reste
TODO: Responsiveness (PC, Cell, Tablet):
  TODO: Redefine font size
  TODO: Resize covers to be more clearly visible
-->
