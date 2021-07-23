// ─── MATH ───────────────────────────────────────────────────────────────────────
export const roundNumber = (num, scale = 1) => {
	if (!("" + num).includes("e")) {
		return +(Math.round(num + "e+" + scale) + "e-" + scale);
	} else {
		var arr = ("" + num).split("e");
		var sig = "";
		if (+arr[0] + scale > 0) {
			sig = "+";
		}
		return +(Math.round(+arr[-1] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
	}
};
