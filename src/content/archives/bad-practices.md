---
title: Bad practices
date: 2010-12-23T21:53:14+00:00
---

Bon ! Y'en a marre ! Marre de voir du code illisible, lourd, de la bidouille et autres tas de caractères incohérents lâchement entassés sur d'innocentes lignes de code !

Je vais vous exposer quelques unes des mauvaises pratiques que j'ai pu rencontrer (ou commettre) depuis que je suis développeur, pour vous montrer ce qu'il faut à tout prix éviter. Je ne parlerai que des questions de présentation et de lisibilité ici, pas d'[optimisation pour les fous](/archives/optimisez-vos-affichages-avec-echo).

Les codes présentés seront codés en Php, il y aura donc certaines particularités que l'on ne retrouve pas dans tous les langages, mais les cas présentés sont communs à n'importe lequel d'entre eux.

## Exemples

### Nommage

Chacun fait un peu sa sauce dans ce domaine. Par exemple, une variable qui stocke un nombre de jours pourrait être nommée de beaucoup de manières différentes :

```php
<?php
	$nombre_de_jours;
	$nombreJours;
	$nb_jour;
	// ...
?>
```

En soi, la manière dont vous nommez vos variables importe peu. Mais s'il vous plaît, **soyez clairs et cohérents** ! Èvitez à tout prix de mélanger une notation [camelCase](http://fr.wikipedia.org/wiki/CamelCase) avec une notation a underscores par exemple. De plus, évitez de trop raccourcir les noms de variables et fonctions, pour ne pas vous retrouver avec un code impossible à relire.

Mais ce n'est pas tout ! Si vous ne vous sentez pas capable de tout coder en anglais, ne le faites pas ! Parce que les codes ou on voit `$nombreJours` à une ligne, et `$daysCount` plus loin perdent énormément de lisibilité. Et en tant que bon français (fort mauvais en anglais que nous sommes ^^), j'insite !

Par exemple, j'ai vu récemment une variable `$childs` (les anglophones savent bien que le pluriel de child est child**ren**). Mine de rien, c'est très important, car si vous codez en anglais, c'est probablement pour être lu par des anglophones, alors mieux vaut coder en anglais correct.

### Trop court, ou trop long

A vouloir trop raccourcir vos codes, vous risquez de vous retrouver devant un énorme tas de caractères informes, très difficile à relire.

Je le disais plus haut, mieux vaux garder des noms de variables et de fonctions compréhensibles immédiatement, clairs. Mais il n'y a pas que ça que l'on peut raccourcir. Certains développeurs jouent sur les sauts de lignes pour réduire la taille d'un code par exemple, et ça peut vite devenir grave !

Voici un petit exemple :

```php
<?php
	$nombreDeJours = 12;
	$tableauInutile = array(
		'toto' => array(
			'foo' => 86432,
			'bar' => 356
		),
		'foobar' => 35
	);

	if ( $nombreDeJours === 12 )  {
		echo 'Formidable !';
	}
?>
```

```php
<?php
	$j = 12;
	$t = array( 'toto' => array( 'foo' => 86432, 'bar' => 356 ), 'foobar' => 35 );
	if ( $j === 12) echo 'Formidable !';
?>
```

Vous voyez mieux de quoi je veux parler ? Croyez-moi, au bout de 20 lignes dans le style du second code, les maux de tête commencent...

Passons à l'excès inverse : Les longueurs ! Mais qu'est-ce qui peut être trop long ? Peu de choses finalement, mais il est important d'y faire attention.

Premièrement, même si pour garder des variables claires il faut une certaine taille, il n'est pas non plus nécessaire d'en faire des tirades. À choisir, je préfère nettement `$joursAvantNoel`, à `$joursRestantsAvantLeJourDeLaNaissanceDeJesus`...

