# API doc

Document montrant les structures de données obtenues de l'API UBeat ainsi que les fonctions utilitaires (`helper` et `api`) existantes permettant de soutirer les informations nécessaires. 

## `api.js`

Dans `src/js/api.js`, on y trouve plusieurs fonctions exportées permettant d'aller chercher les informations nécessaires pour chaque page. Elles agissent en tant qu'abstraction de l'API, des routes existantes ainsi que du format des données retournées. On y trouve également des méthodes privées permettant de transformer les résultats reçus. 

### private `async getFromApi(url)`

Fait l'appel `axios`, handle les erreurs et retourne directement `response.data`.

### private `extractMultipleResults(data)`

L'API d'iTunes retourne toujours les données englobées de telle façon:

```json
{
  "results": [
    // data
  ]
}
```

Cette méthode permet de directement retourner la liste des objets reçus. 

### private `extractSingleResult(data)`

Puisque l'API d'iTunes retourne toujours les données englobées dans un objet et sous forme de liste, cette méthode permet de retirer le seul item qui se retrouve dans la liste. 

Si aucun item n'est présent dans la liste, la méthode retourne un objet vide `{}` au lieu de `undefined`.

### private `sortAlbumsDesc(albums)`

Permet de retourner la liste d'albums triés selon leur date de sortie (décroissant).

### private `filterPlaylistsByUser(playlists, userId)`

Puisque la seule requête GET possible pour les playlists retourne l'entièreté des playlists pour tous les utilisateurs, il est utile de pouvoir sélectionner seulement celles appartenant à un utilisateur en particulier.

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

### `async getUserInfos(userId)`

Retourne les informations d'un utilisateur.

Exemple de réponse:

```json
[
  {
    "id": "5c81361ad6f63a0004c26542",
    "name": "Team18",
    "email": "test@test.com",
    "following": [
      ...
    ]
  }
]
```

*Note: puisque les utilisateurs ne sont pas associés à iTunes, cette méthode ne fait pas appel à `extractSingleResult`. 

### `async getUserPlaylists(userId)`

Permet d'obtenir les playlists créée par un utilisateur. 

Exemple de réponse:

```json
[
  {
    "owner": {
      "name": "Team18",
      "email": "test@test.com",
      "id": "5be872a1e495370004798456"
    },
    "name": "Best 80 music",
    "id": "5be8f945e495370004799523",
    "tracks": [
      {
        //see tracks response
      },
      ...
    ]
  },
  ...
]
```

*Note: puisque les utilisateurs ne sont pas associés à iTunes, cette méthode ne fait pas appel à `extractMultipleResults`. 

### `async getAlbumInfos(albumId)`

Permet d'obtenir les information d'un album. 

Exemple de réponse:

```json
{
  "wrapperType": "collection",
  "collectionType": "Album",
  "artistId": 116851,
  "collectionId": 1125488753,
  "amgArtistId": 211247,
  "artistName": "Blink-182",
  "collectionName": "Enema of the State",
  "collectionCensoredName": "Enema of the State",
  "artistViewUrl": "https://itunes.apple.com/us/artist/blink-182/id116851?uo=4",
  "collectionViewUrl": "https://itunes.apple.com/us/album/enema-of-the-state/id325483?uo=4",
  "artworkUrl60": "http://a3.mzstatic.com/us/r30/Features/cb/72/0e/dj.aoonomrr.60x60-50.jpg",
  "artworkUrl100": "http://a2.mzstatic.com/us/r30/Features/cb/72/0e/dj.aoonomrr.100x100-75.jpg",
  "collectionPrice": 9.99,
  "collectionExplicitness": "explicit",
  "contentAdvisoryRating": "Explicit",
  "trackCount": 12,
  "copyright": "℗ 1999 Geffen Records",
  "country": "USA",
  "currency": "USD",
  "releaseDate": "1999-05-25T07:00:00Z",
  "primaryGenreName": "Alternative"
}
```

