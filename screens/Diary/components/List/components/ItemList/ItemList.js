import React from "react";

// Components
import ListItem from "./components/ListItem/ListItem";

const ItemList = ({ list, type, displayList }) => {
	return (
		<>
			{list.map((item) => {
				if (type == "food" && displayList) {
					return <ListItem.Food food={item} />;
				} else if (type == "exercise" && displayList) {
					return <ListItem.Exercise exercise={item} />;
				}
			})}
		</>
	);
};

export default ItemList;
