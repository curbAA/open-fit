import React, { createContext, useState } from "react";

export const DiaryContext = createContext();

export const DiaryContextProvider = (props) => {
	const [displayFoodList, setDisplayFoodList] = useState(true);
	const [displayFoodOverlay, setDisplayFoodOverlay] = useState(false);

	const [displayExerciseList, setDisplayExerciseList] = useState(true);
	const [displayExerciseOverlay, setDisplayExerciseOverlay] = useState(false);

	const toggleFoodList = () => {
		setDisplayFoodList(!displayFoodList);
	};

	const toggleFoodOverlay = () => {
		setDisplayFoodOverlay(!displayFoodOverlay);
	};

	const toggleExerciseList = () => {
		setDisplayExerciseList(!displayExerciseList);
	};

	const toggleExerciseOverlay = () => {
		setDisplayExerciseOverlay(!displayExerciseOverlay);
	};

	return (
		<DiaryContext.Provider
			value={{
				// Food
				displayFoodList,
				displayFoodOverlay,
				toggleFoodList,
				toggleFoodOverlay,
				// Exercise
				displayExerciseList,
				displayExerciseOverlay,
				toggleExerciseList,
				toggleExerciseOverlay,
			}}
		>
			{props.children}
		</DiaryContext.Provider>
	);
};

export default DiaryContext;
