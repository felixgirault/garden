---
title: Retour utilisateur avec Ajax et JQuery
date: 2012-02-13T20:30:13+00:00
---

Une des choses les plus importantes quand on utilise Ajax est de donner un retour à l'utilisateur. Il doit savoir à tout moment si un traitement est en cours, si il peut accéder à telle ou telle partie du site.

Au minimum, on a toujours besoin d'indiquer qu'on est en train de traiter des données. L'exemple le plus célèbre est sûrement le .gif de Facebook, vous savez, les 3 petites barres bleues ?

Le problème avec l'utilisation d'une image, c'est qu'il est nécessaire d'ajouter du code pour l'afficher. Alors si comme moi vous souhaitez simplement donner un retour à vos visiteurs le plus simplement du monde voici une petite astuce 😉

## Du Css

On dispose avec Css d'un choix de curseur assez riche, pour indiquer toutes sortes de choses. Par exemple qu'un élément peut être édité, redimensionné, déplacé...

Et comme Css est très gentil, il nous propose aussi un curseur de chargement ! Il suffit de modifier la propriété "cursor" d'un élément, comme ceci :

```css
p {
     cursor: progress;
}
```

Survolez-moi pour voir le résultat !

Vous trouverez sur Zone Css [la liste des différents curseurs que vous pouvez utiliser](http://www.zonecss.fr/style_css/feuille_css_cursor.html).

## Du JQuery

Voyons maintenant comment utiliser tout ça à notre avantage !

Imaginons que l'on veuille récupérer des informations au clic sur un bouton. On pourrait utiliser ce type de code :

```javascript
$('button').click( function( ) {
	$.ajax({
		// paramètre de la requête
	});
});
```

Tout ce qu'il reste à faire, c'est modifier le curseur pendant la requête, comme ceci :

```javascript
$('button').click( function( ) {
	// juste avant l’appel, on change de curseur

	$('body').css( 'cursor', 'progress' );

	$.ajax({
		// paramètre de la requête

		complete: function( ) {
			// on remet le curseur d’origine
			// une fois la requête terminée

			$('body').css( 'cursor', 'auto' ); 
		}
	});
});
```

C'est tout, le curseur va maintenant indiquer les chargements !

Bien sûr, cela ne s'applique que pour des cas très simples et ne dispense pas de donner plus d'informations aux utilisateurs, mais cette solution a l'avantage d'être rapide à mettre en place et efficace.

De plus, le curseur utilisé par le navigateur dépend de l'OS sur lequel il est installé. L'utilisateur saura donc immédiatement à quel type d'action il a affaire quand il verra ce curseur, l'ayant déjà rencontré en utilisant son ordinateur.