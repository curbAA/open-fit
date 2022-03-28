import uuid from "react-uuid";
import { roundNumber } from "./math";

//
// ─── CLASSES ────────────────────────────────────────────────────────────────────
//

class AvailableFood {
	constructor({ label, unit, kcal, common, macros }) {
		this.type = "availableFood";
		this.label = label;
		this.value = label.toLowerCase();
		this.unit = unit;
		this.kcal = roundNumber(parseInt(kcal) / parseInt(common));
		this.macros = {
			protein: roundNumber(parseInt(macros.protein) / parseInt(common)),
			fat: roundNumber(parseInt(macros.fat) / parseInt(common)),
			carbs: roundNumber(parseInt(macros.carbs) / parseInt(common))
		};
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
		this.value = label.toLowerCase();
		this.unit = "min";
		this.kcal = roundNumber(parseInt(kcal) / parseInt(common));
		this.common = roundNumber(common);
		this.id = uuid();
	}
}

class Exercise {
	constructor({ exercise, time }) {
		this.type = "exercise";
		this.exercise = exercise;
		this.time = roundNumber(time);
		this.id = uuid();
	}
}

//
// ─── CHECK FUNCTIONS ────────────────────────────────────────────────────────────
// Return an object based on the class if the conditions are true

export const newFood = ({ food, amount }) => {
	return new Promise((resolve, reject) => {
		if (food.type == "availableFood" && typeof amount == "number") {
			resolve(new Food({ food: food, amount: amount }));
		} else {
			reject("Invalid New Food Inputs");
		}
	});
};

export const newAvailableFood = ({ label, unit, kcal, common, macros }) => {
	return new Promise((resolve, reject) => {
		if (
			typeof label == "string" &&
			label != "" &&
			typeof unit == "string" &&
			unit != "" &&
			parseInt(kcal) > 0 &&
			parseInt(common) > 0
		) {
			resolve(new AvailableFood({ label: label, unit: unit, kcal: kcal, common: common, macros: macros }));
		} else {
			reject("Invalid New Available Food Inputs");
		}
	});
};

export const newExercise = ({ exercise, time }) => {
	return new Promise((resolve, reject) => {
		if (exercise.type == "availableExercise" && typeof time == "number") {
			resolve(new Exercise({ exercise: exercise, time: time }));
		} else {
			reject("Invalid New Exercise Inputs");
		}
	});
};

export const newAvailableExercise = ({ label, kcal, common }) => {
	return new Promise((resolve, reject) => {
		if (typeof label == "string" && label != "" && parseInt(kcal) > 0 && parseInt(common) > 0) {
			resolve(new AvailableExercise({ label: label, kcal: kcal, common: common }));
		} else {
			reject("Invalid New Available Exercise Inputs");
		}
	});
};
