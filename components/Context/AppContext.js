import React, { createContext, useRef, useEffect, useState } from "react";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
	// ─── APP STATE ──────────────────────────────────────────────────────────────────

	const appState = useRef(AppState.currentState);

	useEffect(() => {
		AppState.addEventListener("change", _handleAppStateChange);

		setAvailableFoodList(getData("@availableFoodList"));
		setFoodList(getData("@foodList"));
		setAvailableExerciseList(getData("@availableExerciseList"));
		setExerciseList(getData("@exerciseList"));

		return () => {
			AppState.removeEventListener("change", _handleAppStateChange);
		};
	}, []);

	const _handleAppStateChange = (nextAppState) => {
		if (appState.current.match(/inactive|background/) && nextAppState === "active") {
			// ─── FOREGROUND ──────────────────────────────────────────────────
			console.log("app has come to the foreground!");
			// getalldata();

			// if (stored.availablefoodlist != null) setavailablefoodlist(stored.availablefoodlist);
			// if (stored.foodlist != null) setavailablefoodlist(stored.foodlist);
			// if (stored.availableexerciselist != null) setavailablefoodlist(stored.availableexerciselist);
			// if (stored.exerciselist != null) setavailablefoodlist(stored.exerciselist);

			setAvailableFoodList(getData("@availableFoodList"));
			setFoodList(getData("@foodList"));
			setAvailableExerciseList(getData("@availableExerciseList"));
			setExerciseList(getData("@exerciseList"));
			// ─────────────────────────────────────────────────────────────────
		} else if (
			(appState.current.match(/active/) && nextAppState === "inactive") ||
			nextAppState === "background"
		) {
			// ─── BACKGROUND ──────────────────────────────────────────────────
			console.log("App has come to the background!");
			// storeAllData();

			// console.log(availableFoodList);
			// console.log(foodList);
			// console.log(availableExerciseList);
			// console.log(exerciseList);

			storeData("@availableFoodList", availableFoodList);
			storeData("@foodList", foodList);
			storeData("@availableExerciseList", availableExerciseList);
			storeData("@exerciseList", exerciseList);
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

	const [foodList, setFoodList] = useState([
		{
			name: "Egg",
			amount: 2,
			unit: "units",
			kcal: 75,
		},
		{
			name: "Cheese",
			amount: 143,
			unit: "g",
			kcal: 2,
		},
		{
			name: "Milk",
			amount: 200,
			unit: "ml",
			kcal: 0.7,
		},
		{
			name: "Steak",
			amount: 245,
			unit: "g",
			kcal: 1.7,
		},
	]);

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

	const [exerciseList, setExerciseList] = useState([
		{
			name: "Burpees",
			time: 20,
			kcal: -12.5,
		},
		{
			name: "Running",
			time: 20,
			kcal: -11.2,
		},
		{
			name: "Weightlifting",
			time: 20,
			kcal: -9.3,
		},
	]);

	// ─── FUNCTIONS ──────────────────────────────────────────────────────────────────

	const addFood = (newFood) => {
		let newFoodList = [...foodList, newFood];
		setFoodList(newFoodList);
	};

	const createFood = (newFood) => {
		let newFoodList = [...availableFoodList, newFood];
		setAvailableFoodList(newFoodList);
	};

	const addExercise = (newExercise) => {
		let newExerciseList = [...exerciseList, newExercise];
		setExerciseList(newExerciseList);
	};

	const createExercise = (newExercise) => {
		let newExerciseList = [...exerciseList, newExercise];
		setAvailableExerciseList(newExerciseList);
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
		} catch (error) {
			console.error(error);
		}
	};

	const getData = async (key) => {
		try {
			const jsonValue = await AsyncStorage.getItem(key);
			console.log(jsonValue);
			return jsonValue != null ? JSON.parse(jsonValue) : [];
		} catch (error) {
			console.error(error);
		}
	};

	const getAllData = () => {
		let stored;
		stored.availableFoodList = getData("@availableFoodList");
		stored.foodList = getData("@foodList");
		stored.availableExerciseList = getData("@availableExerciseList");
		stored.exerciseList = getData("@exerciseList");

		// if (stored.availableFoodList != null) setAvailableFoodList(stored.availableFoodList);
		// if (stored.foodList != null) setAvailableFoodList(stored.foodList);
		// if (stored.availableExerciseList != null) setAvailableFoodList(stored.availableExerciseList);
		// if (stored.exerciseList != null) setAvailableFoodList(stored.exerciseList);

		setAvailableFoodList(stored.availableFoodList._W);
		setFoodList(stored.foodList._W);
		setAvailableExerciseList(stored.availableExerciseList._W);
		setExerciseList(stored.exerciseList._W);
	};

	const storeAllData = () => {
		console.log(availableFoodList);
		console.log(foodList);
		console.log(availableExerciseList);
		console.log(exerciseList);

		storeData("@availableFoodList", availableFoodList);
		storeData("@foodList", foodList);
		storeData("@availableExerciseList", availableExerciseList);
		storeData("@exerciseList", exerciseList);
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
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
};
