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
  - La barre de recherche est présente en permanence en haut de l'application web. Pour l'utiliser, l'utilisateur n'a qu'à écrire ce qu'il recherche dans la section réservée à cet effet. L'utilisateur peut alors choisir entre une recherche globale ou une recherche spécifique (artistes, albums, chansons, utilisateurs). La recherche globale mène à une page de résultats globale, où les résultats sont groupés par type. Au niveau de cette même page, un bouton est présent à côté des résultats d'albums et de chansons pour les ajouter à une liste de lecture et un bouton est présent à côté des résultats d'utilisateurs pour commencer à en suivre. En cliquant sur un résultat, l'utilisateur est alors redirigé à la page en question. Lorsqu'un utilisateur effectue une recherche spécifique, il arrive sur une page de résultats spécifiques, où une étiquette indique le type des résultats. Notamment, les couvertures des albums sont affichées lors d'une recherche spécifique au niveau des albums. 

Première fonctionnalité avancée : Afficher une image pour l’artiste/groupe et obtenir des suggestions d’artistes similaires à un artiste 
  - Lorsque l'on accède à une page d'artiste, que ce soit avec le bouton d'accès rapide `Artist` présent au niveau du HELPER ou bien en passant par la barre de recherche de la façon présentée plus haut, il est possible d'accéder à une page d'un artiste quelconque. IMPORTANT! Pour que cette fonctionnalité soit fonctionnelle, il est nécessaire de suivre les étapes présentées plus haut au niveau du démarrage du serveur accédant à l'API de Spotify. À ce niveau, nous pouvons voir en arrière-plan une image pour l'artiste/groupe. Cette fonctionnalité ne constituant pas une fonctionnalité complète en elle-même, un un autre ajout a été implémenté. En effet, il est possible, toujours sur la même page, de voir des suggestions d'artistes similaires et d'y être redirigé à la guise de l'utilisateur.  

Deuxième fonctionnalité avancée (complexité acceptée par les professeurs) : Ajout d'une barre pour jouer la musique
  - Lorsque le bouton pour jouer une chanson est actionné, une nouvelle barre de navigation apparait au bas de la page(elle persiste même si l'utilisateur change de page). Cette barre contient une option pour mettre la chanson qui joue actuellement en pause. Une chanson peut être ajoutée dans la liste de chanson à jouer (icône à côté du bouton jouer dans la liste de chansons). Il est aussi possible de naviguer dans les chansons suivantes et précédentes avec les boutons "next" et "previous". Pour voir cette liste, il suffit de cliquer sur le bouton à l'extrême droite de la barre; il est alors possible de jouer la chanson qui convient le mieux. Finalement, s'il y plusieurs chansons dans la liste, il est possible d'activer les boutons "shuffle" et "replay". 


### Membres de l'équipe

* Gabriel St-Pierre (GASTP33) (111 178 727)
* Eleftherios Balampanis (ELBAL13) (111 152 532)
* Olivier Gingras (OLGIN2) (111 181 997)
* Nicolas Fillion (NIFIL18) (111 183 659)
* Philippe Jones (PHJON5) (111 181 051)
* Maxime St-Pierre (MASTP18) (111 112 959)
