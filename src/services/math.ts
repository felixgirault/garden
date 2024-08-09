// @see https://stackoverflow.com/a/48764436
export const round = (exp: number, places = 4) => {
	exp = Math.round(Number(`${exp}e+${places}`));
	return Number(`${exp}e-${places}`);
};
