---
title: Créer un thème WordPress – 8 – Articles et pages seuls
date: 2010-09-09T16:45:47+00:00
---

Dans cette partie, nous allons traiter les choses un peu plus en finesse. Dans la partie précédente, nous avions rempli notre _index.php_ pour afficher une liste d'articles. Ici, nous allons travailler sur les fichiers _single.php_ (article unique) et _page.php_ (page unique).

Comme je vous le disais, le fichier _index.php_ représente la plus grosse part du travail. Maintenant, nous allons nous contenter de le reprendre en y apportant de légères modifications. Je vais donc vous demander de recopier tout le contenu de de _index.php_ dans les fichiers _single.php_ et _page.php_. Ensuite, commençons 🙂 !

## Article seul

Ici ça va être très, très simple. Voilà juste en dessous le résultat que nous allons obtenir. Comme d'habitude, les explications sont fournies en commentaires de manière à faciliter la lecture et pouvoir suivre le tuto en copiant le code dans votre éditeur préféré ;). Seules les nouveautés sont commentées ici.

```html
<?php get_header( ); ?>

<div id="contenu">
     <?php if ( have_posts( )): ?>
          <?php while ( have_posts( )): ?>
               <?php the_post( ); ?>

               <div id="article-<?php the_ID( ); ?>" <?php post_class( ); ?>>
                    <div class="en-tete-article">
                         <h2><a href="<?php the_permalink( ); ?>" title="<?php the_title( ); ?>"><?php echo the_title( ); ?></a></h2>

                         <p>
                              Par <?php the_author_posts_link( ); ?>
                              le <?php the_time( get_option( 'date_format' )); ?>
                              dans <?php echo the_category( ', ' ); ?>
                              <?php edit_post_link( 'Modifier', ' | ' ); ?>
                         </p>
                    </div>

                    <div class="contenu-article">
                         <?php if ( function_exists( 'has_post_thumbnail' ) && has_post_thumbnail( )): ?>
                              <a href="<?php the_permalink( ); ?>" title="<?php the_title( ); ?>">
                                   <?php the_post_thumbnail( array( 80, 80 )); ?>
                              </a>
                         <?php endif; ?>

                         <?php the_content( 'Lire la suite &raquo;' ); ?>
						 
						<!--
						     Cette fonction propose des liens entre pages pour les articles paginés.
							Elle prends un tableau d'options en paramètre qui détermine
                                   comment formatter les liens. Ici j'utilise :
                                   - before : code avant les liens.
                                   - after : code après les liens.
                                   - nextpagelink : texte du lien vers la page suivante.
                                   - previouspagelink : texte du lien vers la page précédente.
                                   Ce n'est qu'une partie des options, parlez-en avec la doc !
						-->
						<?php
						     wp_link_pages( array(
							     'before' => '<span class="pages">Pages: ',
								'after' => '</span>',
                                        'nextpagelink' => 'Page suivante',
                                        'previouspagelink' => 'Page précédente'
                                   ));
                              ?>
                    </div>

                    <div class="pied-article">
                         <?php the_tags( 'Tags : ', ', ', ' | ' ); ?>
                         <?php comments_popup_link( 'Laisser un commentaire', '1 Commentaire', '% Commentaires' ) ?>
                    </div>
               </div>
          <?php endwhile; ?>
		  
          <div id="navigation">
               <!--
                    A priori, le nom des fonctions parle de lui-même.
                    Elles acceptent toutes les deux deux paramètre :
                    - le format du lien. Ici, le lien seul représenté par %link.
				- le titre du lien. %title est remplacé par le titre de l'article.
				Ces fonctions sont paramétrables a volonté pour afficher par exemple
				les articles d'une catégorie en particulier etc. Je vous laisse visiter la doc !
               -->
               <span class="precedent"><?php previous_post_link( '%link', '&laquo; %title' ); ?></span>
               <span class="suivant"><?php next_post_link( '%link', '%title &raquo;' ); ?></span>
          </div>
          
          <!--
               Sûrement le plus important, on inclus les commentaires !
               En fait, cette fonction inclus simplement le fichier 'comments.php'.
               Nous verrons le contenu de ce fichier dans la partie suivante.
          -->
          <?php comments_template( ); ?>
     <?php else: ?>

          <!--
               Si il n'y a aucun article à afficher, on peut écrire un petit message
               ou proposer un formulaire de recherche par exemple.
          -->
     
     <?php endif; ?>
</div>

<?php get_sidebar( ); ?>
<?php get_footer( ); ?>
```

