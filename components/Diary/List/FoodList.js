import React, { useContext, useState } from "react";

// Context
import { AppContext } from "openfit/components/Context/AppContext";

// Components
import Header from "./components/Header/Header";
import ItemList from "./components/ItemList/ItemList";
import AddFoodForm from "./components/AddItemForm/AddFoodForm";
import AddItemButton from "openfit/components/AddItemButton/AddItemButton";

// TODO create addExercise button at end of list

const FoodList = () => {
	const { foodList, getTotalCalories, roundNumber } = useContext(AppContext);

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
				title="FOOD"
				toggleList={toggleList}
				displayList={displayList}
				toggleOverlay={toggleListWhenOverlay}
				totalCalories={roundNumber(getTotalCalories("food"),0)}
			/>
			<ItemList type="food" list={foodList} displayList={displayList} />
			<AddItemButton title="Add Food" onPress={toggleOverlay} />
			<AddFoodForm displayOverlay={displayOverlay} toggleOverlay={toggleOverlay} />
		</>
	);
};

export default FoodList;
