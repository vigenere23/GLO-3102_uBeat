<template>
  <div id="home-page">
    <div class="centered-page">

      <h1>Home</h1>
      <cover-list
        v-for="(coverList, i) in coverLists"
        :key="i"
        :title="coverList.title"
        :type="coverList.type"
        :covers="coverList.covers">
      </cover-list>

    </div>
  </div>
</template>

<script>
import CoverList from '@/components/CoverList';

export default {
  name: 'home',
  components: {
    CoverList
  },
  data() {
    return {
      coverLists: [
        {
          title: 'Psychedelic rock',
          type: 'album',
          covers: [
            {
              name: 'Currents',
              desc: 'The Black Keys',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Tame_Impala_-_Currents.png'
            },
            {
              name: 'The Sciences',
              desc: 'Sleep',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/4/42/Ta13oo_by_Denzel_Curry.jpg'
            },
            {
              name: 'Kids See Ghosts',
              desc: 'Kids See Ghosts',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/1/18/Kids_See_Ghost_Cover.jpg'
            },
            {
              name: 'Little Dark Age',
              desc: 'MGMT',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/7/7f/MGMT_little_dark_age.jpg'
            },
            {
              name: 'Prequelle',
              desc: 'Ghost',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/5/55/Ghost_-_Prequelle_%28album%29.jpg'
            },
            {
              name: 'Whish You Were Here',
              desc: 'Pink Floyd',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Pink_Floyd%2C_Wish_You_Were_Here_%281975%29.png'
            },
            {
              name: 'Abby Road',
              desc: 'The Beatles',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg'
            },
            {
              name: 'Close to The Edge',
              desc: 'Yes',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/0/09/Yes-close.jpg'
            }
          ]
        },
        {
          title: 'Electronic',
          type: 'album',
          covers: [
            {
              name: 'Automatic',
              desc: 'Kaskade',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/1/10/Kaskade_-_Automatic.jpg'
            },
            {
              name: 'Mau5ville : Level 3',
              desc: 'Deadmau5',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/b/b0/Deadmau5_-_Mau5ville_Level_3.jpg'
            },
            {
              name: 'Recess',
              desc: 'Skrillex',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/5/52/RecessSkrillex.jpg'
            },
            {
              name: '3-D The Catalogue',
              desc: 'Kraftwerk',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/f/f3/Kraftwerk_-_3-D_The_Catalogue.png'
            },
            {
              name: 'Joytime II',
              desc: 'Marshmello',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/0/0a/Marshmello_Joytime_II.jpg'
            },
            {
              name: 'Sick Boy',
              desc: 'The Chainsmokers',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/d/d7/The_Chainsmokers_%E2%80%93_Sick_Boy_album.png'
            },
            {
              name: '7',
              desc: 'David Guetta',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/6/66/David_Guetta_-_7_%28album_cover%29.jpg'
            },
            {
              name: 'Encore',
              desc: 'DJ Snake',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/6/63/Encore_album_cover.jpeg'
            },
            {
              name: 'Clublife, Vol. 5 - China',
              desc: 'Tiësto',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/f/fc/Clublife_Vol_5_China_Album_Cover.jpg'
            }
          ]
        },
        {
          title: 'Rap',
          type: 'album',
          covers: [
            {
              name: 'Invasion of Privacy',
              desc: 'Cardi B',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/9/97/Cardi_B_-_Invasion_of_Privacy.png'
            },
            {
              name: 'Kamikaze',
              desc: 'Eminem',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/6/62/Eminem_-_Kamikaze.jpg'
            },
            {
              name: 'Black Panther',
              desc: 'Kendrik Lamare',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/6/65/Black_Panther_-_The_Album.png'
            },
            {
              name: 'The Saga Continues',
              desc: 'Wu Tang',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/f/f8/Wu-Tang_The_Saga_Continues.jpg'
            },
            {
              name: 'Animal Ambition',
              desc: '50 Cent',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/b/b1/50-cent-animal-ambition.jpg'
            },
            {
              name: 'Hndrxx',
              desc: 'Future',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/8/83/HNDRXX_cover.jpg'
            },
            {
              name: 'Dying to Live',
              desc: 'Kodak Black',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/6/67/Kodak_Black_%E2%80%93_Dying_to_Live.png'
            },
            {
              name: 'Double or Nothing',
              desc: 'Big Sean & Metro Boomin',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/6/65/Big_Sean_and_Metro_Boomin_%E2%80%93_Double_or_Nothing.png'
            },
            {
              name: 'The Carter V',
              desc: 'Lil Wayne',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/0/00/Carterfive.jpeg'
            }
          ]
        },
        {
          title: 'Pop',
          type: 'album',
          covers: [
            {
              name: 'Thank U, Next',
              desc: 'Ariana Grande',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/d/dd/Thank_U%2C_Next_album_cover.png'
            },
            {
              name: 'Red Pill Blues',
              desc: 'Maroon 5',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/4/49/Red_Pill_Blues_cover.png'
            },
            {
              name: 'Phoenix',
              desc: 'Rita Ora',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/a/a8/Rita_Ora_Phoenix_cover.png'
            },
            {
              name: '÷',
              desc: 'Ed Sheeran',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/4/45/Divide_cover.png'
            },
            {
              name: 'Dua Lipa',
              desc: 'Dua Lipa',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/2/20/Dua_Lipa_%28album%29.pn'
            },
            {
              name: 'A Star Is Born',
              desc: 'Lady Gaga & Bradley Cooper',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/e/e0/A_Star_Is_Born_%282018_soundtrack%29.png'
            },
            {
              name: 'Evolve',
              desc: 'Imagine Dragons',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/b/b5/ImagineDragonsEvolve.jpg'
            },
            {
              name: '25',
              desc: 'Adele',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/9/96/Adele_-_25_%28Official_Album_Cover%29.png'
            },
            {
              name: 'Witness',
              desc: 'Katy Perry',
              imageSrc: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Katy_Perry_-_Witness_%28Official_Album_Cover%29.png'
            }
          ]
        }
      ]
    };
  }
};
</script>
