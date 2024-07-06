---
title: Optimisez vos affichages avec echo
date: 2010-09-13T18:05:41+00:00
---

Attention ! Cet article s'adresse aux plus tatillons d'entre vous ! Je vais traiter ici d'une petite astuce pour optimiser l'utilisation de l'instruction _echo_ en Php. Cette astuce consiste à rendre plus rapide l'affichage de chaînes concaténées en utilisant une syntaxe alternative. Si je vous ai prévenu que cela s'adressait aux optimisateurs fous, c'est qu'elle prendra une importance raisonnable sur un site à gros trafic par exemple, ou si vous affichez beaucoup de chaînes concaténées.

Si vous ne pensez pas faire partie de ces personnes, rien ne vous interdit de lire la suite pour votre culture ;).

## Comment ?

Il existe une syntaxe particulière pour passer plusieurs paramètres à _echo_, que peu de gens connaissent. Elle ressemble beaucoup à un passage de paramètres à une fonction : les variables à afficher sont séparées par une virgule. C'est la solution que nous allons utiliser pour optimiser la sortie.

Prenons un exemple. Imaginons que nous voulions afficher un message de présentation d'une personne du style "Bonjour, je suis <prenom> <nom> et j'ai <age> ans". En excluant la syntaxe dont je viens de vous parler, on dispose de deux moyens pour afficher ce message :

```php
$prenom = 'john';
$nom = 'doe';
$age = 12;

// avec simples quotes
echo 'Bonjour, je suis ' . $prenom . ' ' . $nom . ' et j\'ai ' . $age . ' ans.';

// avec doubles quotes
echo "Bonjour, je suis $prenom $nom et j'ai $age ans";
```

Rien d'époustouflant donc. Un détail tout de même, la première syntaxe est plus rapide que la seconde. Pourquoi ? Parce que dans la seconde, Php doit d'abord chercher si il y a des variables dans la chaîne avant de les remplacer par leurs valeurs, alors que dans la seconde, il suffit d'ajouter les chaînes dans l'ordre.

Maintenant, notre nouvelle syntaxe :

```php
echo 'Bonjour, je suis ', $prenom, ' ', $nom, ' et j\'ai ', $age, ' ans.';
```

Vous avez dû le remarquer, c'est exactement la même chose qu'avec des simples quotes, sauf que les points sont remplacés par des virgules.

## Pourquoi ?

Bonne question :P. En fait, la seule différence avec première forme, c'est qu'aucune concaténation n'est effectuée. Concrètement, voici un code équivalent à la première forme :

```php
$chaine = 'Bonjour, je suis ';
$chaine = $chaine . $prenom;
$chaine = $chaine . ' ';
$chaine = $chaine . $nom;
$chaine = $chaine . ' et j\'ai ';
$chaine = $chaine . $age;
$chaine = $chaine . ' ans.';
echo $chaine;
```

Un peu lourd non ? J'ai volontairement décomposé au maximum les instructions, mais c'est exactement ce qui se passe. Voyons maintenant à quoi équivaut l'autre syntaxe, avec les virgules :

```php
echo 'Bonjour, je suis ';
echo $prenom;
echo ' ';
echo $nom;
echo ' et j\'ai ';
echo $age;
echo ' ans.';
```

C'est déjà beaucoup mieux ! On ne le voit pas tout de suite, mais on vient d'économiser 7 affectations (=) et 6 concaténations (.) ;).

## En bref

Finalement on peu classer les 3 méthodes par ordre de performances :

*   virgules :
    
    ```php
    'Bonjour, je suis ', $prenom, ' ', $nom, ' et j\'ai ', $age, ' ans.'
    ```
    
*   simples quotes :
    
    ```php
    'Bonjour, je suis ' . $prenom . ' ' . $nom . ' et j\'ai ' . $age . ' ans.'
    ```
    
*   doubles quotes :
    
    ```php
    "Bonjour, je suis $prenom $nom et j'ai $age ans"
    ```
    

L'inconvénient, c'est que si on les classe par lisibilité, on change l'ordre :?. Alors à vous de choisir le meilleur compromis !

## Edit du 13 août 2013

Il semble que depuis PHP 5.4, de grosses optimisations aient été faites sur la gestion des chaînes de caractères.

La méthode d'affichage la plus efficace est désormais l'interpolation de variables dans une chaîne entre doubles quotes. Vient ensuite la méthode des virgules, puis la concaténation.

Vous pouvez lancer et bidouiller ce petit script [https://gist.github.com/felixgirault/6222639](https://gist.github.com/felixgirault/6222639 "Benchmark d'echo en PHP") pour vérifier ces résultats sur votre environnement ;).