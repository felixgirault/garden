---
title: Créer un thème WordPress – 4 – Informations sur le thème
date: 2010-08-28T13:41:58+00:00
---

Pour pouvoir trouver notre thème dans l'interface d'administration de WordPress, il va falloir le renseigner un peu, lui donner un nom, une description etc. Toutes ces informations doivent se trouver en commentaires dans le fichier _style.css_, en utilisant une syntaxe clé/valeur, un peu comme les fichiers _.ini_. Par la suite, cela vous sera très utile si vous voulez héberger votre thème sur WordPress.org. Concrètement, voici les clés (ou tags) que vous allez pouvoir renseigner :

*   _Author :_ nom de l'auteur.
*   _Description :_ description du theme. Pourquoi est-ce le meilleur du monde ? Quelles fonctionnalités hors du commun propose-t-il ?
*   _Status_
*   _Tags :_ utilisé pour définir rapidement votre thème, couleurs, menus, fonctionnalités particulières... Ces tags doivent être choisis dans [cette liste](http://wordpress.org/extend/themes/about/) (section _Theme tags_).
*   _Template_
*   _Theme Name :_ nom du theme.
*   _Theme URI :_ url du theme.
*   _Version :_ numéro de version.

Pour ce tutoriel, je ne vais renseigner que les tags _Author_, _Description_, et _Theme Name_, cela nous suffira amplement pour reconnaitre notre thème. Ajoutons donc tout ça dans le fichier _style.css_... _Code Css :_

```css
/**
 *   Theme Name: MonTheme
 *   Description: Mon premier theme WordPress qui envoie du bois
 *   Author: Moi-meme, en personne
 */
```

Si vous souhaitez ajouter un numéro de version etc, même principe : une nouvelle ligne sous la forme _Tag : valeur_. Maintenant, vous pouvez vous rendre dans la gestion des thèmes de WordPress où vous devriez voir apparaître votre thème. Activez-le. Logiquement, vous n'allez rien voir en allant sur votre blog. C'est bon signe, votre thème a bien été activé !

## Note

Pour ceux qui ont déjà conçu un design sous Photoshop par exemple, vous pouvez ajouter une capture d'écran de votre thème qui sera affichée dans l'interface d'administration. Pour ce faire, vous devez créer une image nommée _screenshot.png_, que vous placerez dans le dossier _montheme/_. Attention, cette image doit avoir des dimensions précises : 300 pixels de largeur pour 225 de hauteur. Une fois l'image enregistrée, actualisez le panneau d'administration des thèmes et vous devriez voir un aperçu de votre design.

Allez ! Allons voir [la mise en page de notre futur thème](/archives/creer-un-theme-wordpress-5-la-mise-en-page-generale) !

### Sommaire du tutoriel

1.  [Introduction](/archives/creer-un-theme-wordpress-1-introduction)
2.  [Installation](/archives/creer-un-theme-wordpress-2-installation)
3.  [L'architecture des fichiers](/archives/creer-un-theme-wordpress-3-larchitecture-des-fichiers)
4.  Informations sur le thème (on y est !)
5.  [La mise en page générale](/archives/creer-un-theme-wordpress-5-la-mise-en-page-generale)
6.  [L'en-tête de page](/archives/creer-un-theme-wordpress-6-len-tete-de-page)
7.  [Les articles](/archives/creer-un-theme-wordpress-7-les-articles)
8.  [Articles et pages seuls](/archives/creer-un-theme-wordpress-8-articles-et-pages-seuls)
9.  [Les commentaires](/archives/creer-un-theme-wordpress-9-les-commentaires)
10.  [La barre latérale](/archives/creer-un-theme-wordpress-10-la-barre-laterale)
11.  [Le pied de page](/archives/creer-un-theme-wordpress-11-le-pied-de-page)