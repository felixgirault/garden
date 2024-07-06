---
title: Des applications connectées
date: 2011-08-08T20:48:24+00:00
---

Je vais sortir un peu du cadre du web pour vous présenter une idée qui me paraît intéressante, celle d'**une réelle connexion entre applications**.

De plus en plus, nos logiciels de bureau communiquent sur le net, peuvent envoyer ou récupérer des informations, s'intègrent de mieux en mieux aux systèmes d'exploitations. Ils ont largement étendu leur marge de manoeuvre, mais il reste un problème majeur : ils choisissent eux-même à qui parler.

## Un échange universel

Le coeur de l'idée, c'est de proposer une interface unique pour connecter nos logiciels entre eux. Une sorte de langage très simple qui leur permette de communiquer, le tout orchestré par l'utilisateur.

Les applications mettraient à disposition des messages et des actions claires et simples qu'il suffirait de relier (pour les connaisseurs, c'est le concept de [signaux/slots](http://fr.wikipedia.org/wiki/Signaux_et_slots) de [Qt](http://fr.wikipedia.org/wiki/Qt)).

Par exemple, je pourrais associer la fin des téléchargements de mon navigateur (le message) avec l'arrêt de mon système (l'action), ou encore lancer un logiciel de capture vidéo lorsque je lance un jeu, etc etc.

Un utilisateur lambda aurait à sa disposition un outil graphique facile à prendre en main, tandis qu'on pourrait prévoir un langage de script plus poussé pour l'utilisateur avancé.

## C'est tout pour aujourd'hui !

Et vous, que pensez-vous de cette idée ?