import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
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
	// ─── GOAL CALORIES ──────────────────────────────────────────────────────────────
	const [goalCalories, setGoalCalories] = useState(2500);

	return (
		<AppContext.Provider
			value={{
				// Food
				availableFoodList,
				createFood,
				foodList,
				addFood,
				// Exercise
				availableExerciseList,
				createExercise,
				exerciseList,
				addExercise,
				// Calories
				goalCalories,
				setGoalCalories,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
};
