import React from "react";

// Components
import ListItem from "./ListItem";

// TODO implement edit item functionality (modal or text-to-input)

const ItemList = ({ list, type, displayList }) => {
	if (displayList) {
		return (
			<>
				{list.map((item) => {
					if (type == "food") {
						return <ListItem.Food key={item.id} item={item} />;
					} else if (type == "exercise") {
						return <ListItem.Exercise key={item.id} item={item} />;
					}
				})}
			</>
		);
	} else {
		return <></>;
	}
};

export default ItemList;
