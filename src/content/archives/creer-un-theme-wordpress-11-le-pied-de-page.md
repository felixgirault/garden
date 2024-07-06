---
title: Créer un thème WordPress – 11 – Le pied de page
date: 2010-10-02T16:47:11+00:00
---

Et voilà, on arrive au bout de ce tutoriel WordPress ! Cette partie sera très, très courte, étant donné le peu de choses que l'on trouve en général dans le pied de page. Ici, on va juste y ajouter une ligne de copyright, et des scripts à charger en fin de page. Ensuite, votre thème sera totalement fonctionnel et assez complet pour commencer sérieusement son design !

Je vous présente donc le dernier code du tuto ! Vous n'avez plus qu'à le placer dans _footer.php_ :

```html
</div> <!-- fermeture de #page --> 

		<div id="pied-page">
			<!--
				La petite ligne usuelle de copyright...
			-->
			<p>Copyright &copy; 2010</p>
		</div>
          
		<!--
			wp_footer( ) se charge d'insérer tous les scripts
			à charger en bas de page.
			Cette position permet d'éviter de ralentir le
			chargement de la page.
		-->
		<?php wp_footer( ); ?>
	</body>
</html>
```

Ouf ! Tout est fini !

Maintenant, je vous laisse le soin de styliser un peu tout ça, et si vous en avez le courage, je vous retrouve dans la seconde partie dédiée à la création d'un thème en Html5 ! _(à venir...)_

## Sommaire du tutoriel

1.  [Introduction](/archives/creer-un-theme-wordpress-1-introduction)
2.  [Installation](/archives/creer-un-theme-wordpress-2-installation)
3.  [L'architecture des fichiers](/archives/creer-un-theme-wordpress-3-larchitecture-des-fichiers)
4.  [Informations sur le thème](/archives/creer-un-theme-wordpress-4-informations-sur-le-theme)
5.  [La mise en page générale](/archives/creer-un-theme-wordpress-5-la-mise-en-page-generale)
6.  [L'en-tête de page](/archives/creer-un-theme-wordpress-6-len-tete-de-page)
7.  [Les articles](/archives/creer-un-theme-wordpress-7-les-articles)
8.  [Articles et pages seuls](/archives/creer-un-theme-wordpress-8-articles-et-pages-seuls)
9.  [Les commentaires](/archives/creer-un-theme-wordpress-9-les-commentaires)
10.  [La barre latérale](/archives/creer-un-theme-wordpress-10-la-barre-laterale)
11.  Le pied de page (on y est !)