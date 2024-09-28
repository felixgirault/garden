---
title: Pair hover & focus
tldr:
   You should always style the focus state alongside hover. This
   will allow users interacting with different peripherals to get
   the same level of information.
---

`:hover` has got to be one of the most used feature of CSS. It is
used mainly to provide hints of interactability, typically on
buttons, to provide additional context by triggering tooltips, to
disclose parts of the UI as in dropdown menus, and so on.

However, while being supported by every browser, it is not
supportive of every user. A lot of people don't use a mouse to
interact with web pages (think mobile users or people navigating
with a keyboard), and they won't be able to trigger hover states.

Fortunately, we can combine selectors to remedy this problem by
always styling hover and focus states together:

```css
button:hover,
button:focus {
	/* … */
}
```

Or with a more modern and concise approach:

```css
button:is(:hover, :focus) {
	/* … */
}
```

Conceptually, hover and focus are quite the same thing, they're
just not triggered the same way. As a rule of thumb, you should
always apply the same styles to both.
