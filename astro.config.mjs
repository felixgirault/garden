import {defineConfig} from 'astro/config';
import {FontaineTransform} from 'fontaine';

const theme = await fetch(
	'https://raw.githubusercontent.com/felixgirault/grapes-theme/master/themes/Grapes-color-theme.json'
);

// https://astro.build/config
export default defineConfig({
	markdown: {
		shikiConfig: {
			theme: await theme.json()
		}
	},
	vite: {
		plugins: [
			FontaineTransform.vite({
				fallbacks: ['verdana'],
				resolvePath: (id) =>
					new URL(`./public${id}`, import.meta.url)
			})
		]
	}
});
