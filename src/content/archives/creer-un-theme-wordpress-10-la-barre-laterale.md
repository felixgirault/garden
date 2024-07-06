---
title: Créer un thème WordPress – 10 – La barre latérale
date: 2010-10-02T16:04:40+00:00
---

Bienvenue dans cette dixième partie, où nous allons aborder l'un des éléments les plus importants d'un thème WordPress : La barre latérale ! C'est ici que l'on pourra afficher les différents widgets, comme un formulaire de recherche, une liste de catégories, de tags, etc.

Étant donné que ces widgets sont gérés par WordPress, dans l'administration, nous allons pouvoir faire fonctionner cette barre sans efforts, avec un minimum de code. Nous verrons ensuite comment aller un peu plus loin pour des cas particuliers. Par exemple, créer plusieurs emplacements pour les widgets (on voit parfois des designs à deux barres latérales, ou une dans le pied de page...).

## Le principe

La seule chose à comprendre sur les zones de widgets, c'est comment ces dernières sont affichés. L'affichage en lui-même est totalement géré par WordPress.

Sur ce point, WordPress respecte parfaitement la sémantique d'une page, en affichant ces widgets sous forme de liste. C'est tout à fait logique : nous avons affaire à un liste de widgets, on utilise donc les balises appropriées `<ul>`/`<ol>` et `<li>`.

Si j'insiste un peu sur ce point, c'est pour vous faire réfléchir à votre code. On ne pense pas toujours aux meilleures balises pour afficher quelque chose, par manque d'expérience, en se focalisant trop sur le design... Pourtant, il est très important de faire le bon choix. Cela rends votre site plus accessible, plus facile à référencer, ou tout simplement plus clair.

## Le minimum

Ici, on va travailler dans le fichier _sidebar.php_. Vous vous rappelez ? Il doit contenir ceci :

```html
<div id="sidebar">

</div>
```

Maintenant, ça va être très simple. Il nous suffit de placer ceci à l'intérieur de la _div#sidebar_ :

```html
<ul>
	<?php
		/**
		 *   Si WordPress prends en charge les barres dynamique, on affiche les widgets.
		 *   Par défaut, ces derniers seront placés entre balises <li></li>.
		 */
		if ( function_exists( 'dynamic_sidebar' )) {
			dynamic_sidebar( );
		}
	?>
</ul>
```

C'est tout pour ce fichier !

Pour le moment, notre thème a la capacité d'afficher des widgets, mais WordPress ne le sait pas. Comme d'habitude, il suffit de lui dire, dans le fichier _functions.php_ :

```php
<?php
	/**
	 *   Si WordPress prends en charge les barres dynamique,
	 *   on lui signale que notre thème les supporte.
	 */
	if ( function_exists( 'register_sidebar' )) {
		register_sidebar( );
	}
?>
```

Encore une fois, c'est très court. Maintenant, vous pouvez faire un tour dans l'administration de WordPress, puis, dans _Apparence > Widgets_, ajouter au hasard quelques widgets pour tester l'affichage.

Et voilà ! Ça marche tout seul, et le tout en moins de 10 lignes de code !

## Des widgets plus personnels

Il est possible que vous ne trouviez pas votre bonheur dans les widgets proposés par WordPress. Dans ce cas, soit vous créez votre propre widget, soit vous intégrez directement le code dans la sidebar. Ici, je n'aborderai pas la création de widgets, car ce n'est pas le but principal du tutoriel. Nous allons donc voir où et comment ajouter un widget "en dur" dans notre barre latérale. Nous allons en faire un qui affiche la page d'où provient le visiteur. C'est nul, je sais, mais c'est simple !

Pour savoir quoi faire, nous allons regarder le code que produit le widget "texte", et copier honteusement sur lui ! Voici le type de code qu'il peut produire :

```html
<li id="text-3" class="widget widget_text">
	<h3 class="widget-title">Le titre du widget</h3>
     
	<div class="textwidget">
		<p>Le texte de test qui est très bien nommé car c'est sa fonction...</p>
	</div> 
</li>
```

Je pense qu'il n'est pas nécessaire de commenter ce bout de code... En conservant cette structure, nous pourrions écrire ceci pour notre widget :

