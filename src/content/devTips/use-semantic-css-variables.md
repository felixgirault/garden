---
title: Use semantic CSS variables
tldr:
   Use two levels of abstraction for variables, raw values and
   semantic tokens.
---

Here is the most basic CSS declaration, setting a custom color
for links:

```css
a {
	color: #00f;
}
```

As with any programming langage, a good practice consists of
getting rid of
[magic values](<https://en.wikipedia.org/wiki/Magic_number_(programming)>)
to use constants instead. This makes it easier to reuse and
modify them across the code.

Considering the previous example, we could put the color value
inside a variable:

```css
:root {
	--color-blue: #00f;
}

a {
	color: var(--color-blue);
}

button {
	background: var(--color-blue);
}
```

We can now change the color at the root and see it reflected on
all links and buttons.

However, the variable name is tied to its current value, and
things could get confusing if we would assign a completely
different value to it:

```css
:root {
	/* this is stupid, but valid */
	--color-blue: yellow;
}
```

The solution is to introduce another level of variables, which
would describe their use instead of their value:

```css
:root {
	/* raw values */
	--color-blue: #00f;

	/* semantic tokens */
	--color-interactive: var(--color-blue);
}

a {
	color: var(--color-interactive);
}

button {
	background: var(--color-interactive);
}
```

We could use only a semantic level and get rid of the variables
holding the raw values, but I find it a little more
self-explanatory with those two levels.

The first one assigns a machine value (i.e an hexadecimal code)
to a human-readable representation (i.e blue).

The second one assigns a concrete concept to a more abstract one
(i.e. "blue color" to "color suggesting interactability").

Those two steps make more sense with a real-world example, where
the values might be less obvious to begin with:

```css
:root {
	/* raw values */
	--color-red: red;
	--color-blue: hsl(240, 100%, 50%);
	--color-blue-light: lch(
		from var(--color-blue) calc(l + 10) c h
	);

	/* semantic tokens */
	--color-interactive: var(--color-blue);
	--color-interactive-focused: var(--color-blue-light);
	--color-danger: var(--color-red);
}

a {
	color: var(--color-interactive);
}

a:is(:hover, :focus) {
	color: var(--color-interactive-focused);
}

button {
	background: var(--color-interactive);
}

button:is(:hover, :focus) {
	background: var(--color-interactive-focused);
}

input:invalid {
	border-color: var(--color-danger);
	color: var(--color-danger);
}
```

This makes the semantic tokens super readable, as they're almost
literal language:

```css
:root {
	/* the color for interactive elements is blue */
	--color-interactive: var(--color-blue);

	/* the color communicating danger is red */
	--color-danger: var(--color-red);
}
```
