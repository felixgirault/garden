// @see https://gist.github.com/max10rogerio/c67c5d2d7a3ce714c4bc0c114a3ddc6e
export const slugify = (string: string, separator = '-') =>
	string
		.toString()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9 ]/g, '')
		.replace(/\s+/g, separator);
