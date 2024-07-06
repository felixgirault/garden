---
title: Créer un thème WordPress – 6 – L’en-tête de page
date: 2010-08-29T21:59:36+00:00
---

Cette fois ci, on commence le code, le vrai, le dur 😛 ! Rassurez-vous, encore une fois rien de compliqué. Je prendrai le temps qu'il faut pour vous expliquer chaque étape du code.

Nous allons commencer dans l'ordre avec l'en-tête de page, donc le fichier _header.php_, qui une des parties les plus simples dans un thème WordPress.

## head

Si vous vous rappelez bien du découpage des fichiers, vous savez qu'on ne place pas seulement notre _div#en-tete-page_ dans ce fichier, mais bien tout le haut de la page, y compris le doctype, ou encore la section _head_, sur laquelle nous allons nous concentrer dans un premier temps.

Que mettre dans le _head_ ?

Dans cette section, on trouve toutes les méta-informations sur le site, c'est à dire des informations liées au contenu mais qui n'en font pas partie à proprement parler. Nous allons donc y trouver des infos sur la langue utilisée sur le site, sur l'auteur, sur l'encodage des fichiers, un titre de page, ou encore tous les liens vers les feuilles de styles, les scripts ou les flux Rss.

L'avantage ici, c'est que WordPress va faire quasiment tout le sale boulot pour nous, à travers quelques fonctions Php. Si vous avez déjà utilisé WordPress, vous savez que l'on peut définir beaucoup de paramètres comme le langage, l'encodage etc. Nous allons donc récupérer ces paramètres grâce à ces fonctions.

Pour vous les expliquer, je vais vous donner un code commenté plutôt que plein de petits morceaux entrecoupés d'explications; ça me paraît plus simple à suivre. Voici donc le code de la section _head_ :

```html
<!DOCTYPE html>

<!--
     La fonction language_attributes( ) ajoute un attribut 'dir' (sens de lecture) et 'lang' (langage d'écriture) à la balise html.
     Elle utilise les paramètres que l'administrateur a définis pour leur donner une valeur.
     Le paramètre 'xhtml' lui dit que l'on utilise le langage XHtml et qu'elle doit formater les attributs pour ce langage.
-->
<html <?php language_attributes( 'xhtml' ); ?>>
     <head>
          <!--
               Cette balise meta définit l'encodage des caractères sur la page.
               Pour récupérer l'encodage défini par l'administrateur, on utilise une fonction très importante dans WordPress : bloginfo( ).
               Cette fonction affiche une valeur associée à une chaîne passée en paramètre.
               Pour compléter notre balise, on va avoir besoin du type de langage utilisé ('html_type') et du jeu de caractères ('charset').
          -->
          <meta http-equiv="content-type" content="<?php bloginfo( 'html_type' ); ?>; charset=<?php bloginfo( 'charset' ); ?>" />

          <title>
               <?php
                    /**
                     *   On souhaite afficher ici un titre de la forme 'Accueil | Nom du blog', ou 'Nom d'article | Nom du blog', etc
                     */

                    if ( is_home( )) {
                         /**
                          *   Si on est sur la page d'accueil, ce qu'on sait grâce à is_home( ), on l'affiche.
                          */
                         echo 'Accueil | ';
                    } else {
                         /**
                          *   Comme son nom l'indique, cette fonction affiche le titre de la page.
                          *   Si c'est un article, son titre, si c'est une catégorie, son nom, etc.
                          *   Le premier paramètre est une chaîne à afficher avant ou après le titre.
                          *   Le deuxième indique que la fonction doit afficher le titre.
                          *   Le troisième qu'on veut afficher la chaîne passée en premier paramètre à droite du titre.
                          */
                         wp_title( ' | ', true, 'right' );
                    }

                    /**
                     *   On utilise une nouvelle fois la fonction bloginfo( ) pour récupérer le nom du blog.
                     */
                    bloginfo( 'name' );
               ?>
          </title>

          <!--
               Il faut maintenant faire le lien avec la feuille de style, les flux Rss et l'adresse de pingback.
               Encore une fois, on utilise la fonction bloginfo( ) qui nous donne décidément tout ce que l'on veut.
          -->
          <link rel="stylesheet" type="text/css" href="<?php bloginfo( 'stylesheet_url' ); ?>" />
          <link rel="alternate" type="application/rss+xml" href="<?php bloginfo( 'rss2_url' ); ?>" title="derniers articles" />
          <link rel="alternate" type="application/rss+xml" href="<?php bloginfo( 'comments_rss2_url' ) ?>" title="derniers commentaires" />
          <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />

          <!--
               Et voici la dernière étape : laisser WordPress ajouter tout son bazar :).
               J'entends par là tout les scripts utilisés par les plugins etc.
               Heureusement, la fonction wp_head( ) fait tout ça pour nous !
          -->
          <?php wp_head( ); ?>
     </head>
```

En cadeau, si vous voulez en savoir plus, je vous offre généreusement la documentation des fonctions utilisées 🙂 :

