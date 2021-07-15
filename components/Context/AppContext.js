import React, { createContext, useRef, useEffect, useState } from "react";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
			console.log("app has come to the foreground!");
			save = true;
			getAllData();
			// ─────────────────────────────────────────────────────────────────
		} else if (
			(appState.current.match(/active/) && nextAppState === "inactive") ||
			nextAppState === "background"
		) {
			// ─── BACKGROUND ──────────────────────────────────────────────────
			console.log("App has come to the background!");
			// ─────────────────────────────────────────────────────────────────
		}
		appState.current = nextAppState;
	};

	// ─── FOOD ───────────────────────────────────────────────────────────────────────

	const [availableFoodList, setAvailableFoodList] = useState([
		{
			label: "Egg",
			value: "egg",
			unit: "units",
			kcal: 75,
		},
		{
			label: "Cheese",
			value: "cheese",
			unit: "g",
			kcal: 2,
		},
		{
			label: "Milk",
			value: "milk",
			unit: "ml",
			kcal: 1,
		},
		{
			label: "Steak",
			value: "steak",
			unit: "g",
			kcal: 1.7,
		},
	]);

	const [foodList, setFoodList] = useState([]);

	// ─── EXERCISE ───────────────────────────────────────────────────────────────────

	const [availableExerciseList, setAvailableExerciseList] = useState([
		{
			label: "Burpees",
			value: "burpees",
			kcal: -12.5,
		},
		{
			label: "Running",
			value: "running",
			kcal: -11.2,
		},
		{
			label: "Weightlifting",
			value: "weightlifting",
			kcal: -9.3,
		},
	]);

	const [exerciseList, setExerciseList] = useState([]);

	// ─── FUNCTIONS ──────────────────────────────────────────────────────────────────

	const addFood = (newFood) => {
		let newFoodList = [...foodList, newFood];
		setFoodList(newFoodList);
		storeData("@foodList", newFoodList);
		// storeAllData();
	};

	const createFood = (newFood) => {
		let newAvailableFoodList = [...availableFoodList, newAvailableFood];
		setAvailableFoodList(newAvailableFoodList);
		storeData("@availableFoodList", newAvailableFoodList);
		// storeAllData();
	};

	const addExercise = (newExercise) => {
		let newExerciseList = [...exerciseList, newExercise];
		setExerciseList(newExerciseList);
		storeData("@exerciseList", newExerciseList);
		// storeAllData();
	};

	const createExercise = (newExercise) => {
		let newAvailableExerciseList = [...availableExerciseList, newAvailableExercise];
		setAvailableExerciseList(newAvailableExerciseList);
		storeData("@availableExerciseList", newAvailableExerciseList);
		// storeAllData();
	};

	const getTotalCalories = (list) => {
		let totalCalories = 0;
		if (list.map == undefined) {
			return totalCalories;
		} else {
			list.map((l) => {
				totalCalories += l.amount == undefined ? l.kcal * l.time : l.kcal * l.amount;
			});
			return Math.round(totalCalories);
		}
	};

	// ─── GOAL CALORIES ──────────────────────────────────────────────────────────────

	const [goalCalories, setGoalCalories] = useState(2500);

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
				console.log(err);
			});
		getData("@foodList")
			.then((result) => {
				setFoodList(result);
			})
			.catch((err) => {
				console.log(err);
			});
		getData("@availableExerciseList")
			.then((result) => {
				setAvailableExerciseList(result);
			})
			.catch((err) => {
				console.log(err);
			});
		getData("@exerciseList")
			.then((result) => {
				setExerciseList(result);
			})
			.catch((err) => {
				console.log(err);
			});

		// if (stored.availableFoodList != null) setAvailableFoodList(stored.availableFoodList);
		// if (stored.foodList != null) setAvailableFoodList(stored.foodList);
		// if (stored.availableExerciseList != null) setAvailableFoodList(stored.availableExerciseList);
		// if (stored.exerciseList != null) setAvailableFoodList(stored.exerciseList);
	};

	const storeAllData = () => {
		// console.log(availableFoodList);
		// console.log(foodList);
		// console.log(availableExerciseList);
		// console.log(exerciseList);

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
				availableFoodList,
				foodList,
				createFood,
				addFood,
				// Exercise
				availableExerciseList,
				exerciseList,
				createExercise,
				addExercise,
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
