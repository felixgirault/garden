---
title: Récupérer une page web en PHP
date: 2012-08-01T20:23:03+00:00
---

Il est souvent utile de récupérer une page web en PHP, par exemple lors d'un appel à une API.

Le moyen le plus répandu de le faire est d'utiliser la librairie CURL, mais même pour une simple requête GET, elle doit être initialisée et configurée.

Voici ce que l'on pourrait faire pour récupérer une page :

```php
// initialisation
$resource = curl_init( );

// configuration
curl_setopt( $resource, CURLOPT_URL, 'http://www.toto.fr/page' );
curl_setopt( $resource, CURLOPT_RETURNTRANSFER, true );

// récupération du fichier
$page = curl_exec( $resource );

// libération de la ressource
curl_close( $resource );
```

Un peu lourd, non ?

Heureusement pour nous, PHP propose nativement une autre fonctionnalité encore peu connue : [les flux](http://fr.php.net/manual/fr/intro.stream.php "Introduction aux flux PHP").

Les flux ont été conçus pour faciliter la lecture et l'écriture de données sur différents supports. Peu importe le type de données ou le support d'enregistrement (requête HTTP, fichier compressé, flux audio [et autres](http://fr.php.net/manual/fr/wrappers.php "Les différents flux PHP")), on utilise la même méthode.

Je ne vais pas m'étendre sur les flux, mais le principe de base est de proposer l'accès à une ressource par une url spécifique. On peut accéder à un fichier par _file:///chemin/du/fichier_, à une page web par _http://www.toto.fr/page_, ou encore aux données de formulaires par _php://input_.

Mais rappelez-vous, ce qui nous intéresse ici, c'est toujours de récupérer une page web !

Voici comment le faire en toute simplicité avec les flux :

```php
// récupération du fichier
$page = file_get_contents( 'http://www.toto.fr/page' );
```

On agit tout simplement comme si on lisait un fichier. Toute la gestion bas-niveau du protocole HTTP est transparente, on s'en sort donc en une ligne, contre cinq avec CURL !

De plus, on gagne beaucoup en lisibilité. La ligne de code au-dessus peut se lire : « ma page, c'est le contenu du fichier situé sur _http://www.toto.fr/page_ ».

Ce sera tout pour aujourd'hui !