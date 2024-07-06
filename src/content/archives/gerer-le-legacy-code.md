---
title: Gérer le legacy code
date: 2012-10-13T13:07:36+00:00
---

Il y a fort longtemps, vous avez codé une classe une peu pourrie (si, si, on l'a tous fait), qui était capable de dire quelque chose. La voici :

```php
class VieilleClassePourrie {

	public function direQuelqueChose( ) {
		echo 'quelque chose';
	}
}
```

Mais voilà, vous aimeriez bien dire autre chose maintenant... Motivé, vous décidez d'écrire une nouvelle classe qui déchire tout, que vous pourrez utiliser dans vos nouveaux projets qui déchirent tout. La voilà :

```php
class NouvelleClasseQuiTue {

	public function dire( $phrase ) {
		echo $phrase;
	}
}
```

Mille fois mieux pensée, cette classe permet de dire tout et n'importe quoi !

Et là, c'est le drame. Vous devez désormais maintenir deux versions de cette classe, pour vos anciens et vos nouveaux projets.

Pour y remédier sur un petit projet, il sera facile de changer les références à notre classe, par un simple rechercher/remplacer ou avec un outil plus puissant dédié au refactoring. Torché en cinq minutes. Par contre, refactoriser plusieurs projets complexes peut s'avérer beaucoup plus long et pénible, voire totalement inutile si ils sont voués à disparaître.

Dans ce cas, on préférera transformer nos anciennes interfaces en simples façades, utilisant de manière transparente de nouvelles implémentations. De cette manière, vous pourriez discrètement remplacer votre vieille classe pourrie par la nouvelle qui déchire tout :

```php
class VieilleClassePourrie {

	protected $_MaNouvelleClasseQuiTue;

	public function direQuelqueChose( ) {
		echo $_MaNouvelleClasseQuiTue->dire( 'quelque chose' );
	}
}
```

Maintenant, vous n'avez plus qu'une implémentation à maintenir, et en bonus, vos anciens projets pourront bénéficier des optimisations et corrections faites sur les nouveaux !