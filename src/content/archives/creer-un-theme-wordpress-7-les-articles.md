---
title: Créer un thème WordPress – 7 – Les articles
date: 2010-08-30T16:39:25+00:00
---

Cet article sera probablement la plus grosse partie de notre
tutoriel consacré à la création de thème WordPress. Nous allons
voir un paquet de choses nouvelles, essentielles au
fonctionnement d'un thème, aussi basique qu'il soit. Toute cette
partie sera axée autour du fichier _index.php_ qui, si vous vous
souvenez bien, est le fichier que WordPress affiche quand il n'en
trouve aucun plus spécifique.

Avant de commencer, un petit rappel de ce que vous devez avoir
dans votre _index.php_ :

```html
<?php get_header( ); ?>

<div id="contenu"></div>

<?php get_sidebar( ); ?> <?php get_footer( ); ?>
```

Maintenant, à vos claviers 😛 !

## The loop

Ça en impose comme titre non ? Alors concrètement, qu'est-ce que
le loop WordPress ? C'est tout simplement le composant le plus
important de votre thème. Comme son nom l'indique, c'est une
boucle, à l'intérieur de laquelle on va avoir des informations
sur l'article courant. C'est à dire qu'a chaque tour de boucle,
l'article courant va changer, et on va pouvoir afficher les
informations qui le concernent.

Pour mettre en place cette boucle, nous allons utiliser deux
fonctions : _have\_posts( )_, qui nous dira si il y a des
articles à afficher, et _the\_post( )_, expliquée en
commentaires. Voici un exemple :

```html
<?php if ( have_posts( )): ?>
<!--
          Si il y a des articles, on entame la boucle.
     -->
<?php while ( have_posts( )): ?>
<!--
               On utilise la fonction the_post( ) pour mettre à jour les données courantes.
               Toutes les fonctions que nous utiliserons plus tard pour afficher le titre de l'article etc
               ont besoin de cette fonction pour savoir sur quel article travailler.
          -->
<?php the_post( ); ?>

<!--
               C'est ici que nous allons écrire le code pour afficher les informations
               de l'article courant : titre, auteur, contenu etc.
          -->

<?php endwhile; ?> <?php else: ?>

<!--
          Si il n'y a aucun article à afficher, on peut écrire un petit message
          ou proposer un formulaire de recherche par exemple.
     -->

<?php endif; ?>
```

Avec ce code à placer dans la div#contenu, nous sommes prêts pour
la suite...

## Afficher les articles

On va utiliser une structure simple pour chaque article, que
voici :

- En-tête

   - Titre
   - Auteur
   - Date de publication
   - Catégories

- Corps de l'article

   - Image à la une, ou "thumbnail" en angliche
   - Texte d'introduction ou texte complet

- Pied

   - Tags
   - Nombre de commentaires

Evidemment, je ne vous impose rien. Si vous préférez montrer les
commentaires dans l'en-tête par exemple, ce ne sera que l'affaire
d'une ligne à déplacer ;).

Voyons maintenant concrètement ce que ça donne (nous allons
travailler entre _the\_post( )_ et _endwhile_).

Une petite note... Comme vous allez le remarquer, on a affaire à
un GROS morceau de code... Alors un conseil, copiez le dans votre
éditeur préféré, profitez-en en pleine largeur, et bidouillez,
testez les fonctions et leurs paramètres, changez l'ordre des
éléments, bref, comprenez avec votre clavier !

Quand vous aurez compris, virez les commentaires et vous allez
respirer un peu ;).

