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

Voici les informations importantes pour le livrable 3 du projet :

Page d'authentification et page d'inscription:
  - `/login` : La page d'authentification, si un user n'a pas de cookie, il est redirigé sur cette page.
  - `/signup` : Si un user n'a pas déjà un compte, il peut en créer un. Une fois le compte créé, il est authentifié automatiquement.
  - `/logout` : Page pour que l'utilisateur courant puisse se déconnecter.
  - Pour créer un utilisateur ou se connecter à un autre compte, il faut d'abord se déconnecter avec `Logout`. 
    Ensuite, il suffit de cliquer sur `Login/Signup`.
  
Profil d'un utilisateur:
  - `/profile/:userId` : Affiche le profil de l'utilisateur avec ce `userId`.
  - `/profileID` : Affiche le user courant. On y retrouve son nom, son email, ses playlists et les personnes qu'il suit.
  - Pour voir le profil de l'utilisateur courant, il suffit de cliquer sur le bouton `profile`.
  
Barre de recherche:
  - METTRE URL ICIT
  - EXPLIQUER COMMENT S'Y RENDRE AVEC PITON

Première fonctionnalité avancée : 
  - METTRE URL ICIT
  - EXPLIQUER COMMENT S'Y RENDRE AVEC PITON

Deuxième fonctionnalité avancée : Ajout d'une barre pour jouer la musique
  - Lorsque le bouton pour jouer une chanson est actionné, une barre pour
  faire jouer la chanson apparait. Cette barre contient une option pour
  mettre la chanson qui joue actuellement en pause. Si une chanson est ajoutée
  dans la liste de chanson à jouer (icône à côté du bouton jouer dans la liste
  de chansons), il est possible de la jouer en appuyant sur le bouton "skip". Il
  est aussi possible de revenir en arrière. Pour voir cette liste, il suffit de cliquer
  sur le bouton à l'extrême droite de la barre. Finalement, s'il y a des chansons dans
  la liste de lectures, il est possible d'activer les boutons "shuffle" et "replay".


### Membres de l'équipe

* Gabriel St-Pierre (GASTP33) (111 178 727)
* Eleftherios Balampanis (ELBAL13) (111 152 532)
* Olivier Gingras (OLGIN2) (111 181 997)
* Nicolas Fillion (NIFIL18) (111 183 659)
* Philippe Jones (PHJON5) (111 181 051)
* Maxime St-Pierre (MASTP18) (111 112 959)
