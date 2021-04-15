import React, { useContext, useState } from "react";

// Context
import { AppContext } from "../../../../components/Context/AppContext";

// Components
import Header from "./components/Header/Header";
import ItemList from "./components/ItemList/ItemList";
import AddExercise from "./components/AddItem/AddExercise";

const ExerciseList = () => {
	const { exerciseList, getTotalCalories } = useContext(AppContext);

	const [displayList, setDisplayList] = useState(true);
	const [displayOverlay, setDisplayOverlay] = useState(false);

	const toggleList = () => {
		setDisplayList(!displayList);
	};

	const toggleOverlay = () => {
		setDisplayOverlay(!displayOverlay);
	};

	return (
		<>
			<Header
				title="EXERCISE"
				toggleList={toggleList}
				toggleOverlay={toggleOverlay}
				totalCalories={getTotalCalories(exerciseList)}
			/>
			<ItemList type="exercise" list={exerciseList} displayList={displayList} />
			<AddExercise
				displayOverlay={displayOverlay}
				toggleOverlay={toggleOverlay}
			/>
		</>
	);
};

export default ExerciseList;
