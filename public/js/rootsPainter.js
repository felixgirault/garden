class RootsPainter {
	static ColorProp = '--roots-color';
	static ColorVariantProp = '--roots-color-variant';

	static get inputProperties() {
		return [this.ColorProp, this.ColorVariantProp];
	}

	paint(ctx, geom, properties) {
		const rootColor = properties
			.get(RootsPainter.ColorProp)
			.toString();
		const rootBaseColor = properties
			.get(RootsPainter.ColorVariantProp)
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

		let baseX = 0;

		do {
			baseX += 20 + Math.random() * 150;
			ctx.lineWidth = this.biasedRandom(2, 150, 20, 1.5);
			ctx.globalAlpha = 0.7 + 0.3 * Math.random();

			let curveX = baseX;
			let curveY = geom.height;

			do {
				const dir = Math.random() > 0.5 ? 1 : -1;
				const curveWidth = (50 + Math.random() * 300) * dir;
				const curveHeight = 500 + Math.random() * 500;

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

	// @see https://stackoverflow.com/a/29325222
	biasedRandom(min, max, bias, influence) {
		const random = Math.random() * (max - min) + min;
		const mix = Math.random() * influence;
		return random * (1 - mix) + bias * mix;
	}
}

registerPaint('roots', RootsPainter);
