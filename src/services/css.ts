import {round} from './math';

type Easing = (t: number) => number;
type Stop = [x: number, y: number];

export const scrim = (ease: Easing, stopCount: number) => {
	const stops: Stop[] = [];
	const inc = 1 / stopCount;

	for (let i = 0; i < stopCount + 1; i++) {
		const x = ease(i * inc);
		const y = ease(x);
		stops.push([x, y]);
	}

	return stops;
};

export const scaleStops = (
	stops: Stop[],
	start: Stop,
	end: Stop
) =>
	stops.map<Stop>(([x, y]) => [
		start[0] + x * (end[0] - start[0]),
		start[1] + y * (end[1] - start[1])
	]);

const stopToCssStop = ([x, y]: Stop) =>
	`hsla(0 0% 0% / ${round(y)}) ${round(100 * x)}%`;

export const stopsToCssStops = (stops: Stop[]) =>
	stops.map(stopToCssStop).join(', ');
