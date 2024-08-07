import {defineConfig} from 'astro/config';

const theme = await fetch(
	'https://raw.githubusercontent.com/felixgirault/grapes-theme/master/themes/Grapes-color-theme.json'
);

// https://astro.build/config
export default defineConfig({
	markdown: {
		shikiConfig: {
			theme: await theme.json()
		}
	}
});
