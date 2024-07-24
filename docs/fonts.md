# Fonts

Fonts are subsetted via [fontTools](https://fonttools.readthedocs.io/) to include the strict necessary from english and french glyphs (see this [french character table](https://character-table.netlify.app/french/) for reference)

```
pyftsubset font.ttf \
	--unicodes="U+20-5F, U+61-7A, U+7C, U+A0, U+A7, U+A9, U+2010-2011, U+2013-2014, U+2018-2019, U+201C-201D, U+2020-2021, U+2026, U+2030, U+2032-2033, U+20AC" \
	--flavor="woff2" \
	--output-file="font.woff2"
```

Variable fonts are preprocessed via [Slice](https://slice-gui.netlify.app/docs/) to eliminate unnecessary axes.
