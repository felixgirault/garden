---
title: Créer un thème WordPress – 9 – Les commentaires
date: 2010-09-28T18:26:58+00:00
---

Dans cette partie, nous allons ajouter un petit peu de vie et d'interactivité à notre thème en y ajoutant des commentaires.

Un petit peu d'histoire tout d'abord... Avant, le code dédié aux commentaires était semblable à celui de l'affichage des articles. Depuis la version 3, WordPress nous propose une fonction toute faite pour afficher la liste des commentaires sur un articles. Il est fortement recommandé de l'utiliser, non seulement parce qu'elle vous simplifie le travail, mais aussi particulièrement si vous souhaitez héberger votre thème sur _wordpress.org_. De même, il existe une fonction pour l'affichage d'un formulaire de réponse.

Rassurez-vous, ces fonctions sont totalement paramétrables, vous en faîtes ce que vous voulez !

## Préparatifs

Tout d'abord, je vais vous présenter la structure générale du fichier, afin que vous sachiez ou placer les différentes parties que nous allons aborder. Un peu de code ?

```html
<?php
     /**
      *   On teste d'abord si le fichier est bien inclus depuis un autre, et pas chargé
      *   directement, pour des raisons de sécurité. Si c'est le cas, on arrête le script.
      */
     if ( 'comments.php' == basename( $_SERVER['SCRIPT_FILENAME'])) {
          die ( 'Ne pas charger cette page directement,  merci !' );
     }
?>

<!--
     Si l'article est protégé par mot de passe, on affiche aucun commentaire
     mais un petit message d'information.
-->
<?php if ( !empty( $post->post_password ) && ( $_COOKIE['wp-postpass_' . COOKIEHASH ] != $post->post_password )): ?>
     <div id="commentaires">
          <h3>Cet article est protégé par mot de passe</h3>
          <p>Entrez le mot de passe pour voir les commentaires</p>
     </div>

<!--
     Dans le cas contraire, on affiche la liste des commentaires.
-->
<?php else: ?>
     <div id="commentaires">
          <h3>Commentaires</h3>

          <div id="statut-commentaires">
               <!--
                    Des informations sur le statut des commentaires et pings (ouverts, fermés)
               -->
          </div>

          <div id="liste-commentaires">
               <!--
                    La liste des commentaires
               -->
          </div>

          <div id="formulaire-commentaire">
               <!--
                    Ici, on trouvera le formulaire d'ajout de commentaires.
               -->
          </div>
     </div>
<?php endif; ?>
```

## Statut des commentaires

Avant d'afficher la liste, nous allons informer l'internaute de ce qu'il peut voir ou faire. Par exemple, l'informer que les commentaires sont clos. Pour cette fois, le code n'est pas commenté car il est très simple à comprendre. Par contre, vous y gagnerez en lisibilité en le copiant dans votre éditeur (à placer dans la _div#statut-commentaires_).

```html
<?php if ( comments_open( ) && pings_open( )): ?>
     <p>Vous pouvez <a href="#reponse" title="poster un commentaire">poster un commentaire</a> ou laisser un trackback &agrave; <a href="<?php trackback_url( ) ?>" title="URL de trackback pour votre article">cette adresse</a>.</p>
<?php elseif ( !comments_open( ) && pings_open( )): ?>
     <p>Les commentaires sont ferm&eacute;s, mais vous pouvez laisser un trackback &agrave; <a href="<?php trackback_url( ) ?>" title="URL de trackback pour votre article">cette adresse</a>.</p>
<?php elseif ( comments_open( ) && !pings_open( )): ?>
     <p>Les trackbacks sont ferm&eacute;s, mais vous pouvez <a href="#reponse" title="poster un commentaire">poster un commentaire</a>.</p>
<?php else: ?>
     <p>Les commentaires et trackbacks sont ferm&eacute;s.</p>
<?php endif; ?>
```

