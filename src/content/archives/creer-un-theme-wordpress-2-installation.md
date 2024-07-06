---
title: Créer un thème WordPress – 2 – Installation
date: 2010-08-27T17:43:10+00:00
---

Pour pouvoir créer notre thème en toute sérénité, nous allons commencer par installer tout ce qu'il nous faut en local. Il va nous falloir un serveur web, WordPress bien entendu, ainsi qu'un peu de contenu pour tester tout ça...

## Un serveur web

Personnellement, j'utilise Wamp, sous Windows, qui est très simple à mettre en place. Cette solution regroupe un serveur web (Apache), un serveur MySql et Php. Attention, Wamp est parfait pour une utilisation locale car il n'y a rien à configurer pour un fonctionnement normal, mais il n'est pas adapté à une utilisation en production. Vous trouverez tout ce dont vous avez besoin pour comprendre et installer Wamp [sur cette page](http://www.wampserver.com/presentation.php). Par la suite, je considérerai que vous avez installé Wamp dans le dossier par défaut : _C:/wamp/_.

## WordPress

Nous allons travailler sur la version 3 ou supérieure de WordPress. Vous pouvez la télécharger (en français) [sur cette page](http://www.wordpress-fr.net/telechargements). Une fois téléchargée, il vous suffit d'extraire l'archive dans le répertoire de travail de Wamp : _C:/wamp/www/_. Maintenant, vous devez voir dans ce répertoire un dossier "wordpress". Il ne vous reste plus qu'à installer WordPress, c'est à dire créer un base de données, indiquer le nom et la description du blog etc. Pour ce faire, lancez Wamp, puis rendez vous à l'adresse _http://localhost/wordpress/_ dans votre navigateur. Vous n'avez plus qu'à suivre les étapes de l'installation ;).

## Du contenu

Pour pouvoir tester correctement les avancées de votre thème, il vous faut du contenu dans votre blog; des articles, des pages, des commentaires, des catégories... Il existe un tas de plugins qui font ça très bien. Personnellement, j'utilise [WP Dummy content](http://wordpress.org/extend/plugins/wp-dummy-content/), qui est simple d'utilisation et paramétrable à souhait. Voilà ! Avec tout ça, vous avez une installation de WordPress toute fraîche et remplie d'articles extraordinaires 😛 !

Maintenant, intéressons-nous à [l'architecture des fichiers dans WordPress](/archives/creer-un-theme-wordpress-3-larchitecture-des-fichiers)...

### Sommaire du tutoriel

1.  [Introduction](/archives/creer-un-theme-wordpress-1-introduction)
2.  Installation (on y est !)
3.  [L'architecture des fichiers](/archives/creer-un-theme-wordpress-3-larchitecture-des-fichiers)
4.  [Informations sur le thème](/archives/creer-un-theme-wordpress-4-informations-sur-le-theme)
5.  [La mise en page générale](/archives/creer-un-theme-wordpress-5-la-mise-en-page-generale)
6.  [L'en-tête de page](/archives/creer-un-theme-wordpress-6-len-tete-de-page)
7.  [Les articles](/archives/creer-un-theme-wordpress-7-les-articles)
8.  [Articles et pages seuls](/archives/creer-un-theme-wordpress-8-articles-et-pages-seuls)
9.  [Les commentaires](/archives/creer-un-theme-wordpress-9-les-commentaires)
10.  [La barre latérale](/archives/creer-un-theme-wordpress-10-la-barre-laterale)
11.  [Le pied de page](/archives/creer-un-theme-wordpress-11-le-pied-de-page)