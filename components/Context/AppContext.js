import React, { createContext, useRef, useEffect, useState } from "react";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-uuid";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
	// ─── APP STATE ──────────────────────────────────────────────────────────────────
	const appState = useRef(AppState.currentState);

	useEffect(() => {
		AppState.addEventListener("change", _handleAppStateChange);
		getAllData();
		return () => {
			AppState.removeEventListener("change", _handleAppStateChange);
		};
	}, []);

	const _handleAppStateChange = (nextAppState) => {
		if (appState.current.match(/inactive|background/) && nextAppState === "active") {
			// ─── FOREGROUND ──────────────────────────────────────────────────
			// console.log("app has come to the foreground!");
			getAllData();
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

	const [availableFoodList, setAvailableFoodList] = useState([
		{
			type: "availableFood",
			label: "Egg",
			value: "egg",
			unit: "units",
			kcal: 75,
			common: 1,
		},
		{
			type: "availableFood",
			label: "Cheese",
			value: "cheese",
			unit: "g",
			kcal: 2,
			common: 50,
		},
		{
			type: "availableFood",
			label: "Milk",
			value: "milk",
			unit: "ml",
			kcal: 1,
			common: 250,
		},
		{
			type: "availableFood",
			label: "Steak",
			value: "steak",
			unit: "g",
			kcal: 1.7,
			common: 200,
		},
	]);

	const [foodList, setFoodList] = useState([]);

	// ─── EXERCISE ───────────────────────────────────────────────────────────────────

	const [availableExerciseList, setAvailableExerciseList] = useState([
		{
			type: "exercise",
			label: "Burpees",
			value: "burpees",
			common: 10,
			unit: "min", // may use later on
			kcal: -12.5,
		},
		{
			type: "exercise",
			label: "Running",
			value: "running",
			common: 10,
			unit: "min", // may use later on
			kcal: -11.2,
		},
		{
			type: "exercise",
			label: "Weightlifting",
			value: "weightlifting",
			common: 10,
			unit: "min", // may use later on
			kcal: -9.3,
		},
	]);

	const [exerciseList, setExerciseList] = useState([]);

	// ─── FUNCTIONS ──────────────────────────────────────────────────────────────────

	// ─── FOOD ───────────────────────────────────────────────────────────────────────
	const addFood = ({ food, amount } = {}) => {
		let newFood = {
			type: "food",
			food: food, // Object from AvailableFoodList
			amount: amount,
			id: uuid(),
		};

		let newFoodList = [...foodList, newFood];

		setFoodList(newFoodList);
		storeData("@foodList", newFoodList);
	};

	// ────────────────────────────────────────────────────────────
	const editFood = ({ id, food, amount } = {}) => {
		let newFood = {
			type: "food",
			food: food, // Object from AvailableFoodList
			amount: amount,
			id: id,
		};

		let newFoodList = foodList.map((item, index) => {
			if (item.id == id) return foodList.splice(index, 1, newFood);
		});

		setFoodList(newFoodList);
		storeData("@foodList", newFoodList);
	};

	// ────────────────────────────────────────────────────────────
	const deleteFood = ({ id } = {}) => {
		let newFoodList = foodList.map((item, index) => {
			if (item.id == id) return foodList.splice(index, 1);
		});

		setFoodList(newFoodList);
		storeData("@foodList", newFoodList);
	};

	// ─── AVAILABLE FOOD ──────────────────────────────────────────────────────────────
	const createAvailableFood = ({ label, common, unit, kcal } = {}) => {
		let newAvailableFood = {
			type: "availableFood",
			label: label,
			value: label.toLowerCase(),
			common: common,
			unit: unit,
			kcal: kcal,
			id: uuid(),
		};

		let newAvailableFoodList = [...availableFoodList, newAvailableFood];

		setAvailableFoodList(newAvailableFoodList);
		storeData("@availableFoodList", newAvailableFoodList);
	};

	// ────────────────────────────────────────────────────────────
	const editAvailableFood = ({ id, label, common, unit, kcal } = {}) => {
		let newAvailableFood = {
			type: "availableFood",
			label: label,
			value: label.toLowerCase(),
			common: common,
			unit: unit,
			kcal: kcal,
			id: id(),
		};

		let newAvailableFoodList = availableFoodList;
		newAvailableFoodList = newAvailableFoodList.map((item, index) => {
			if (item.id == id) newAvailableFoodList[index] = newAvailableFood;
		});

		setAvailableFoodList(newAvailableFoodList);
		storeData("@availableFoodList", newAvailableFoodList);
	};

	// ────────────────────────────────────────────────────────────
	const deleteAvailableFood = ({ id } = {}) => {
		let newAvailableFoodList = availableFoodList;
		newAvailableFoodList = newAvailableFoodList.filter((item) => {
			return item.id !== id;
		});

		setAvailableFoodList(newAvailableFoodList);
		storeData("@availableFoodList", newAvailableFoodList);
	};

	// ─── EXERCISE ───────────────────────────────────────────────────────────────────
	const addExercise = ({ exercise, time } = {}) => {
		let newExercise = {
			type: "exercise",
			exercise: exercise,
			time: time,
			id: uuid(),
		};

		let newExerciseList = [...exerciseList, newExercise];

		setAvailableExerciseList(newExerciseList);
		storeData("@exerciseList", newExerciseList);
	};

	// ────────────────────────────────────────────────────────────
	const editExercise = ({ id, exercise, time } = {}) => {
		let newExercise = {
			type: "exercise",
			exercise: exercise,
			time: time,
			id: uuid(),
		};

		let newExerciseList = exerciseList;
		newExerciseList = newExerciseList.map((item, index) => {
			if (item.id == id) newExerciseList[index] = newExercise;
		});

		setExerciseList(newExerciseList);
		storeData("@exerciseList", newExerciseList);
	};

	// ────────────────────────────────────────────────────────────
	const deleteExercise = ({ id } = {}) => {
		let newExerciseList = exerciseList;
		newExerciseList = newExerciseList.filter((item) => {
			return item.id !== id;
		});
		setAvailableExerciseList(newExerciseList);
		storeData("@exerciseList", newExerciseList);
	};

	// ─── AVAILABLE EXERCISE ─────────────────────────────────────────────────────────
	const createAvailableExercise = ({ label, common, kcal } = {}) => {
		let newAvailableExercise = {
			type: "availableExercise",
			label: label,
			value: label.toLowerCase(),
			common: common,
			kcal: kcal,
			id: uuid(),
		};

		let newAvailableExerciseList = [...availableExerciseList, newAvailableExercise];

		setAvailableExerciseList(newAvailableExerciseList);
		storeData("@availableExerciseList", newAvailableExerciseList);
		console.log(newAvailableExercise);
	};

	// ────────────────────────────────────────────────────────────
	const editAvailableExercise = ({ id, label, common, kcal } = {}) => {
		let newAvailableExercise = {
			type: "availableExercise",
			label: label,
			value: label.toLowerCase(),
			common: common,
			kcal: kcal,
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
	const deleteAvailableExercise = ({ id } = {}) => {
		let newAvailableExerciseList = availableExerciseList;
		newAvailableExerciseList = newAvailableExerciseList.filter((item) => {
			return item.id !== id;
		});

		setAvailableExerciseList(newAvailableExerciseList);
		storeData("@availableExerciseList", newAvailableExerciseList);
	};

	// ─── GOAL CALORIES ──────────────────────────────────────────────────────────────

	const [goalCalories, setGoalCalories] = useState(2500);

	const getTotalCalories = (list) => {
		if (list.map == undefined) {
			return 0;
		} else {
			let totalCalories = 0;
			list.map((l) => {
				totalCalories += l.amount == undefined ? l.kcal * l.time : l.kcal * l.amount;
			});
			return Math.round(totalCalories);
		}
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
	};

	const storeAllData = () => {
		storeData("@availableFoodList", availableFoodList);
		storeData("@foodList", foodList);
		storeData("@availableExerciseList", availableExerciseList);
		storeData("@exerciseList", exerciseList);
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
				goalCalories,
				getTotalCalories,
				setGoalCalories,
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
