import React, { useContext, useState } from "react";

// Context
import { AppContext } from "openfit/components/Context/AppContext";

// Components
import Header from "./components/Header/Header";
import ItemList from "./components/ItemList/ItemList";
import AddFood from "./components/AddItem/AddFood";

const FoodList = () => {
	const { foodList, getTotalCalories } = useContext(AppContext);

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
				title="FOOD"
				toggleList={toggleList}
				displayList={displayList}
				toggleOverlay={toggleOverlay}
				totalCalories={getTotalCalories(foodList)}
			/>
			<ItemList type="food" list={foodList} displayList={displayList} />
			<AddFood displayOverlay={displayOverlay} toggleOverlay={toggleOverlay} />
		</>
	);
};

export default FoodList;
