---
title: Indenter
date: 2012-10-12T19:44:56+00:00
---

C'est le moment de relancer l'éternel débat sur l'indentation ! Je ne vais pas vous rappeler combien il est important d'indenter correctement son code, je pense que vous le savez déjà.

Je voudrais plutôt aborder la question de _comment_ indenter. Là, on se retrouve entre 2 camps : ceux qui utilisent des espaces, et ceux qui préfèrent les tabulations. Pour ne rien vous cacher, j'ai un énorme parti pris pour les tabulations, et je m'en va vous dire pourquoi...

## Légèreté

Tout ce qu'un fichier de code contient, ce sont des caractères. C'est eux qui font tout son poids. On comprend vite qu'utiliser des espaces va l'alourdir inutilement.

Pour l'exemple, j'ai pris un fichier "classique" de 1200 lignes, la classe Set de CakePHP, afin de comparer les deux méthodes.

Avec l'indentation d'origine (tabulations), le fichier pèse environ 35ko. Réindenté avec 4 espaces il pèse 44ko.

Ça peut paraître ridicule comme ça, mais sur un projet entier vous pourriez perdre pas mal de kilos, et gagner un temps d'exécution précieux avec les langages de script puisque les parseurs auront moins de texte à analyser. De même, un fichier HTML ou JS tabulé sera transféré plus rapidement au client.

## Simplicité

Ce n'est pas qu'un cliché : le développeur est feignant (et c'est une de ses plus grandes qualités !). Il devrait donc tout faire pour taper le moins de caractères possible, histoire de ne pas se fouler le poignet, on est jamais trop prudent.

Or, si il indente de 4 caractères, il utilisera 4 espaces, contre une seule tabulation. Vous me direz, feignant et malin comme il est, le développeur aura vite fait de configurer son IDE favori pour que la touche tabulation insère des espaces. Un point pour lui, mais continuons.

## Configuration

Si vous êtes aussi maniaques que moi, il vous est sûrement déjà arrivé, au moment d'utiliser un bout de code qui n'est pas de vous, de le reformater à votre sauce. Dans ce cas, il n'est pas rare d'avoir à retaper l'indentation, ce qui peut s'avérer très pénible sans outils.

Par exemple, je travaille avec des tabulations de 5 caractères. Quand je récupère un fichier indenté à coup d'espaces par groupe de 4, il faut que je réarrange tout ligne par ligne, ou, encore une fois, que j'utilise un outil. Si ce fichier était indenté avec des tabulations, il s'adapterait naturellement à la configuration de mon éditeur. Je pourrais sans problème le donner à d'autres gens qui le verraient avec des tabulations de 2, 4, ou 8 caractères, selon leurs préférences.

## Bref

Je l'avoue, certains défauts des espaces que j'ai pointés ici se contournent facilement avec nos jolis éditeurs modernes. Mais l'argument du poids tient toujours, en tous cas pour les développeurs web.

Et puis aussi, pourquoi se compliquer la vie ?