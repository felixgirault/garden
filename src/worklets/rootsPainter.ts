class RootsPainter {
	static ColorProp = '--roots-color';
	static ColorVariantProp = '--roots-color-variant';
	private seed = 0;

	static get inputProperties() {
		return [this.ColorProp, this.ColorVariantProp];
	}

	constructor() {
		this.seed = Date.now();
	}

	paint(
		ctx: PaintRenderingContext2D,
		geom: PaintSize,
		properties: StylePropertyMapReadOnly
	) {
		const rootColor = properties
			.get(RootsPainter.ColorProp)!
			.toString();
		const rootBaseColor = properties
			.get(RootsPainter.ColorVariantProp)!
			.toString();

		const gradient = ctx.createLinearGradient(
			0,
			geom.height - 1000,
			0,
			geom.height
		);

		gradient.addColorStop(0, rootColor);
		gradient.addColorStop(1, rootBaseColor);
		ctx.strokeStyle = gradient;

		const random = this.random();
		let baseX = 0;

		do {
			baseX += 20 + random() * 150;
			ctx.globalAlpha = 0.7 + 0.3 * random();
			ctx.lineWidth = this.biasedRandom(
				random,
				5,
				180,
				15,
				1.2
			);

			let curveX = baseX;
			let curveY = geom.height;

			do {
				const dir = random() > 0.5 ? 1 : -1;
				const curveWidth = (50 + random() * 300) * dir;
				const curveHeight = 500 + random() * 500;

				ctx.beginPath();
				ctx.moveTo(curveX, curveY);
				ctx.bezierCurveTo(
					curveX,
					curveY - curveHeight / 2,
					curveX + curveWidth,
					curveY - curveHeight / 2,
					curveX + curveWidth,
					curveY - curveHeight
				);

				ctx.stroke();

				curveX += curveWidth;
				curveY -= curveHeight;
			} while (curveY > 0);
		} while (baseX < geom.width);
	}

	// @see https://12daysofweb.dev/2021/houdini/#add-randomness-responsibly-with-a-prng
	random() {
		let seed = Number(this.seed);
		return () => {
			seed |= 0;
			seed = (seed + 0x6d2b79f5) | 0;
			let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
			t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
	}

	// @see https://stackoverflow.com/a/29325222
	biasedRandom(
		random: () => number,
		min: number,
		max: number,
		bias: number,
		influence: number
	) {
		const num = random() * (max - min) + min;
		const mix = random() * influence;
		return num * (1 - mix) + bias * mix;
	}
}

registerPaint('roots', RootsPainter);
