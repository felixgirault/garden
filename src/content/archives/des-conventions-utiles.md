---
title: Des conventions utiles
date: 2012-12-08T16:01:45+00:00
---

Beaucoup de développeurs suivent des conventions de codage pour développer leurs applications. Elles sont bien sûr importantes, voire indispensables notamment pour un travail en équipe, mais elles ne sont finalement que des considérations esthétiques.

Tout le monde connait ces interminables débats sur comment nommer ses fichiers, ses objets, ses méthodes ou variables, et beaucoup d'entre nous aiment tailler le bout de gras histoire de bien prouver qu'ils ont raison, [moi y compris](/archives/indenter)... Pourtant, peu importe le style, rien de tout cela ne permet de certifier qu'un code sera intelligent et efficace.

Je vous propose donc quelques unes de mes guidelines.

## Séparation

Pour garder une architecture simple et claire, il est important de savoir qui fait quoi. Tous les éléments d'un code devraient avoir un but précis et pouvoir être décrits en une phrase.

Dès lors qu'un objet représente plusieurs concepts, ou qu'une méthode fait deux choses totalement différentes suivant la manière dont elle est appelée, on introduit de la complexité inutile. Complexité qui se traduira souvent en ajout de conditions dans tous les sens ou de blocs monolithiques de 12 000 lignes.

La programmation demande déjà assez de rigueur pour qu'on évite en plus de se compliquer la vie.

## Concision

Cette idée va de paire avec la première. Lorsqu'un bout de code ne doit faire qu'une seule chose, il est normalement très court, ce qui a plusieurs avantages :

*   il est compréhensible facilement; pas besoin d'une tirade en commentaire pour expliquer une méthode de 5 à 10 lignes, encore moins si elle est nommée correctement.
*   il est maintenable facilement, étant donné sa simplicité

En plus de réduire le nombre de lignes de mes méthodes, j'aime essayer de réduire au maximum leur longueur, car comme on dit, [code is poetry](http://coding.smashingmagazine.com/2010/05/05/the-poetics-of-coding/ "The poetics of coding"), et admettez qu'on voit rarement des poèmes composés de vers de 15 bornes de long.

## Clarté

Rien est plus important pour la clarté et la cohésion d'un code que de nommer correctement les entités qui le composent. On pourrait comparer une classe à un livre et ses méthodes à un sommaire.

Le titre du livre et le nom de ses chapitres doivent être accrocheurs tout en décrivant clairement leur contenu, de même que le nom d'une classe et de ses méthodes. Ensuite, il suffit de remplir le tout avec les bons mots, ou plutôt les bonnes variables, boucles et conditions.

Les noms doivent être évidents, descriptifs sans être trop longs. Ils seront aussi plus faciles à trouver si le code concerné ne s'occupe que d'une chose.

## Recyclage

Règle de base, ne jamais dupliquer un morceau de code à travers une application. Au maximum, les parties similaires devraient être réunies à un seul endroit.

Par exemple, on a souvent besoin de charger des fichiers de configuration. Au lieu de répéter les étapes de chargement partout ou on en a besoin (chargement du fichier, lecture, parsing, ...), on préférera créer une classe utilitaire spécialisée qui nous retournera un tableau de configuration depuis un nom de fichier.

## Abstraction

Continuons notre exemple. L'avantage de la classe de chargement de configuration, c'est que sa mécanique interne est maintenant cachée à l'utilisateur (c'est là tout l'intérêt du modèle objet). Cette classe pourrait bien charger des fichiers json, xml, ini, depuis le système de fichiers local ou une machine distante, son utilisation ne changerait pas.

En fonctionnant de cette manière, on découpe une application en plusieurs modules quasi-indépendants, faiblement couplés, ce qui leur permet d'évoluer séparément les uns des autres sans impacter le reste du code.

## Finalement...

Suivre ce genre de directions mène à un cercle vertueux : on voit que tous ces points sont liés, qu'en régler un facilite la mise en place d'un autre.

Au final, tout ça mène vers un développement plus agréable, ou une application complexe est réduite à un ensemble de problèmes simples, ce qui facilite aussi sa maintenance et son évolution.