### `async getAlbumTracks(albumId)`

Permet d'obtenir les chansons d'un album. 

Example de réponse:

```json
[
  {
    "wrapperType": "track",
    "kind": "song",
    "artistId": 461932,
    "collectionId": 196480323,
    "trackId": 196480329,
    "artistName": "Europe",
    "collectionName": "The Final Countdown",
    "trackName": "The Final Countdown",
    "collectionCensoredName": "The Final Countdown",
    "trackCensoredName": "The Final Countdown",
    "artistViewUrl": "https://itunes.apple.com/us/artist/europe/id461932?uo=4",
    "collectionViewUrl": "https://itunes.apple.com/us/album/the-final-countdown/id196480323?i=196480329&uo=4",
    "trackViewUrl": "https://itunes.apple.com/us/album/the-final-countdown/id196480323?i=196480329&uo=4",
    "previewUrl": "http://a1815.phobos.apple.com/us/r1000/101/Music/70/f0/fd/mzm.hhpjhkpl.aac.p.m4a",
    "artworkUrl30": "http://a5.mzstatic.com/us/r30/Music/fc/4c/f5/mzi.jpmevzoi.30x30-50.jpg",
    "artworkUrl60": "http://a4.mzstatic.com/us/r30/Music/fc/4c/f5/mzi.jpmevzoi.60x60-50.jpg",
    "artworkUrl100": "http://a3.mzstatic.com/us/r30/Music/fc/4c/f5/mzi.jpmevzoi.100x100-75.jpg",
    "collectionPrice": 9.99,
    "trackPrice": 1.29,
    "releaseDate": "1988-09-16T07:00:00Z",
    "collectionExplicitness": "notExplicit",
    "trackExplicitness": "notExplicit",
    "discCount": 1,
    "discNumber": 1,
    "trackCount": 13,
    "trackNumber": 1,
    "trackTimeMillis": 310333,
    "country": "USA",
    "currency": "USD",
    "primaryGenreName": "Rock",
    "radioStationUrl": "https://itunes.apple.com/station/idra.196480329"
  }
]
```

### `async getPlaylistInfosAndTracks(playlistId)`

Permet d'obtenir les informations ET les chansons contenues dans une playliste.

Example de réponse:

```json
{
  "owner": {
    "name": "Team18",
    "email": "test@test.com",
    "id": "5be872a1e495370004798456"
  },
  "name": "Best 80 music",
  "id": "5be8f945e495370004799523",
  "tracks": [
    {
      //see tracks response
    },
    ...
  ]
}
```

*Note: puisque les utilisateurs ne sont pas associés à iTunes, cette méthode ne fait pas appel à `extractSingleResult`. 

## `helper.js`

### `getItunesLink(baseLink)`

Transforme le lien iTunes (`baseLink`) renvoyé par l'API (par exemple, le champs `artistViewUrl` pour un artiste) afin de le changer pour le site canadien (au lieu de US) et en ajoutant l'ouverture dans l'application Apple Music.

### `getImageUrlOfSize(url, size)`

Transforme le lien d'une image (`url`) iTunes retourné par l'API (par exemple, le champ `artworkUrl100` pour un artiste) afin d'obtenir une image de la taille `size` désirée (sera une image carrée de `size` par `size` pixels).

### `getPrettyDate(dateString)`

Permet de tranformer une date de format `String` (ex: `"2006-01-01T08:00:00Z"`) en date formatée (ex: `"August 28th, 2016"`). 

### `getPrettyDuration(timeInMillis)`

Permet de transformer un temps en milliseconde en une durée compréhensible de format `mm:ss` (ou `h:mm:ss`).

## Variables utiles

Voici les variables privées actuellement disponibles dans `api.js`:

* `API_URL` : Url de base pour communiquer avec l'API (version **unsecure** pour le moment)

## Routes existantes et format des données de l'API

Voir le [wiki](https://github.com/GLO3102/UBeat/wiki/2-API)