*   [language\_attributes( )](http://codex.wordpress.org/Function_Reference/language_attributes)
*   [wp\_title( )](http://codex.wordpress.org/Function_Reference/wp_title)
*   [bloginfo( )](http://codex.wordpress.org/Function_Reference/bloginfo)
*   [wp\_head( )](http://codex.wordpress.org/Function_Reference/wp_head)

## body

Voilà ! Maintenant que l'on a correctement rempli la section _head_, on va enfin pouvoir écrire du code sympa, du code qui se voit ! Même principe ici : un jouli code tout commenté pour vous !

```html
<!--
     La fonction body_class( ) ajoute des attributs class à la balise body suivant la situation.
     Par exemple, elle ajoute la classe 'single' quand un article est affiché.
     Cette fonction n'est pas utile pour tout le monde, voyez si votre design peut en tirer parti...
-->
<body <?php body_class( ); ?>>
     <div id="en-tete-page">
          <!--
               La partie 'banniere' va simplement contenir le nom et la description du blog.
               Encore une fois, on utilise bloginfo( ) pour récupérer ces informations.
          -->
          <div id="banniere">
               <h1><a href="<?php bloginfo( 'home' ); ?>" title="accueil"><?php bloginfo( 'name' ); ?></a></h1>
               <p><?php bloginfo( 'description' ); ?></p>
          </div>

          <!--
               Ce menu est utilisé par les personnes qui naviguent par tabulations,
               ou à travers des navigateurs en mode texte.
               Il propose juste des liens vers les grandes sections du blog.
               Si vous ne souhaitez pas faire apparaître ce menu, vous pouvez le cacher avec Css,
               mais il est préférable de le laisser dans le code pour des questions d'accessibilité.
          -->
          <div id="acces">
               <ul>
                    <li><a href="#menu">Aller au menu</a></li>
                    <li><a href="#contenu">Aller au contenu</a></li>
                    <li><a href="#sidebar">Aller à la barre latérale</a></li>
                    <li><a href="#pied-page">Aller au pied de page</a></li>
               </ul>
          </div>

          <!--
               Le menu principal de navigation.
          -->
          <div id="menu">
               <?php
                    /**
                     *   Si WordPress supporte les menus personnalisés, on en propose un.
                     *   Dans le cas contraire, on affiche la liste des pages plus un lien vers la page d'accueil.
                     *   Si vous n'utilisez ce thème qu'avec WordPress 3.x, vous pouvez supprimer le test
                     *   et n'utiliser que wp_nav_menu.
                     *   Si vous voulez seulement une liste des pages du site, n'utilisez que wp_page_menu( ).
                     */
                    if ( current_theme_supports( 'menus' )) {
                         wp_nav_menu( array( 'menu' => 'principal' ));
                    } else {
                         wp_page_menu( array( 'show_home' => 'Accueil', 'sort_column' => 'menu_order' ));
                    }
               ?>
          </div>
     </div>

     <!--
          Début de la page.
     -->
     <div id="page">
```

Nouvelles fonctions utilisées :

*   [body\_class( )](http://codex.wordpress.org/Function_Reference/body_class)
*   [is\_home( )](http://codex.wordpress.org/Function_Reference/is_home)
*   [wp\_title( )](http://codex.wordpress.org/Function_Reference/wp_title)
*   [current\_theme\_supports( )](http://codex.wordpress.org/Function_Reference/current_theme_supports)
*   [wp\_nav\_menu( )](http://codex.wordpress.org/Function_Reference/wp_nav_menu)
*   [wp\_page\_menu( )](http://codex.wordpress.org/Function_Reference/wp_page_menu)

Si vous utilisez wp\_nav\_menu( ), vous allez devoir le signaler à WordPress. Pour ce faire, il faut effectuer un petit ajout au fichier _functions.php_, vous savez, cette sorte de fichier de configuration de votre thème.

```php
<?php
     if ( function_exists( 'register_nav_menu' )) {
          register_nav_menu( 'principal', 'Menu principal' );
     }
?>
```

Encore une fois, si vous êtes sûr de n'utiliser que WordPress 3.x, vous pouvez supprimer le test et utiliser directement register\_nav\_menu( ).

Après tout ça, affichez votre blog et vous allez voir une magnifique en-tête 😛 ! Sans aucun style... Mais admettez-le, c'est déjà bien !

Allez, maintenant que vous commencez à comprendre les rouages de WordPress, [passons à l'étape supérieure](/archives/creer-un-theme-wordpress-7-les-articles) !

### Sommaire du tutoriel

1.  [Introduction](/archives/creer-un-theme-wordpress-1-introduction)
2.  [Installation](/archives/creer-un-theme-wordpress-2-installation)
3.  [L'architecture des fichiers](/archives/creer-un-theme-wordpress-3-larchitecture-des-fichiers)
4.  [Informations sur le thème](/archives/creer-un-theme-wordpress-4-informations-sur-le-theme)
5.  [La mise en page générale](/archives/creer-un-theme-wordpress-5-la-mise-en-page-generale)
6.  L'en-tête de page (on y est !)
7.  [Les articles](/archives/creer-un-theme-wordpress-7-les-articles)
8.  [Articles et pages seuls](/archives/creer-un-theme-wordpress-8-articles-et-pages-seuls)
9.  [Les commentaires](/archives/creer-un-theme-wordpress-9-les-commentaires)
10.  [La barre latérale](/archives/creer-un-theme-wordpress-10-la-barre-laterale)
11.  [Le pied de page](/archives/creer-un-theme-wordpress-11-le-pied-de-page)