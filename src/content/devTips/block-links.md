---
title: Display standalone links as blocks
tldr:
   Use display block on standalone links to expand the clickable
   zone.
---

What I mean by standalone is links that have no surrounding text,
typically ones inside headings or menu items.

They work OK without any particular styling, but they can be a
bit quirky when they get displayed over multiple lines.

Try hovering your cursor between the lines of the following link,
you should see a dead zone where clicking doesn't do anything.

<div class="link">
	<a href="#">
		This is a link<br />
		spanning multiple lines
	</a>
</div>

This is due to the default `display: inline` style that makes the
clickable zone wrap each line individually but not covering the
whole line height, resulting in a small gap in between.

Fixing this is super simple, just use `display: block` on the
link:

<div class="link">
	<a href="#" style="display: block;">
		This is a <em>block</em> link<br />
		spanning multiple lines<br />
	</a>
</div>

With this fix, you also get the benefit of expanding the
clickable zone everywhere around the text, up to the borders of
the block.

A good starting point could be this rule targeting all links inside headings:

```css
:is(h1, h2, h3, h4, h5, h6) a {
  display: block;
}
```

<style>
	.link {
		margin-bottom: 1em;
		padding-inline: 2ch;
		line-height: 2;
		font-size: 2em;
	}
</style>
