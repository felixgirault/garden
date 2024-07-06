---
title: Refactoring
date: 2012-10-13T13:07:00+00:00
---

Si vous perdez le contrôle sur votre outil de travail, vous perdez le contrôle sur la qualité de votre produit. Imaginez un marteau qui vous glisse des mains, vous risquez fort de rater le clou, ou pire, de vous écraser méchamment les doigts.

La programmation demande une rigueur extrême et une attention constante.

Une fois introduit un morceau de code un peu hasardeux, trop spécialisé ou mal pensé pour être maintenu correctement, les ennuis commencent. A un moment ou à un autre, vous aurez à modifier ce code, à y faire des corrections ou des ajouts de fonctionnalités, et si il n'est pas naturellement intégré au reste de votre application, vous allez devoir ruser pour l'utiliser comme vous l'entendez.

Alors quelles solutions à ce problème ?

D'abord, à l'évidence, une conception solide. Pensez une architecture modulaire, légère, adaptable. A ce moment vous ne possédez qu'une vue d'ensemble du projet. Profitez-en et voyez grand, faites-vous plaisir, essayez d'intégrer des concepts connus comme totalement nouveaux, de ces choses que vous rêvez de développez depuis quelques temps déjà.

Si tout se passe bien, vous devriez vous roulez par terre en pleurant, mourant d'envie de pisser 3000 lignes de code dans les minutes qui suivent.

Retenez-vous !

On insistera jamais assez sur l'importance de la conception, de la recherche d'idées, même sans aucune considération technique. Cela dit, j'ai personnellement un mal fou à me séparer de mon outil de travail, à envisager un problème sans imaginer comment mettre en place la solution, avec quelles données, quels algorithmes, quels patterns je vais pouvoir m'amuser.

Ne vous reste qu'à trouver un juste milieu entre la pure abstraction et l'implémentation plus bas niveau, le tout étant de jongler entre créativité, expérience, savoir-faire, et de considérer votre propre façon de travailler.

Mais, nous en sommes tous conscients, une conception à toutes épreuves est strictement impossible. Vous ne pourrez jamais envisager toutes les contraintes techniques induites par un système externe ou par votre propre architecture logicielle, pas plus que les évolutions futures qui viendront perturber vos choix de départ pourtant si bien réfléchis.

Vient alors une solution toute naturelle : le refactoring.

Tout repose sur une autre vision du code. De statique et figé, il devient dynamique, modulable, réorganisable à souhait. C'est une des philosophies de développement qui demandent peu d'efforts au regard du temps et de l'énergie gagnés par la suite.

Au lieu de tenter d'intégrer à tout prix de nouvelles fonctionnalités, en contournant les problèmes et les contraintes, l'idée consiste à réfléchir à la meilleure manière de le faire, quitte à retravailler une partie de l'application afin d'assurer une cohérence et une cohésion totale entre tous ses composants.

Cela vaut aussi pour tout ce qui est susceptible d'évoluer dans l'application. Par exemple, on peut changer la façon dont on nomme ses classes ou ses méthodes. Dans ce cas, on devrait toujours uniformiser le code en renommant les classes ou méthodes existantes.

Pour mettre en place un refactoring régulier et efficace, il faudra plus de discussion et d'échange entre les développeurs dans un travail en équipe. Mais, finalement, ce n'est qu'un avantage de plus qui vous fera profiter de plusieurs points de vue pour décider du meilleur.

Pour des conseils pratiques sur l'art et la manière de refactoriser, je vous conseille de plonger dans cette mine d'informations [http://sourcemaking.com/refactoring](http://sourcemaking.com/refactoring "Tout sur le refactoring"), qui détaille point par point pourquoi, quand, et comment refactoriser son code.