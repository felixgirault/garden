import {CurveInterpolator, distance} from 'curve-interpolator';
import {random} from './math';

export type Point = [x: number, y: number];

export {distance};

export const interpolateSpline = (
	controlPoints: Point[],
	pointCount: number | ((length: number) => number)
): Point[] => {
	const interpolator = new CurveInterpolator(controlPoints, {
		tension: 0.2,
		alpha: 0.5
	});

	return interpolator.getPoints(
		typeof pointCount === 'function'
			? pointCount(interpolator.length)
			: pointCount
	);
};

export const randomPoints = (min = 2, max = 5): Point[] =>
	Array.from({length: random(min, max + 1)}, () => [
		Math.random(),
		Math.random()
	]);

export const makePath = (points: Point[]) => {
	const path = new Path2D();

	for (let i = 0; i < points.length; i++) {
		const [x, y] = points[i];

		if (i === 0) {
			path.moveTo(x, y);
		} else {
			path.lineTo(x, y);
		}
	}

	return path;
};
