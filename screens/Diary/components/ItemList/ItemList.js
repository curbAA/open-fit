import React, { useContext } from "react";

//  Context
import { DiaryContext } from "../Context/DiaryContext";

// Components
import ListItem from "./components/ListItem/ListItem";

const ItemList = ({ list, type }) => {
	const { displayFoodList, displayExerciseList } = useContext(DiaryContext);

	return (
		<>
			{list.map((item, index) => {
				if (type == "food" && displayFoodList) {
					return <ListItem.Food food={item} key={index} />;
				} else if (type == "exercise" && displayExerciseList) {
					return <ListItem.Exercise exercise={item} key={index} />;
				}
			})}
		</>
	);
};

export default ItemList;
