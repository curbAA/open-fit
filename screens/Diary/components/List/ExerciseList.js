import React, { useContext, useState } from "react";

// Context
import { AppContext } from "openfit/components/Context/AppContext";

// Components
import Header from "./components/Header/Header";
import ItemList from "./components/ItemList/ItemList";
import AddExerciseForm from "./components/AddItemForm/AddExerciseForm";

// TODO create addExercise button at end of list

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
				displayList={displayList}
				toggleOverlay={toggleOverlay}
				totalCalories={getTotalCalories("exercise")}
			/>
			<ItemList type="exercise" list={exerciseList} displayList={displayList} />
			<AddExerciseForm displayOverlay={displayOverlay} toggleOverlay={toggleOverlay} />
		</>
	);
};

export default ExerciseList;
