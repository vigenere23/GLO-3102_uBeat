# API doc

Document montrant les structures de données obtenues de l'API UBeat ainsi que les fonctions utilitaires (`helpers`) existantes permettant de soutirer les informations nécessaires. 

## Fonctions utilitaires existantes (`helpers`)

Dans `src/js/helpers.js`, on y trouve plusieurs fonctions exportées permettant d'aller chercher les informations nécessaires pour chaque page. Elles agissent en tant qu'abstraction de l'API, des routes existantes ainsi que du format des données retournées.

### `async getArtistInfos(artistId)`

Retourne les informations de base sur l'artiste associé à l'id `artistId`.

Exemple de réponse:

```json
{
  "wrapperType": "artist",
  "artistType": "Artist",
  "artistName": "Tame Impala",
  "artistLinkUrl": "https://itunes.apple.com/us/artist/tame-impala/290242959?uo=4",
  "artistId": 290242959,
  "amgArtistId": 1111074,
  "primaryGenreName": "Alternative",
  "primaryGenreId": 20
}
```

### `async getAlbumsOfArtist(artistId)`

Retourne les albums de l'artiste associé à l'id `artistId`.

Exemple de réponse:

```json
[
  {
    "wrapperType": "collection",
    "collectionType": "Album",
    "artistId": 290242959,
    "collectionId": 989492285,
    "amgArtistId": 1111074,
    "artistName": "Tame Impala",
    "collectionName": "Currents",
    "collectionCensoredName": "Currents",
    "artistViewUrl": "https://itunes.apple.com/us/artist/tame-impala/290242959?uo=4",
    "collectionViewUrl": "https://itunes.apple.com/us/album/currents/989492285?uo=4",
    "artworkUrl60": "https://is4-ssl.mzstatic.com/image/thumb/Music5/v4/25/db/e9/25dbe9b7-b93f-ac57-e366-50f371fc7a5f/source/60x60bb.jpg",
    "artworkUrl100": "https://is4-ssl.mzstatic.com/image/thumb/Music5/v4/25/db/e9/25dbe9b7-b93f-ac57-e366-50f371fc7a5f/source/100x100bb.jpg",
    "collectionPrice": 5.99,
    "collectionExplicitness": "explicit",
    "contentAdvisoryRating": "Explicit",
    "trackCount": 13,
    "copyright": "℗ 2015 Modular Recordings under exclusive license to Universal Music Australia Pty Limited",
    "country": "USA",
    "currency": "USD",
    "releaseDate": "2015-07-17T07:00:00Z",
    "primaryGenreName": "Alternative"
  },
  ...
]
```

### `getItunesLink(baseLink)`

Transforme le lien iTunes (`baseLink`) renvoyé par l'API (par exemple, le champs `artistViewUrl` pour un artiste) afin de le changer pour le site canadien (au lieu de US) et en ajoutant l'ouverture dans l'application Apple Music.

### `getImageUrlOfSize(url, size)`

Transforme le lien d'une image (`url`) iTunes retourné par l'API (par exemple, le champ `artworkUrl100` pour un artiste) afin d'obtenir une image de la taille `size` désirée (sera une image carrée de `size` par `size` pixels).

## Ajouter des nouvelles fonctions

Voici un petit guide qui centre l'information pour vous aider à développer d'autres fonctions utiles!

### Méthodes et variables utiles

Si vous désirez ajouter des nouvelles fonctions, il existe déjà des méthodes permettant de vous simplifier la vie! (et fortement recommandé de les utiliser pour éviter des duplications!)

Voici les métodes et variables actuellement disponibles:

* API_URL (Dans le fichier `src/js/constants.js`) : Url de base pour communiquer avec l'API (version `unsecure` pour le moment)
* extractSingleResult(data) : Transforme les données reçues de l'API (`data`) en un simple objet comme résultat (sans le champ `results` ni la liste)
* extractMultipleResults(data) : Transforme les données reçues de l'API (`data`) en une liste simple de données comme résultat (sans le champ `results`)

### Routes existantes de l'API



### Format des données retournées par l'API