Voilà, assez peu de changements. Pour vous faire plaisir, voici les nouvelles fonctions 🙂 :

[wp\_link\_pages( )](http://codex.wordpress.org/Function_Reference/wp_link_pages), [previous\_post\_link( )](http://codex.wordpress.org/Function_Reference/previous_post_link), [next\_post\_link( )](http://codex.wordpress.org/Function_Reference/next_post_link), [comments\_template( )](http://codex.wordpress.org/Function_Reference/comments_template).

## Page seule

Ici, c'est encore plus simple ! Tout est affaire de suppression. Imaginons une page à propos, ou contact. On se fiche totalement de savoir qui a écrit cette page, quand etc. Pas besoin non plus de commentaires. Personnellement, j'ai simplement supprimé tout ce qui me paraît superflu sur une page. Voyez de quoi vous avez besoin, et supprimez le reste 😉 ! Voici ma version :

```html
<?php get_header( ); ?>

<div id="contenu">
     <?php if ( have_posts( )): ?>
          <?php while ( have_posts( )): ?>
               <?php the_post( ); ?>

               <div id="article-<?php the_ID( ); ?>" <?php post_class( ); ?>>
                    <div class="en-tete-article">
                         <h2><a href="<?php the_permalink( ); ?>" title="<?php the_title( ); ?>"><?php echo the_title( ); ?></a></h2>
                         
                         <!-- Plus de méta-infos. -->
                    </div>

                    <div class="contenu-article">
                         <?php if ( function_exists( 'has_post_thumbnail' ) && has_post_thumbnail( )): ?>
                              <a href="<?php the_permalink( ); ?>" title="<?php the_title( ); ?>">
                                   <?php the_post_thumbnail( array( 80, 80 )); ?>
                              </a>
                         <?php endif; ?>

                         <?php the_content( 'Lire la suite &raquo;' ); ?>
                         
                         <!-- Plus de navigation entre pages. -->
                    </div>
                    
                    <!-- Plus de pied d'article. -->
               </div>
               
               <!-- Plus de navigation entre pages. -->
               
               <!-- Plus de commentaires. -->
          <?php endwhile; ?>
     <?php else: ?>

          <!--
               Si il n'y a aucun article à afficher, on peut écrire un petit message
               ou proposer un formulaire de recherche par exemple.
          -->
     
     <?php endif; ?>
</div>

<?php get_sidebar( ); ?>
<?php get_footer( ); ?>
```

C'est tout ! Maintenant, vous pouvez jeter un oeil à vos articles et pages seuls, tout devrait rouler ! [Vous prendrez bien quelques commentaires avec ceci](/archives/creer-un-theme-wordpress-9-les-commentaires) ?

### Sommaire du tutoriel

1.  [Introduction](/archives/creer-un-theme-wordpress-1-introduction)
2.  [Installation](/archives/creer-un-theme-wordpress-2-installation)
3.  [L'architecture des fichiers](/archives/creer-un-theme-wordpress-3-larchitecture-des-fichiers)
4.  [Informations sur le thème](/archives/creer-un-theme-wordpress-4-informations-sur-le-theme)
5.  [La mise en page générale](/archives/creer-un-theme-wordpress-5-la-mise-en-page-generale)
6.  [L'en-tête de page](/archives/creer-un-theme-wordpress-6-len-tete-de-page)
7.  [Les articles](/archives/creer-un-theme-wordpress-7-les-articles)
8.  Articles et pages seuls (on y est !)
9.  [Les commentaires](/archives/creer-un-theme-wordpress-9-les-commentaires)
10.  [La barre latérale](/archives/creer-un-theme-wordpress-10-la-barre-laterale)
11.  [Le pied de page](/archives/creer-un-theme-wordpress-11-le-pied-de-page)