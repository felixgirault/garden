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

// Smooths the path by curving through the midpoints of each
// segment, using the points themselves as control points.
export const makePath = (points: Point[]) => {
	const path = new Path2D();

	if (!points.length) {
		return path;
	}

	path.moveTo(...points[0]);

	for (let i = 1; i < points.length - 1; i++) {
		const [x, y] = points[i];
		const [nx, ny] = points[i + 1];
		path.quadraticCurveTo(x, y, (x + nx) / 2, (y + ny) / 2);
	}

	if (points.length > 1) {
		path.lineTo(...points.at(-1)!);
	}

	return path;
};

// The angle at b is acute when the dot product of ba and bc is
// positive.
export const isAngleAcute = (a: Point, b: Point, c: Point) =>
	(a[0] - b[0]) * (c[0] - b[0]) +
		(a[1] - b[1]) * (c[1] - b[1]) >
	0;
