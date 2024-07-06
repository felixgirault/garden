---
title: De bons défauts
date: 2012-11-07T18:43:06+00:00
---

Il est courant qu'une fonction puisse retourner une valeur par défaut.

Par exemple, imaginez une méthode qui fouille dans les données d'un objet pour retourner une partie de ces données. Si cette méthode ne trouve pas ce qu'elle cherche, on choisira en général entre 2 options : lancer une exception ou retourner une valeur par défaut.

Le traitement d'exception pouvant se révéler un peu lourd à gérer, particulièrement sur des méthodes souvent utilisées, on préférera la plupart du temps retourner une valeur par défaut.

```php
class Collection {

	protected $_data = array( );

	public function getData( $key ) {
		if ( isset( $this->_data[ $key ])) {
			return $this->_data[ $key ];
		}
		return false;
	}
}
```

Ici, la méthode getData( ) retourne les données associées à une clé, ou false si la clé n'est pas définie. Dans la plupart des cas, tout fonctionne correctement : si la méthode retourne false, c'est qu'aucune donnée n'existe.

Mais si on veut récupérer une valeur booléenne, retourner false pose problème puisqu'on ne peut pas déterminer si la valeur existe et est égale à false, ou si elle n'existe simplement pas.

La solution à ce problème est en fait très simple. Il suffit de laisser le choix de la valeur par défaut à l'utilisateur :

```php
public function getData( $key, $default = false ) {
	if ( isset( $this->_data[ $key ])) {
		return $this->_data[ $key ];
	}
	return $default;
}
```

De cette manière, on peut toujours utiliser la méthode de la même façon, mais si l'on souhaite récupérer une valeur booléenne, on peut maintenant définir une autre valeur par défaut pour ne pas fausser le test :

```php
// Dans le cas classique, $string sera égal à false
// si la clé my_string n'existe pas.
$string = $Collection->getData( 'my_string' );

// Dans le cas d'un booléen, on utilise null comme valeur par défaut
// pour être sûr du résultat.
$boolean = $Collection->getData( 'my_boolean', null ); 

if ( $boolean === null ) {
	// la valeur n'existe pas
}
```

En général, on préférera utiliser null comme valeur par défaut de la méthode, puisqu'il y a moins de chances que l'on veuille stocker une valeur nulle que booléenne.