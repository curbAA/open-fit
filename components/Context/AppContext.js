import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
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
			kcal: 0.7,
		},
		{
			label: "Steak",
			value: "steak",
			unit: "g",
			kcal: 1.7,
		},
		{
			label: "Steak",
			value: "fefe",
			unit: "g",
			kcal: 1.7,
		},
		{
			label: "Steak",
			value: "sasdasteak",
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

	const [availableExerciseList, setAvailableExerciseList] = useState(); // This will be used in the future
	const [exerciseList, setExerciseList] = useState([
		{
			name: "Burpees",
			minutes: 20,
			kcal: 251,
		},
		{
			name: "Running",
			minutes: 20,
			kcal: 217,
		},
		{
			name: "Weightlifting",
			minutes: 20,
			kcal: 195,
		},
		{
			name: "Weightlifting",
			minutes: 20,
			kcal: 195,
		},
	]);

	const [goalCalories, setGoalCalories] = useState(2500);

	return (
		<AppContext.Provider
			value={{
				// Food
				availableFoodList,
				setAvailableFoodList,
				foodList,
				setFoodList,
				// Exercise
				availableExerciseList,
				setAvailableExerciseList,
				exerciseList,
				setExerciseList,
				// Calories
				goalCalories,
				setGoalCalories,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
};
