import React from "react";

// Components
import ListItem from "./ListItem";

const ItemList = ({ list, type, displayList }) => {
	if (displayList) {
		return (
			<>
				{list.map((item) => {
					if (type == "food") {
						return <ListItem.Food key={item.id} food={item} />;
					} else if (type == "exercise") {
						return <ListItem.Exercise key={item.id} exercise={item} />;
					}
				})}
			</>
		);
	} else {
		return <></>;
	}
};

export default ItemList;
