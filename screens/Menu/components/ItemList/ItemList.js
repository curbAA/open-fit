import React from "react";
import uuid from "react-uuid";

// Components
import ListItem from "./components/ListItem/ListItem";

const ItemList = ({ list, type, displayList }) => {
	if (displayList) {
		return (
			<>
				{list.map((item) => {
					if (type == "food") {
						return <ListItem.Food key={uuid()} food={item} />;
					} else if (type == "exercise") {
						return <ListItem.Exercise key={uuid()} exercise={item} />;
					}
				})}
			</>
		);
	} else {
		return <></>;
	}
};

export default ItemList;
