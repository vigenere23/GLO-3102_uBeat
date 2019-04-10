# UBeat

Bienvenue au projet UBeat, la plateforme musicale moderne et efficace! 

## Installation

Pour démarrer le projet, voici quelques étapes à accomplir:

### Prérequis

1. Installer [Node](https://nodejs.org/)
2. Cloner le projet
3. Dans le dossier du projet, exécutez `npm install`

### Démarrage

Pour démarrer l'application, allez dans le dossier du projet, puis:

```bash
npm run start
```

Pour activer le "hot-reloading" :

```bash
npm run dev
```

## Spotify API

Afin de bénéficier de certaines fonctionnalités, assurez-vous d'initialiser le projet de Spotify API, défini en temps que submodule git. 
1. Dans le dossier du projet, exécuter `git submodule init` suivi de `git submodule update` **OU** cloner le projet à part. 
2. Pour démarrer localement le serveur d'acheminement de l'API Spotify, veuillez suivre [ces instructions](https://github.com/GLO3102-H19/spotifyAPI-team-18).


## Informations importantes

### Livrable 2

Voici quelques informations importante concernant le livrable 2 du projet :

1. Routes existantes:
   1. `/` : affiche quelques albums selon les genres.
   2. `/artist/:id` : affiche les informations de l'artiste à cet `id`.
   4. `/album/:id` : affiche les informations de l'album à cet `id`.
   6. `/users/:id/playlists` : 
   7. `/playlists/:id` : 
2. Boutons d'accès rapide (HELPER) dans la navigation :
   1. `Artist` : redirige vers la page `/artist/290242959` (Tame Impala) afin d'éviter d'avoir à connaître un id.
   2. `Album` : redirige vers la page `/album/` (Thank U, Next) afin d'éviter d'avoir à connaître un id.

### Livrable 3

### Membres de l'équipe

* Gabriel St-Pierre (GASTP33) (111 178 727)
* Eleftherios Balampanis (ELBAL13) (111 152 532)
* Olivier Gingras (OLGIN2) (111 181 997)
* Nicolas Fillion (NIFIL18) (111 183 659)
* Philippe Jones (PHJON5) (111 181 051)
* Maxime St-Pierre (MASTP18) (111 112 959)
