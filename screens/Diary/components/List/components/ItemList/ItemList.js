import React from "react";
import uuid from "react-uuid";

// Components
import ListItem from "./components/ListItem/ListItem";

const ItemList = ({ list, type, displayList }) => {
	return (
		<>
			{list.map((item) => {
				if (type == "food" && displayList) {
					return <ListItem.Food key={uuid()} food={item} />;
				} else if (type == "exercise" && displayList) {
					return <ListItem.Exercise key={uuid()} exercise={item} />;
				}
			})}
		</>
	);
};

export default ItemList;
