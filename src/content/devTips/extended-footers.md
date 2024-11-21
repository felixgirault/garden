---
title: Extend footers to the bottom of pages
tldr:
   Use `border-image` to make the background extend over the edge
   of the viewport.
---

There is a common problem with footers: sometimes there is not
enough content above them to push them to the bottom of the page.

Here is an example where you can see a white area below the black
footer:

<div class="Demo">
	<div class="Demo-viewport">
		<p>Main<p><footer><p>Footer<p></footer>
	</div>
</div>

One solution is to use "sticky" footers, that would stick to the
bottom of a page is there is not enough content above.

<div class="Demo Demo--sticky">
	<div class="Demo-viewport">
		<p>Main<p><footer><p>Footer<p></footer>
	</div>
</div>

This is a perfectly valid solution, but it involves a bit of
additional markup and it visually separates the main content from
the footer.

Here I'm gonna talk about another solution: extending the footer
to the bottom.

<div class="Demo Demo--border-image">
	<div class="Demo-viewport">
		<p>Main<p><footer><p>Footer<p></footer>
	</div>
</div>

## Easy fix

```css
body {
	background: black;
}

main {
	background: white;
}
```

Disadvantage: flicker on reload

<div class="Demo Demo--body-background">
	<div class="Demo-viewport">
		<p>Main<p><footer><p>Footer<p></footer>
	</div>
</div>

<div class="Demo Demo--body-background">
	<div class="Demo-viewport">
		<p>Main<p><footer><p>Footer<p></footer>
	</div>
</div>

## Better fix

`border-image` is not a property one would use very often, but it
can be used in amazing ways to do all sorts of things. This
article sums it up very well with in-depth explanations and
varied examples:
[The Complex But Awesome CSS border-image Property](https://www.smashingmagazine.com/2024/01/css-border-image-property/).

To solve our problem, we could use a trick the author calls
"Infinite image decorations":

```css
footer {
	border-image: conic-gradient(black 0 0) 0 0 1 0 / 50% 0 /
		100vh 0;
}
```

I won't explain the inner workings of this code because you can
learn everything in the aforementionned article.

If you want to use it blindly, just know that it fills an area
below an element, with a color (`black` here) and a height
(`100vh` here to ensure it will always reach the bottom edge).

Note that this will not make the element overflow, so there will
not be any unneeded scrollbars.

Here is the previous demo with the `border-image` applied to the
footer:

<div class="Demo Demo--border-image">
	<div class="Demo-viewport">
		<p>Main<p><footer><p>Footer<p></footer>
	</div>
</div>

<style>
	.Demo {
		display: flex;
		justify-content: center;
		margin: 2rlh 0;
	}

	.Demo-viewport {
		margin-block-end: 1em;
		border: 1px solid var(--color-on-surface-variant);
		background: var(--color-surface-variant);
		color: var(--color-on-surface-variant);
		height: 10em;
		overflow: hidden;
		aspect-ratio: 16 / 9;
	}

	.Demo p {
		padding: 1em;
		margin: 0;
	}

	.Demo p:empty {
		display: none;
	}

	.Demo footer {
		background: var(--color-on-surface-variant);
		color: var(--color-surface-variant);
	}

	.Demo--sticky .Demo-viewport {
		display: flex;
		flex-direction: column;
	}

	.Demo--sticky p {
		flex-grow: 1;
	}

	.Demo--border-image footer {
		border-image: conic-gradient(var(--color-on-surface-variant) 0 0) 0 0 1 0 / 50% 0 / 100vh 0;
	}
</style>
