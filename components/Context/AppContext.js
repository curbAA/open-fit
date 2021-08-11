import React, { createContext, useRef, useEffect, useState } from "react";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-uuid";

export const AppContext = createContext();

import { roundNumber } from "./components/math";
import { newAvailableFood, newFood, newAvailableExercise, newExercise } from "./components/classes";

// TODO Use classes for objects in lists
// YOU BRAIN-DEAD PSEUDO-PROGRAMMER, YOU SHOULD HAVE DONE THAT FROM THE BEGGINING
// JUST MAKE food, exercise, availableFood, and availableExercise CLASSES FFS
// IT WAS SO SIMPLE AND YOU COULD NOT REMEMBER THAT CLASSES FRICKING EXIST
// CANT BELIEVE THAT YOU CALL YOURSELF A PROGRAMMER

// TODO implement promises for handling errors in functions
// Such as addFood, editFood, createAvailableFood, editAvailableFood, etc.
// for handling errors.

export const AppContextProvider = (props) => {
	// ─── APP STATE ──────────────────────────────────────────────────────────────────
	const appState = useRef(AppState.currentState);

	useEffect(() => {
		AppState.addEventListener("change", _handleAppStateChange);
		// clearAsyncStorage();
		getAllData();
		// storeAllData();
		return () => {
			AppState.removeEventListener("change", _handleAppStateChange);
		};
	}, []);

	const _handleAppStateChange = (nextAppState) => {
		if (appState.current.match(/inactive|background/) && nextAppState === "active") {
			// ─── FOREGROUND ──────────────────────────────────────────────────
			// console.log("app has come to the foreground!");
			getAllData();
			// storeAllData();
			// ─────────────────────────────────────────────────────────────────
		} else if (
			(appState.current.match(/active/) && nextAppState === "inactive") ||
			nextAppState === "background"
		) {
			// ─── BACKGROUND ──────────────────────────────────────────────────
			// console.log("App has come to the background!");
			// ─────────────────────────────────────────────────────────────────
		}
		appState.current = nextAppState;
	};

	// ─── FOOD ───────────────────────────────────────────────────────────────────────

	const [availableFoodList, setAvailableFoodList] = useState([]);

	const [foodList, setFoodList] = useState([]);

	// ─── EXERCISE ───────────────────────────────────────────────────────────────────

	const [availableExerciseList, setAvailableExerciseList] = useState([]);

	const [exerciseList, setExerciseList] = useState([]);

	// ─── FUNCTIONS ──────────────────────────────────────────────────────────────────

	// ─── FOOD ───────────────────────────────────────────────────────────────────────
	const addFood = ({ food, amount }) => {
		return new Promise((resolve, reject) => {
			newFood({ food: food, amount: amount })
				.then((value) => {
					let newFoodList = [...foodList, value];
					setFoodList(newFoodList);
					storeData("@foodList", newFoodList);
					resolve("Item Has Been Saved");
				})
				.catch((error) => {
					reject(Error(error));
				});
		});
	};

	// ────────────────────────────────────────────────────────────
	const editFood = ({ id, food, amount }) => {
		let newFood = {
			type: "food",
			food: food, // Object from AvailableFoodList
			amount: Math.abs(parseInt(amount)),
			id: id,
		};

		let newFoodList = foodList.map((item, index) => {
			if (item.id == id) return foodList.splice(index, 1, newFood);
		});

		setFoodList(newFoodList);
		storeData("@foodList", newFoodList);
	};

	// ────────────────────────────────────────────────────────────
	const deleteFood = ({ id }) => {
		let newFoodList = foodList;
		newFoodList = newFoodList.filter((item) => {
			return item.id !== id;
		});

		setFoodList(newFoodList);
		storeData("@foodList", newFoodList);
	};

	// ─── AVAILABLE FOOD ──────────────────────────────────────────────────────────────
	const createAvailableFood = ({ label, common, unit, kcal }) => {
		return new Promise((resolve, reject) => {
			newAvailableFood({ label: label, common: common, unit: unit, kcal: kcal })
				.then((value) => {
					let newAvailableFoodList = [...availableFoodList, value];
					setAvailableFoodList(newAvailableFoodList);
					storeData("@availableFoodList", newAvailableFoodList);
					resolve("Item Has Been Saved");
					console.log(value);
				})
				.catch((error) => {
					reject(Error(error));
				});
		});
	};

	// ────────────────────────────────────────────────────────────
	const editAvailableFood = ({ id, label, common, unit, kcal }) => {
		let newAvailableFood = {
			type: "availableFood",
			label: label,
			value: label.toLowerCase(),
			common: Math.abs(parseInt(common)),
			unit: unit,
			kcal: roundNumber(Math.abs(parseInt(kcal)) / Math.abs(parseInt(common))),
			id: id,
		};

		let newAvailableFoodList = availableFoodList;
		newAvailableFoodList = newAvailableFoodList.map((item, index) => {
			if (item.id == id) newAvailableFoodList[index] = newAvailableFood;
		});

		setAvailableFoodList(newAvailableFoodList);
		storeData("@availableFoodList", newAvailableFoodList);
	};

	// ────────────────────────────────────────────────────────────
	const deleteAvailableFood = ({ id }) => {
		let newAvailableFoodList = availableFoodList;
		newAvailableFoodList = newAvailableFoodList.filter((item) => {
			return item.id !== id;
		});

		setAvailableFoodList(newAvailableFoodList);
		storeData("@availableFoodList", newAvailableFoodList);
	};

	// ─── EXERCISE ───────────────────────────────────────────────────────────────────
	const addExercise = ({ exercise, time }) => {
		newExercise({ exercise: exercise, time: time })
			.then((result) => console.log(result))
			.catch((error) => Error(error));
		return new Promise((resolve, reject) => {
			newExercise({ exercise: exercise, time: time })
				.then((value) => {
					let newExerciseList = [...exerciseList, value];
					setExerciseList(newExerciseList);
					storeData("@exerciseList", newExerciseList);
					resolve("Item Has Been Saved");
				})
				.catch((error) => {
					reject(Error(error));
				});
		});
	};

	// ────────────────────────────────────────────────────────────
	const editExercise = ({ id, exercise, time }) => {
		let newExercise = {
			type: "exercise",
			exercise: exercise, // Object from availableExerciseList
			time: Math.abs(parseInt(time)),
			id: id,
		};

		let newExerciseList = exerciseList;
		newExerciseList = newExerciseList.map((item, index) => {
			if (item.id == id) newExerciseList[index] = newExercise;
		});

		setExerciseList(newExerciseList);
		storeData("@exerciseList", newExerciseList);
	};

	// ────────────────────────────────────────────────────────────
	const deleteExercise = ({ id }) => {
		let newExerciseList = exerciseList;
		newExerciseList = newExerciseList.filter((item) => {
			return item.id !== id;
		});
		setExerciseList(newExerciseList);
		storeData("@exerciseList", newExerciseList);
	};

	// ─── AVAILABLE EXERCISE ─────────────────────────────────────────────────────────
	const createAvailableExercise = ({ label, common, kcal }) => {
		return new Promise((resolve, reject) => {
			newAvailableExercise({ label: label, common: common, kcal: kcal })
				.then((value) => {
					let newAvailableExerciseList = [...availableExerciseList, value];
					setAvailableExerciseList(newAvailableExerciseList);
					storeData("@availableExerciseList", newAvailableExerciseList);
					resolve("Item Has Been Saved");
				})
				.catch((error) => {
					reject(Error(error));
				});
		});
	};

	// ────────────────────────────────────────────────────────────
	const editAvailableExercise = ({ id, label, common, kcal }) => {
		let newAvailableExercise = {
			type: "availableExercise",
			label: label,
			value: label.toLowerCase(),
			common: Math.abs(parseInt(common)),
			unit: "min",
			cal: roundNumber(Math.abs(parseInt(kcal)) / Math.abs(parseInt(common))) * -1, // Always negative integer
			id: id,
		};

		let newAvailableExerciseList = availableExerciseList;
		newAvailableExerciseList = newAvailableExerciseList.map((item, index) => {
			if (item.id == id) newAvailableExerciseList[index] = newAvailableExercise;
		});

		setAvailableExerciseList(newAvailableExerciseList);
		storeData("@availableExerciseList", newAvailableExerciseList);
	};

	// ────────────────────────────────────────────────────────────
	const deleteAvailableExercise = ({ id }) => {
		let newAvailableExerciseList = availableExerciseList;
		newAvailableExerciseList = newAvailableExerciseList.filter((item) => {
			return item.id !== id;
		});

		setAvailableExerciseList(newAvailableExerciseList);
		storeData("@availableExerciseList", newAvailableExerciseList);
	};

	// ─── GOAL CALORIES ──────────────────────────────────────────────────────────────

	const [goalCalories, setGoalCalories] = useState(2500);

	const editGoalCalories = (value) => {
		setGoalCalories(value ? value : 0);
		storeData("@goalCalories", value);
	};

	const getTotalCalories = (type) => {
		let totalCalories = 0;
		if (type == "food") {
			foodList.map((item) => {
				totalCalories += item.amount * item.food.kcal;
			});
		} else if (type == "exercise") {
			exerciseList.map((item) => {
				totalCalories += item.time * item.exercise.kcal;
			});
		}
		return totalCalories ? roundNumber(totalCalories) : 0;
	};

	// ─── LOCAL STORAGE ──────────────────────────────────────────────────────────────

	const storeData = async (key, value) => {
		try {
			const jsonValue = JSON.stringify(value);
			await AsyncStorage.setItem(key, jsonValue);
			console.log("List Saved");
		} catch (error) {
			console.error(error);
		}
	};

	const getData = async (key) => {
		try {
			const jsonValue = await AsyncStorage.getItem(key);
			console.log("List Fetched");
			return jsonValue != null ? JSON.parse(jsonValue) : [];
		} catch (error) {
			console.error(error);
		}
	};

	const getAllData = () => {
		getData("@availableFoodList")
			.then((result) => {
				setAvailableFoodList(result);
			})
			.catch((err) => {
				console.error(err);
			});
		getData("@foodList")
			.then((result) => {
				setFoodList(result);
			})
			.catch((err) => {
				console.error(err);
			});
		getData("@availableExerciseList")
			.then((result) => {
				setAvailableExerciseList(result);
			})
			.catch((err) => {
				console.error(err);
			});
		getData("@exerciseList")
			.then((result) => {
				setExerciseList(result);
			})
			.catch((err) => {
				console.error(err);
			});
		getData("@goalCalories")
			.then((result) => {
				setGoalCalories(result);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const storeAllData = () => {
		storeData("@availableFoodList", availableFoodList);
		storeData("@foodList", foodList);
		storeData("@availableExerciseList", availableExerciseList);
		storeData("@exerciseList", exerciseList);
		storeData("@goalCalories", goalCalories);
	};

	const clearAsyncStorage = async () => {
		AsyncStorage.clear();
	};

	// ─── RETURN ─────────────────────────────────────────────────────────────────────

	return (
		<AppContext.Provider
			value={{
				// Food
				foodList,
				addFood,
				deleteFood,
				editFood,
				// • • • • •
				availableFoodList,
				createAvailableFood,
				editAvailableFood,
				deleteAvailableFood,
				// Exercise
				exerciseList,
				addExercise,
				editExercise,
				deleteExercise,
				// • • • • •
				availableExerciseList,
				createAvailableExercise,
				editAvailableExercise,
				deleteAvailableExercise,
				// Calories
				getTotalCalories,
				goalCalories,
				editGoalCalories,
				// Math
				roundNumber,
				// Data
				storeAllData,
				storeData,
				getAllData,
				getData,
				// Dev
				clearAsyncStorage,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
};
