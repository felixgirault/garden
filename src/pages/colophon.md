---
layout: ../layouts/MarkdownLayout.astro
title: Colophon
breadcrumbs:
   - title: slash pages
     url: /slash
---

# Colophon

This website is build using the following technologies:

-  [Astro](https://astro.build) as a minimal foundation for
   routing, content authoring,
   <abbr title="Static Site Generation">SSG</abbr>, …
-  [Slice](https://slice-gui.netlify.app) to adjust the axes of
   variables fonts
-  [fontTools](https://fonttools.readthedocs.io) to subset fonts
-  [fontaine](https://github.com/unjs/fontaine) to provide font
   fallbacks with adjusted metrics
-  [Deezer API](https://developers.deezer.com/api) to retrieve
   information about [music albums](/albums)
-  [Material color utilities](https://github.com/material-foundation/material-color-utilities)
   to extract dominant and accent colors of
   [albums covers](/albums)
-  [Spotify API](https://developer.spotify.com/documentation/web-api)
   to retrieve information about [music tracks](/moodboard)
-  [curve-interpolator](https://github.com/kjerandp/curve-interpolator)
   to sample points on 2D curves on the [moodboard](/moodboard)
-  [kd-tree-javascript](https://github.com/ubilabs/kd-tree-javascript)
   to search for [music tracks in a 2D space](/moodboard)
-  [CSS painting API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Painting_API/Guide)
   to draw the generative background of the pages (on
   [supported browsers](https://caniuse.com/css-paint-api))
-  [Tabler icons](https://tabler.io/icons)
