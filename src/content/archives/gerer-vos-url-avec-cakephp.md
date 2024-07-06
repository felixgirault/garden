---
title: Gérer vos URL avec CakePHP
date: 2012-10-02T20:38:57+00:00
---

Entre les contrôleurs et les vues, il est parfois un peu difficile, voire pénible, de maintenir les différents liens de vos applications. Si ils sont tous codés "en dur", ils chargent le code inutilement et doivent être modifiés un par un si une règle de routage est changée.

Pour mieux s'y retrouver, je vous propose une petite astuce qui vous fera sûrement gagner du temps, et vous évidera bien des emmerdements.

L'idée est de créer deux classes:

*   Une classe statique qui contiendra toutes les URL utilisées dans l'application
*   Un helper qui nous construira facilement des liens depuis nos URL

## La classe statique

Cette classe sera composée de méthodes statiques, qui renverront chacune une URL particulière. Ce genre d'utilitaire a bien sa place dans le répertoire _Lib_ de votre application (_libs_ pour les versions antérieures à 2.0).

Commençons par une URL simple, et qu'on retrouve partout:

```php
class Url {
	
	public static function home() {
		return [
			'controller' => 'articles',
			'action' => 'index'
		];
	}
}
```

On peut déjà utiliser cette fonction pour des redirections dans un contrôleur par exemple.

```php
$this->redirect(Url::home());
```

Mais il arrive souvent qu'on construise des URL à partir de certains paramètres. Par exemple, une page pour voir un article aura besoin de son id.

```php
public static function article($article) {
	return [
		'controller' => 'articles',
		'action' => 'view',
		'id' => $article['Article']['id'],
		'slug' => $article['Article']['slug']
	];
}
```

Cette fonction prend pour paramètre un article tout droit récupéré d'un modèle, ce qui permet deux utilisations très pratiques:

```php
class ArticlesController extends AppController {

	public function random() {
		$article = $this->Article->findRandom();

		// on passe directement $article
		$this->redirect(Url::article($article));
	}
}
```

```php
class Comment extends AppModel {

	public $belongsTo = array('Article');
}

class CommentsController extends AppController {

	public function view($id) {
		$comment = $this->Comment->findById($id);
										.
		// On peut passer directement $comment puisque, étant lié au
		// modèle Article, il contient ['Article']['id']
		$articleUrl = Url::article($comment);
	}
}
```

Maintenant, il suffit de remplir cette classe avec toutes les URL dont nous auront besoin. Rassurez-vous, il n'y en a souvent pas tant que ça, et ça vous évitera de toutes façons de les écrire ailleurs.

## Le helper

Dans cette classe, toutes nos méthodes seront en quelque sorte couplées aux méthodes de la classe Url. C'est-à-dire que pour chacune de ses méthodes, il y en aura une dans le helper.

```php
class LinkHelper extends AppHelper {

	public $helpers = ['Html'];

	public function home($options = []) {
		return $this->Html->link(
			'Homepage',
			Url::home(),
			$options
		);
	}

	public function article($article, $options = []) {
		return $this->Html->link(
			$article['Article']['title'],
			Url::article($article),
			$options
		);
	}
}
```

A chaque fois, on utilise le HtmlHelper pour retourner un lien vers l'URL. Grâce au paramètre `$options`, on peut toujours configurer nos liens.

On peut maintenant utiliser le helper dans nos vues:

```php
echo $this->Link->home(); ?>
// <a href="/articles/index">Homepage</a>

echo $this->Link->home(['title' => 'go home!']);
// <a href="/articles/index" title="go home!">Homepage</a>

echo $this->Link->article($article);
// <a href="/articles/view/12-article-title">Article title</a>
```

Et voilà !

On a un système simple et clair, avec tous les points sensibles que sont les URL regroupés en un bloc (2 pour être honnête 🙂 ).

Bref, on ajoute du sens, de la cohérence, et on réduit les risques !