Je l'avoue, on voit rarement des variables à rallonge. Par contre, il est très courant de voir des fonctions de 50 - 100 lignes, et là, même parfaitement commenté il est difficile de plonger dans un tel code car on en perd le fil. Dans le même genre, les trop longues lignes cassent le rythme de lecture, et obligent à passer son temps à scroller de gauche à droite. Dans les deux cas, on ne peut plus avoir une vue d'ensemble du morceau de code et on perd des heures a chercher et rechercher comment l'ensemble fonctionne.

Pour éviter ces longueurs, vous pouvez séparer vos fonctions en plusieurs. Cela comporte deux avantages non négligeables :

*   Avant, vous aviez une fonction de 100 lignes. Maintenant, cette fonction fait appel à des "sous-fonctions" courtes et simples. Résultat : vous pouvez lire la fonction principale comme un sommaire, et avoir un rapide aperçu de ce qui s'y passe (si le nom des fonctions est explicite ;)), et les autres fonctions sont courtes et faciles à appréhender.
*   Deuxième gros avantage, découper vos codes en petites fonctions peut vous pousser à faire des fonctions facilement réutilisables. En effet, plus elles sont courtes et généralistes, plus vous pouvez les utiliser dans d'autres parties de votre code.

### Commentaires

On touche ici un point essentiel ! En fait, je vous l'accorde, les commentaires paraissent toujours superflus lorsque l'on code quelque chose, pour peu que ce soit présenté correctement. Mais c'est toujours la même chose, quand on retombe sur un vieux cru, il faut une minute par ligne pour en saisir le fonctionnement. Et bien sûr, si on ne peut pas se relire facilement, quelqu'un d'autre ne risque pas de faire mieux...

Alors il faut prendre l'habitude, se forcer un peu, et commenter un code **pendant** que l'on travaille dessus.

### Indentation

Je vous ai gardé le "meilleur" pour la fin ! L'indentation sert à marquer les différents étages de votre code, à voir la façon dont ils s'imbriquent les uns dans les autres. Sans indentation correcte, c'est juste une boucherie.

Voici un exemple simple qui ne nécessitera aucune explication tant il parle de lui-même :

```php
<?php
	foreach ( $elements as $element ) {
	$poids = $element->poids( );
	if ( $poids == 12 )
	echo 'cool !';
		echo 'woot !';
}
$variable = 864;
	$foo = 'bar';
?>
```

Dépression assurée...

## Quelques pistes

Heureusement pour nous, il y sur cette terre des gens formidables, des gens qui écrivent des normes ! On a toujours peur que ce soit trop strict, trop contraignant, etc. Mais suivre certaines conventions fait gagner un temps considérable, surtout bien sûr quand on doit travailler en équipe.

Évidemment, le but n'est pas de suivre aveuglément et à la lettre une norme précise, mais en lire quelques unes et en tirer ce que l'on préfère vaut vraiment le coup.

Personnellement, celles qui me plaisent le plus sont celles de [Qt](http://qt.gitorious.org/qt/pages/QtCodingStyle), et de [CakePhp](https://trac.cakephp.org/wiki/Developement/CodingStandards), 2 framework excellents, en passant ;). Je vous conseille également ces articles de Wikipedia qui vous donneront un aperçu rapide de différents styles : [Programming style](http://en.wikipedia.org/wiki/Programming_style) et [Indent style](http://en.wikipedia.org/wiki/Indent_style). Vous allez voir, ces normes sont toutes très courtes. Rien à voir avec les specs du W3C par exemple, c'est vite lu et vous n'avez plus qu'à garder le meilleur !

Et pour finir en beauté, pour le contre-exemple, voici une norme dont la moitié des règles sont parfaitement absurdes et casse-\*\*\* : [la norme Epitech](http://www.epitech.net/intra/docs/norme.html) ! Je vous laisse sur une citation tirée de cette oeuvre qui défie les lois de la gravité :

> On alignera les noms des variables sur le nom de la fonction qui les contient et uniquement celle-ci.

😛