Quelques explications tout de même... [comments\_open( )](http://codex.wordpress.org/Function_Reference/comments_open) nous informe du statut des commentaires sur l'article (ouverts ou fermés). De même, [pings\_open( )](http://codex.wordpress.org/Function_Reference/pings_open) nous informe sur le statut des trackbacks (ou pings). Pour ce qui est des liens, _#reponse_ est une ancre sur le formulaire de réponse, et [trackback\_url( )](http://codex.wordpress.org/Function_Reference/trackback_url) affiche l'url de trackback pour l'article courant.

## Liste des commentaires

Passons aux commentaires eux-mêmes. WordPress fournit une fonction qui nous simplifie grandement la vie : [wp\_list\_comments( )](http://codex.wordpress.org/Function_Reference/wp_list_comments). Encore une fois, elle est assez parlante. Elle affiche la liste des commentaires sur un article en fonction de certains paramètres. Par exemple, on peut demander une certaine profondeur de réponse, une mise en forme particulière, et autres [à voir sur la doc](http://codex.wordpress.org/Function_Reference/wp_list_comments).

Pour tester le rendu de cette fonction, vous pouvez insérer ce bout de code dans la _div#liste-commentaires_ :

```php
<ul>
     <?php wp_list_comments( ); ?>
</ul>
```

Ça marche tout seul ! Vérifiez que vous avez bien ajouté quelques commentaires pour le test... Comme nous souhaitons un peu plus de contrôle sur l'affichage (si, si je vous jure !), nous allons utiliser un paramètre très intéressant de _wp\_list\_comments( )_ : 'callback'. Il sert à définir une fonction qui sera appelée pour afficher un commentaire. Nous allons donc légèrement modifier l'appel de la fonction :

```php
<ul>
     <?php wp_list_comments( array( 'callback' => 'commentaire' )); ?>
</ul>
```

Voilà. À chaque commentaire, _wp\_list\_comments( )_ appellera la fonction _commentaire( )_, qui sera chargée d'afficher ce commentaire. Bien sûr, il nous reste encore à écrire cette fonction !

En toute logique, on va l'ajouter à notre fichier _functions.php_. Comme toujours, voici un code commenté que vous avez grand intérêt à recopier dans votre éditeur :

```html
<?php
     /**
      *   Notre fonction prends 3 paramètres :
      *   - le commentaire à afficher (un objet qui contient le titre, le contenu etc)
      *   - un tableau d'arguments divers comme la profondeur maximale de réponse, la taille de l'avatar...
      *     vous pouvez utiliser ce tableau pour contrôler plus finement certains aspects de l'affichage.
      *   - la profondeur actuelle de réponse
      */
     function commentaire( $comment, $args, $depth ) {

          /**
           *   Cette affectation permet d'utiliser des fonctions comme comment_text( ),
           *   comment_title( ) etc, qui utilisent la globale 'comment'.
           *   Personnellement, je trouve l'utilisation des globales peu recommandable,
           *   mais c'est comme ça, c'est WordPress !
           */
          $GLOBALS['comment'] = $comment;
?>

     <!--
          L'élément de liste qui contient le commentaire.
          Comme avec les articles, on attribue un id qu'on récupère avec comment_ID( ),
          et on génère des classes avec comment_class( ), même principe que body_class( )
          ou post_class( ) que l'on a déjà rencontrées.
     -->
     <li id="comment-<?php comment_ID( ); ?>" <?php comment_class( ); ?>>

          <!-- Le bloc d'en-tête du commentaire. -->
          <div class="en-tete-commentaire">

               <!-- comment_author_link( ) affiche le nom de l'auteur, avec un lien vers son site. -->
               <span class="auteur"><?php echo comment_author_link( ); ?></span>

               <!--
                    Méta-données sur le commentaire : date et lien d'édition.
                    Je ne m'étends pas dessus, c'est le même principe que pour les articles.
               -->
               <p class="meta-commentaire">
                    <?php comment_time( get_option( 'date_format' )); ?>
                    <?php edit_comment_link( 'Modifier', ' | ' ); ?>
               </p>
          </div>

          <div class="avatar">
               <?php
                    if ( function_exists( 'get_avatar' )) {
                         /**
                          *   Si la fonction get_avatar( ) existe (WordPress 3.x), on l'utilise pour afficher l'avatar.
                          *   Elle accepte deux paramètres :
                          *   - l'email de l'auteur
                          *   - la taille de l'avatar
                          */
                         echo get_avatar( $comment->comment_author_email, $args['avatar_size']);
                    } else {
                         /**
                          *   Pour les anciennes versions, on y va à l'ancienne !
                          *   On construit l'URL de l'avatar avec le md5 de l'email en minuscules, l'image par défaut (d), et la taille (s).
                          *   Ensuite, on affiche une image ayant cette Url pour source.
                          */
                         $gravatar = "http://www.gravatar.com/avatar/" . md5( strtolower( $comment->comment_author_email )) . '?d=mm&s=' . $args['avatar_size'];
                         echo '<img src="' . $gravatar . '" alt="avatar de l\'auteur" />';
                    }
               ?>
          </div>

          <div class="contenu-commentaire">
               <?php
                    /**
                     *   Si le commentaire n'est pas encore approuvé, on affiche un petit message, sinon son contenu.
                     */
                    if ( $comment->comment_approved == '0' ) {
                         echo '<em>Votre commentaire est en attente de mod&eacute;ration.</em>';
                    } else {
                         comment_text( );
                    }
               ?>
          </div>

          <div class="pied-article">
               <!--
                    comment_reply_link( ) affiche un lien de réponse au commentaire.
                    On lui passe en argument un tableau contenant la profondeur de réponse.
               -->
               <?php comment_reply_link( array( 'depth' => $depth )); ?>
          </div >

     <!--
          Les plus attentionnés aurons remarqué qu'il n'y a pas de balise fermante </li>.
          Il ne faut surtout pas l'ajouter, WordPress le fait tout seul.
          Pourquoi ? Au cas où il y aurait des commentaires en réponse à insérer avant de fermer la balise.
     -->

<?php
        }
?>
```

Avec tout ça, vous avez déjà une liste de commentaires solide ! Voici les nouvelles fonctions utilisées ici : [comment\_ID( )](http://codex.wordpress.org/Template_Tags/comment_ID), [comment\_class( )](http://codex.wordpress.org/Template_Tags/comment_class), [comment\_author\_link( )](http://codex.wordpress.org/Function_Reference/comment_author_link), [comment\_time( )](http://codex.wordpress.org/Function_Reference/comment_time), [edit\_comment\_link( )](http://codex.wordpress.org/Function_Reference/edit_comment_link), [get\_avatar( )](http://codex.wordpress.org/Function_Reference/get_avatar), [comment\_text( )](http://codex.wordpress.org/Function_Reference/comment_text) et [comment\_reply\_link( )](http://codex.wordpress.org/Function_Reference/comment_reply_link).

Ouf ! Après tous ça, il nous reste quand même une chose à rajouter, et pas des moindres... Un formulaire de réponse ! Eh oui, c'est bien beau d'afficher plein de jolis commentaires, mais encore faut-il pouvoir les écrire !

## Formulaire de réponse

Encore et toujours, WordPress nous propose une fonction fatale qui fait tout ce qu'on lui demande. Dans ce cas, c'est _comment\_form( )_. De la même manière que _wp\_list\_comments( )_, elle fonctionne sans arguments, mais on peut la personnaliser. Testez-la en plaçant ce code dans la _div#formulaire-commentaire_ :

```php
<?php comment_form( ); ?>
```

Efficace, non ? Personnellement, je trouve que cette fonction fais bien son travail. Je ne vais pas détailler la configuration de ce qu'elle affiche autant que pour les commentaires, mais voici tout de même 2 ou 3 lignes pour l'exemple :

```php
<?php
     comment_form(
          array(
               /**
                *   Ici, je change le texte affiché après le formulaire.
                */
               'comment_notes_after'  => '<p>Vous pouvez utiliser ces balises : <code>' . allowed_tags( ) . '</code></p>',

               /**
                *   Puis je change la valeur de l'attribut id du formulaire. 
                */
               'id_form' => 'formulaire',
          )
     );
?>
```

En procédant ainsi, vous pouvez changer à peu près n'importe quoi dans le formulaire. [Faîtes un tour sur la doc pour en savoir un peu plus !](http://codex.wordpress.org/Function_Reference/comment_form)

Finalement, nous y sommes ! On peut maintenant afficher un article complet, avec ses commentaires et la possibilité d'y répondre. [On se retrouve à l'étape suivante](/archives/creer-un-theme-wordpress-10-la-barre-laterale) ?

### Sommaire du tutoriel

1.  [Introduction](/archives/creer-un-theme-wordpress-1-introduction)
2.  [Installation](/archives/creer-un-theme-wordpress-2-installation)
3.  [L'architecture des fichiers](/archives/creer-un-theme-wordpress-3-larchitecture-des-fichiers)
4.  [Informations sur le thème](/archives/creer-un-theme-wordpress-4-informations-sur-le-theme)
5.  [La mise en page générale](/archives/creer-un-theme-wordpress-5-la-mise-en-page-generale)
6.  [L'en-tête de page](/archives/creer-un-theme-wordpress-6-len-tete-de-page)
7.  [Les articles](/archives/creer-un-theme-wordpress-7-les-articles)
8.  [Articles et pages seuls](/archives/creer-un-theme-wordpress-8-articles-et-pages-seuls)
9.  Les commentaires (on y est !)
10.  [La barre latérale](/archives/creer-un-theme-wordpress-10-la-barre-laterale)
11.  [Le pied de page](/archives/creer-un-theme-wordpress-11-le-pied-de-page)