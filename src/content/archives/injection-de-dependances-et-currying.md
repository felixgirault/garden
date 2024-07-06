---
title: Injection de dépendances et currying
date: 2016-04-17T20:18:09+00:00
---

Je travaille en ce moment sur un port d'[essence](https://github.com/essence/essence) en JavaScript, qui me sert de sandbox pour mieux comprendre la programmation fonctionnelle. Comme pour la librairie originale, je voulais conserver la possibilité de tout configurer par injection de dépendances.

La première idée qui m'est venue est d'utiliser des factory functions, de cette manière :

```javascript
function fetchUserFactory(fetch) {
  return function fetchUser(id) {
    return fetch('http://example.com/api/users/' + id);
  };
}
```

Ici, on déclare une factory qui prend en paramètre une fonction `fetch` pour récupérer des données depuis une API. Cette factory retourne une fonction qui récupère les données d'un utilisateur depuis son id, grâce à la fonction `fetch()`.

Voici comment on peut utiliser cette factory :

```javascript
const getUser = fetchUserFactory(fetch);
const user = getUser(12);
```

Tout cela marche comme prévu, mais les factories alourdissent considérablement le code quand on les retrouve autour de beaucoup de fonctions. Heureusement, le passage de paramètres par défaut à une fonction est un cas courant et on peut s'en sortir beaucoup plus simplement avec l'application partielle ou le currying.

D'abord, on commence par supprimer la factory, en ajoutant la dépendance en argument de la fonction :

```javascript
function fetchUser(fetch, id) {
  return fetch('http://example.com/api/users/' + id);
}
```

Ensuite, on peut utiliser différentes méthodes pour injecter la dépendance :

```javascript
import {partial, curry} from 'lodash';

// ces trois méthodes sont équivalentes
const getUser = fetchUser.bind(null, fetch);
const getUser = partial(fetchUser, fetch);
const getUser = curry(fetchUser)(fetch);

// finalement, l'usage est le même qu'avec la factory
const user = getUser(12);
```

Que ce soit avec [`bind()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind "Documentation de bind()"), [`partial()`](http://devdocs.io/lodash~4/index#partial "Documentation de partial()"), ou [`curry()`](http://devdocs.io/lodash~4/index#curry "Documentation de curry()"), on crée à chaque fois une version de `fetchUser()` où le premier argument est déjà configuré. On peut ensuite utiliser cette nouvelle fonction en ne passant que le second.

On arrive donc au même résultat qu'avec une factory, mais avec moins de bruit dans le code. L'avantage est que l'utilisateur peut choisir les arguments par défaut car ils ne sont plus dictés par la factory. On gagne aussi en simplicité puisque la fonction `fetchUser()` est directement utilisable et testable, n'étant plus "cachée" dans la factory.