```html
<!--
     On commence par deux fonctions intéressantes ;).
     the_ID( ) affiche simplement l'identifiant de l'article courant.
     post_class( ) agit comme body_class( ) que nous avons déjà utilisée.
     Cette fonction ajoute des classes à la div pour faciliter le design.
-->
<div id="article-<?php the_ID( ); ?>" <?php post_class( ); ?>>
     <div class="en-tete-article">
          <!--
               Rien d'extraordinaire, pour the_title( ), qui affiche le titre de l'article.
               the_permalink( ), quand à lui, affiche l'url de l'article. On l'utilise pour faire un lien vers ce dernier.
          -->
          <h2><a href="<?php the_permalink( ); ?>" title="<?php the_title( ); ?>"><?php echo the_title( ); ?></a></h2>

          <p>
               <!--
                    the_author_posts_link( ) affiche un lien vers une page qui liste tous les articles de l'auteur.
                    Le nom de l'auteur est utilisé comme texte du lien. On aura donc quelque chose comme "Par toto".
               -->
               Par <?php the_author_posts_link( ); ?>

               <!--
                    La fonction the_time( ) est utilisée pour afficher une date dans un format spécifié en paramètre.
                    Ici, on récupère ce format grâce à la fonction get_option( ) qui renvoie le format défini par l'admin.
               -->
               le <?php the_time( get_option( 'date_format' )); ?>

               <!--
                    Ensuite, on affiche les catégories de l'article grâce à the_category( ).
                    Le paramètre est le texte à utiliser comme séparateur si il y a plusieurs catégories.
                    Ici, on aura une liste du style : "catégorie1, catégorie2, catégorie3".
               -->
               dans <?php echo the_category( ', ' ); ?>

               <!--
                    Dernière chose, on ajoute un lien de modification de l'article, visible seulement par le rédacteur.
                    Le premier paramètre est le texte du lien, le deuxième un texte à placer avant.
                    Ici, on obtiendra " | Modifier".
               -->
               <?php edit_post_link( 'Modifier', ' | ' ); ?>
          </p>
     </div>

     <div class="contenu-article">
          <!--
               Pour pouvoir afficher l'image à la une, il faut tester si WordPress supporte cette fonction,
               ce qui est fait grâce à function_exists( ), puis tester si l'article possède une telle image,
               grâce à has_post_thumbnail( ).
          -->
          <?php if ( function_exists( 'has_post_thumbnail' ) && has_post_thumbnail( )): ?>
               <!--
                    On utilise le même lien que sur le titre pour l'image. Un clic dessus renverra vers l'article.
                    the_post_thumbnail( ) est chargée d'afficher une balise <img> contenant l'image à la une.
                    Le tableau passé en paramètre sert à définir la taille de l'image, ici 80*80.
               -->
               <a href="<?php the_permalink( ); ?>" title="<?php the_title( ); ?>">
                    <?php the_post_thumbnail( array( 80, 80 )); ?>
               </a>
          <?php endif; ?>

          <!--
               On affiche le contenu de l'article jusqu'à la balise more.
               Si elle est présente, la fonction the_content( ) affichera un lien
               vers l'article complet avec le texte passé en paramètre.
          -->
          <?php the_content( 'Lire la suite &raquo;' ); ?>
     </div>

     <div class="pied-article">
          <!--
               Comme son nom l'indique, the_tags affiche la liste des tags associés à l'article.
               Le 1er paramètre est un texte à afficher avant la liste, le 2e un séparateur,
               et le 3e un texte à afficher après.
          -->
          <?php the_tags( 'Tags : ', ', ', ' | ' ); ?>

          <!--
               Pour finir, on affiche en lien le nombre de commentaire. Voici le rôle de chaque paramètre :
               - 1er : texte du lien quand il n'y a pas de commentaires.
               - 2e : texte quand il n'y a qu'un commentaire.
               - 3e : texte quand il y a x commentaires (% est remplacé par le nombre)
          -->
          <?php comments_popup_link( 'Laisser un commentaire', '1 Commentaire', '% Commentaires' ) ?>
     </div>
</div>
```

Maintenant, juste après le _endwhile_, on va ajouter un moyen de
naviguer entre les pages :

```html
<!--
     On récupère le nombre de pages depuis l'objet wp_query, qui gère les requêtes dans WordPress.
-->
<?php global $wp_query; $total_pages = $wp_query->max_num_pages;
?>

<!--
     Si on a plusieurs pages, on affiche les liens de navigation.
-->
<?php if ( $total_pages > 1 ): ?>
<div id="navigation">
	<!--
               A priori, le nom des fonctions parle de lui-même.
               Elles acceptent toutes les deux un paramètre, le texte du lien.
          -->
	<span class="anciens">
		<?php next_posts_link( '&laquo; Articles plus anciens' ); ?>
	</span>
	<span class="recents">
		<?php previous_posts_link( 'Articles plus r&eacute;cents &raquo;' ); ?>
	</span>
</div>
<?php endif; ?>
```

