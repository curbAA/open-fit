import React, { useContext, useState } from "react";

// Context
import { AppContext } from "openfit/components/Context/AppContext";

// Components
import Header from "./components/Header/Header";
import ItemList from "./components/ItemList/ItemList";
import AddExerciseForm from "./components/AddItemForm/AddExerciseForm";
import AddItemButton from "openfit/components/AddItemButton/AddItemButton";

const ExerciseList = () => {
	const { exerciseList, getTotalCalories, roundNumber } = useContext(AppContext);

	const [displayList, setDisplayList] = useState(true);
	const [displayOverlay, setDisplayOverlay] = useState(false);

	const toggleList = () => {
		setDisplayList(!displayList);
	};

	const toggleOverlay = () => {
		setDisplayOverlay(!displayOverlay);
	};

	// Shows the list when if it's hidden when the overlay is called
	const toggleListWhenOverlay = () => {
		if (displayList) {
			toggleOverlay();
		} else {
			toggleOverlay();
			toggleList();
		}
	};

	return (
		<>
			<Header
				title="EXERCISE"
				toggleList={toggleList}
				displayList={displayList}
				toggleOverlay={toggleListWhenOverlay}
				totalCalories={roundNumber(getTotalCalories("exercise"), 0)}
			/>
			<ItemList type="exercise" list={exerciseList} displayList={displayList} />
			<AddItemButton onPress={toggleOverlay} title="Add Exercise" />
			<AddExerciseForm displayOverlay={displayOverlay} toggleOverlay={toggleOverlay} />
		</>
	);
};

export default ExerciseList;
