import uuid from "react-uuid";
import roundNumber from "./math";

//
// ─── CLASSES ────────────────────────────────────────────────────────────────────
//

class AvailableFood {
	constructor({ label, unit, kcal, common }) {
		this.type = "availableFood";
		this.label = label;
		this.value = label.toLowerCase;
		this.unit = unit;
		this.kcal = roundNumber(kcal);
		this.common = roundNumber(common);
		this.id = uuid();
	}
}

class Food {
	constructor({ food, amount }) {
		this.type = "food";
		this.food = food;
		this.amount = roundNumber(amount);
		this.id = uuid();
	}
}

class AvailableExercise {
	constructor({ label, kcal, common }) {
		this.type = "availableExercise";
		this.label = label;
		this.value = label.toLowerCase;
		this.kcal = roundNumber(kcal);
		this.unit = "min";
		this.common = roundNumber(common);
		this.id = uuid();
	}
}

class Exercise {
	constructor({ exercise, amount }) {
		this.type = "exercise";
		this.food = exercise;
		this.amount = roundNumber(amount);
		this.id = uuid();
	}
}

//
// ─── CHECK FUNCTIONS ────────────────────────────────────────────────────────────
//

export const newFood = ({ food, amount }) => {
	return new Promise((resolve, reject) => {
		if (typeof food == "object" && typeof amount == "number") {
			resolve(new Food({ food: food, amount: amount }));
		} else {
			reject(Error("Invalid New Food Inputs"));
		}
	});
};

export const newAvailableFood = ({ label, unit, kcal, common }) => {
	return new Promise((resolve, reject) => {
		if (
			typeof label == "string" &&
			typeof unit == "string" &&
			typeof kcal == "number" &&
			typeof common == "number"
		) {
			resolve(new AvailableFood({ label: label, unit: unit, kcal: kcal, common: common }));
		} else {
			reject(Error("Invalid New Available Food Inputs"));
		}
	});
};

export const newExercise = ({ exercise, time }) => {
	return new Promise((resolve, reject) => {
		if (typeof exercise == "object" && typeof time == "number") {
			resolve(new Exercise({ exercise: exercise, time: time }));
		} else {
			reject(Error("Invalid New Exercise Inputs"));
		}
	});
};

export const newAvailableExercise = ({ label, kcal, common }) => {
	return new Promise((resolve, reject) => {
		if (typeof label == "string" && typeof kcal == "number" && typeof common == "number") {
			resolve(new AvailableExercise({ label: label, kcal: kcal, common: common }));
		} else {
			reject(Error("Invalid New Available Exercise Inputs"));
		}
	});
};