```html
<li id="referer" class="widget widget_referer">
	<h3 class="widget-title">Le titre du widget</h3>
     
	<div>
		<p>Vous arrivez de cette page : <?php echo $_SERVER['HTTP_REFERER']; ?>.</p>
		<p>Impressionné non ?</p>
	</div> 
</li>
```

Comme vous le voyez, pas besoin de changer grand chose : les _id_ et _class_, et bien sûr le contenu. Mais où placer ce code pour le tester ? Vous avez deux solutions : juste après `<ul>` (il apparaîtra avant les widgets dynamiques), ou juste avant `</ul>` (après les widgets dynamiques).

## Plusieurs zones de widgets

Si vous avez l'intention de faire un design à trois colonnes par exemple, il va vous falloir plusieurs barres latérales pour organiser simplement vos widgets (2 dans ce cas). Nous allons donc créer un nouveau fichier pour la deuxième barre, _sidebar-.php_. Par exemple : _sidebar-secondaire.php_.

Voici comment remplir ce fichier :

```html
<!--
	On donne un id sifférent à cette barre, pour la différencier de l'autre en Css.
-->
<div id="sidebar-secondaire">
	<ul>
		<?php
			if ( function_exists( 'dynamic_sidebar' )) {
				/**
				 *   L'appel de cette fonction change pour afficher une barre particulière,
				 *   celle que l'on a appelé 'secondaire'.
				 */
				dynamic_sidebar( 'secondaire' );
			}
		?>
	</ul>
</div>
```

Maintenant, il va falloir la déclarer dans _functions.php_ en modifiant le code précédent par ceci :

```php
/**
 *   Si WordPress prends en charge les barres dynamique,
 *   on lui signale que notre thème les supporte.
 */
if ( function_exists( 'register_sidebar' )) {
	// la première barre
	register_sidebar( );

	// la nouvelle
	register_sidebar(
		array(
			'name' => 'secondaire' // le nom que l'on a donné à la nouvelle
		)
	);
}
```

Finalement, il faut afficher cette nouvelle barre partout où l'on affichait la première, par exemple dans _index.php_, _single.php_ etc. Pour ce faire, nous allons rajouter une ligne après chacun des appels de _get\_sidebar( )_.

```php
// avant
<?php get_sidebar( ); ?>

// après
<?php
	get_sidebar( ); // la première barre
	get_sidebar( 'secondaire' ); // la nouvelle
?>
```

Il suffit d'appeler la fonction en lui passant le nom de la barre désirée. Si vous retournez dans la page d'administration des widgets, vous devriez voir apparaître une nouvelle zone ou vous pouvez déposer des widget. Encore une fois, ajoutez-y quelques widgets puis allez voir votre blog. Vous devriez y voir les widgets des deux barres que nous avons définies !

Maintenant que nous avons appris toutes les bases de la gestion des widgets, nous allons pouvoir [conclure avec le pied de page](/archives/creer-un-theme-wordpress-11-le-pied-de-page) !

### Sommaire du tutoriel

1.  [Introduction](/archives/creer-un-theme-wordpress-1-introduction)
2.  [Installation](/archives/creer-un-theme-wordpress-2-installation)
3.  [L'architecture des fichiers](/archives/creer-un-theme-wordpress-3-larchitecture-des-fichiers)
4.  [Informations sur le thème](/archives/creer-un-theme-wordpress-4-informations-sur-le-theme)
5.  [La mise en page générale](/archives/creer-un-theme-wordpress-5-la-mise-en-page-generale)
6.  [L'en-tête de page](/archives/creer-un-theme-wordpress-6-len-tete-de-page)
7.  [Les articles](/archives/creer-un-theme-wordpress-7-les-articles)
8.  [Articles et pages seuls](/archives/creer-un-theme-wordpress-8-articles-et-pages-seuls)
9.  [Les commentaires](/archives/creer-un-theme-wordpress-9-les-commentaires)
10.  La barre latérale (on y est !)
11.  [Le pied de page](/archives/creer-un-theme-wordpress-11-le-pied-de-page)