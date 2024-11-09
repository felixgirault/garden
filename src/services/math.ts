// @see https://stackoverflow.com/a/48764436
export const round = (exp: number, places = 4) => {
	exp = Math.round(Number(`${exp}e+${places}`));
	return Number(`${exp}e-${places}`);
};

// @see https://stackoverflow.com/a/7616484/2391359
export const hashCode = (string: string) => {
	let hash = 0;
	let char;

	if (!string.length) {
		return hash;
	}

	for (let i = 0; i < string.length; i++) {
		char = string.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash |= 0;
	}

	return hash;
};