Et un petit récapitulatif des fonctions, un !

[the\_ID( )](http://codex.wordpress.org/Function_Reference/the_ID),
[post\_class( )](http://codex.wordpress.org/Template_Tags/post_class),
[the\_permalink( )](http://codex.wordpress.org/Function_Reference/the_permalink),
[the\_title( )](http://codex.wordpress.org/Function_Reference/the_title),
[the\_author\_posts\_link( )](http://codex.wordpress.org/Function_Reference/the_author_posts_link),
[the\_time( )](http://codex.wordpress.org/Function_Reference/the_time),
[get\_option( )](http://codex.wordpress.org/Function_Reference/get_option),
[the\_category( )](http://codex.wordpress.org/Function_Reference/the_category),
[edit\_post\_link( )](http://codex.wordpress.org/Function_Reference/edit_post_link),
[has\_post\_thumbnail( )](http://codex.wordpress.org/Function_Reference/has_post_thumbnail),
[the\_post\_thumbnail( )](http://codex.wordpress.org/Function_Reference/the_post_thumbnail),
[the\_content( )](http://codex.wordpress.org/Function_Reference/the_content),
[the\_tags( )](http://codex.wordpress.org/Function_Reference/the_tags),
[comments\_popup\_link( )](http://codex.wordpress.org/Function_Reference/comments_popup_link),
[next\_posts\_link( )](http://codex.wordpress.org/Function_Reference/next_posts_link),
[previous\_posts\_link( )](http://codex.wordpress.org/Function_Reference/previous_posts_link).

Ouf ! Après tout ce travail, vous avez bien mérité un résultat 😉
! Complétez votre fichier _index.php_ et allez sur la page
d'accueil de votre blog, enfin du contenu !! En plus, grâce au
système de fallback de WordPress, votre fichier _index.php_ va
être utilisé partout, et fonctionner ! Mais pas si vite... Vous
avez de la chance, il nous reste un détail à régler 😛 !

Si vous allez maintenant modifier un article, vous ne pourrez pas
ajouter d'image à la une. Comme pour _wp\_nav\_menu( )_, il va
falloir dire à WordPress que votre thème supporte cette
fonctionnalité. Rassurez-vous, dans 3 lignes vous avez terminé
;). Reprenez votre fichier functions.php, et ajoutez-y ceci :

```php
<?php
     /**
      *   Si WordPress supporte l'ajout de fonctionnalités,
      *   on propose le support des images à la une.
      */
     if ( function_exists( 'add_theme_support' )) {
          add_theme_support( 'post-thumbnails' );
     }
?>
```

Voilà, c'est fini ! Retournez éditer un article et vous verrez
que cette fonctionnalité a bien été prise en compte par notre ami
WordPress ;).

Allez, je l'admet, je vous dois bien une petite pause :)... Mais
après,
[au boulot](/archives/creer-un-theme-wordpress-8-articles-et-pages-seuls)
!

### Sommaire du tutoriel

1. [Introduction](/archives/creer-un-theme-wordpress-1-introduction)
2. [Installation](/archives/creer-un-theme-wordpress-2-installation)
3. [L'architecture des fichiers](/archives/creer-un-theme-wordpress-3-larchitecture-des-fichiers)
4. [Informations sur le thème](/archives/creer-un-theme-wordpress-4-informations-sur-le-theme)
5. [La mise en page générale](/archives/creer-un-theme-wordpress-5-la-mise-en-page-generale)
6. [L'en-tête de page](/archives/creer-un-theme-wordpress-6-len-tete-de-page)
7. Les articles (on y est !)
8. [Articles et pages seuls](/archives/creer-un-theme-wordpress-8-articles-et-pages-seuls)
9. [Les commentaires](/archives/creer-un-theme-wordpress-9-les-commentaires)
10.   [La barre latérale](/archives/creer-un-theme-wordpress-10-la-barre-laterale)
11.   [Le pied de page](/archives/creer-un-theme-wordpress-11-le-pied-de-page)
