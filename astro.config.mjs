import {defineConfig} from 'astro/config';

// https://astro.build/config
export default defineConfig({
	markdown: {
		shikiConfig: {
			theme: 'rose-pine'
		}
	},
	redirects: {
		'/astuces/boostez-votre-creativite':
			'/archives/boostez-votre-creativite',
		'/astuces/de-bons-defauts': '/archives/de-bons-defauts',
		'/astuces/gerer-vos-url-avec-cakephp':
			'/archives/gerer-vos-url-avec-cakephp',
		'/astuces/injection-de-dependances-et-currying':
			'/archives/injection-de-dependances-et-currying',
		'/astuces/optimisez-vos-affichages-avec-echo':
			'/archives/optimisez-vos-affichages-avec-echo',
		'/astuces/recuperer-une-page-web-en-php':
			'/archives/recuperer-une-page-web-en-php',
		'/astuces/utilisez-a-fond-votre-adresse-gmail':
			'/archives/utilisez-a-fond-votre-adresse-gmail',
		'/css/de-la-typographie-pour-le-web':
			'/archives/de-la-typographie-pour-le-web',
		'/css/de-vraies-grilles-pour-css':
			'/archives/de-vraies-grilles-pour-css',
		'/css/les-transitions-css3':
			'/archives/les-transitions-css3',
		'/css/retour-utilisateur-avec-ajax-et-jquery':
			'/archives/retour-utilisateur-avec-ajax-et-jquery',
		'/design/de-lidee-a-la-realisation':
			'/archives/de-lidee-a-la-realisation',
		'/design/more-perfect-typography':
			'/archives/more-perfect-typography',
		'/design/un-web-plus-vert': '/archives/un-web-plus-vert',
		'/developpement/des-conventions-utiles':
			'/archives/des-conventions-utiles',
		'/developpement/gerer-le-legacy-code':
			'/archives/gerer-le-legacy-code',
		'/developpement/refactoring': '/archives/refactoring',
		'/html/creer-un-theme-wordpress-1-introduction':
			'/archives/creer-un-theme-wordpress-1-introduction',
		'/html/creer-un-theme-wordpress-10-la-barre-laterale':
			'/archives/creer-un-theme-wordpress-10-la-barre-laterale',
		'/html/creer-un-theme-wordpress-11-le-pied-de-page':
			'/archives/creer-un-theme-wordpress-11-le-pied-de-page',
		'/html/creer-un-theme-wordpress-2-installation':
			'/archives/creer-un-theme-wordpress-2-installation',
		'/html/creer-un-theme-wordpress-3-larchitecture-des-fichiers':
			'/archives/creer-un-theme-wordpress-3-larchitecture-des-fichiers',
		'/html/creer-un-theme-wordpress-4-informations-sur-le-theme':
			'/archives/creer-un-theme-wordpress-4-informations-sur-le-theme',
		'/html/creer-un-theme-wordpress-5-la-mise-en-page-generale':
			'/archives/creer-un-theme-wordpress-5-la-mise-en-page-generale',
		'/html/creer-un-theme-wordpress-6-len-tete-de-page':
			'/archives/creer-un-theme-wordpress-6-len-tete-de-page',
		'/html/creer-un-theme-wordpress-7-les-articles':
			'/archives/creer-un-theme-wordpress-7-les-articles',
		'/html/creer-un-theme-wordpress-8-articles-et-pages-seuls':
			'/archives/creer-un-theme-wordpress-8-articles-et-pages-seuls',
		'/html/creer-un-theme-wordpress-9-les-commentaires':
			'/archives/creer-un-theme-wordpress-9-les-commentaires',
		'/html/differencier-les-commentaires-wordpress':
			'/archives/differencier-les-commentaires-wordpress',
		'/html/une-page-doptions-pour-votre-theme-wordpress':
			'/archives/une-page-doptions-pour-votre-theme-wordpress',
		'/humeur/french-tech': '/archives/french-tech',
		'/idees/des-applications-connectees':
			'/archives/des-applications-connectees',
		'/lutherie/brigitte': '/archives/brigitte',
		'/lutherie/hortense': '/archives/hortense',
		'/optimisation-2/indenter': '/archives/indenter',
		'/php/bad-practices': '/archives/bad-practices',
		'/video/la-creativite-selon-john-cleese':
			'/archives/la-creativite-selon-john-cleese'
	}
});