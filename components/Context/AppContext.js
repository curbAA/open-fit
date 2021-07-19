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
			type: "food",
			label: "Egg",
			value: "egg",
			unit: "units",
			kcal: 75,
			common: 1,
		},
		{
			type: "food",
			label: "Cheese",
			value: "cheese",
			unit: "g",
			kcal: 2,
			common: 50,
		},
		{
			type: "food",
			label: "Milk",
			value: "milk",
			unit: "ml",
			kcal: 1,
			common: 250,
		},
		{
			type: "food",
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

	const addFood = (newFood) => {
		let newFoodList = [...foodList, newFood];
		setFoodList(newFoodList);
		storeData("@foodList", newFoodList);
	};

	// Edit Food
	// Delete Food

	const createAvailableFood = (newAvailableFood) => {
		let newAvailableFoodList = [...availableFoodList, newAvailableFood];
		setAvailableFoodList(newAvailableFoodList);
		storeData("@availableFoodList", newAvailableFoodList);
	};

	// Edit Available Food
	// Delete Available Food

	const addExercise = (newExercise) => {
		let newExerciseList = [...exerciseList, newExercise];
		setExerciseList(newExerciseList);
		storeData("@exerciseList", newExerciseList);
	};

	// Edit Exercise
	// Delete Exercise

	const createAvailableExercise = (newAvailableExercise) => {
		let newAvailableExerciseList = [...availableExerciseList, newAvailableExercise];
		setAvailableExerciseList(newAvailableExerciseList);
		storeData("@availableExerciseList", newAvailableExerciseList);
	};

	// Edit Available Exercise
	// Delete Available Exercise

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
				availableFoodList,
				foodList,
				createAvailableFood,
				addFood,
				// Exercise
				availableExerciseList,
				exerciseList,
				createAvailableExercise,
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
