---
title: Différencier les commentaires WordPress
date: 2010-08-12T20:35:10+00:00
---

Voici le problème... On voit souvent sur des blogs que les commentaires des auteurs sont différenciés des autres. J'ai mis en place cette solution sur ce blog, mais jusqu'ici avec un système en Php qui comparait l'auteur de l'article avec celui du commentaire. Vous me direz c'est la solution la plus évidente, mais cela rajoute encore quelques lignes de code à celles du thème, qui deviennent déjà vite compliquées :-?. Je vais vous présenter ici une fonction WordPress très utile que je viens juste de découvrir : comment\_class( ). On l'utilise pour ajouter des attributs "class" aux commentaires afin de pouvoir les styler facilement avec Css. En gros, cette fonction fais le sale boulot pour vous :D. De base, voici ce qu'elle propose :

*   Pour les commentaires normaux, elle ajoute la classe "comment". Pour tous les autres, la valeur de comment\_type.
*   Si le commentaire vient d'un membre, elle ajoute la classe "byuser" et "comment-author-nomdelauteur", où "nomdelauteur" est... le nom de l'auteur 8). **Si l'auteur est celui de l'article, la classe "bypostauthor" est ajoutée.**
*   Et bien d'autres choses comme des classes pour les commentaires pairs et impairs, les réponses etc.

Pour une explication plus précise, filez voir [http://codex.wordpress.org/Template\_Tags/comment\_class](http://codex.wordpress.org/Template_Tags/comment_class) ;-). Sachez aussi qu'il existe des équivalents pour d'autres sections, comme post\_class( ).