import React from "react";
import { StyleSheet, View } from "react-native";

// Components
import ItemList from "../../components/ItemList/ItemList";
import AddItemButton from "openfit/components/AddItemButton/AddItemButton";

const FoodMenu = ({ availableFoodList }) => {
	return (
		<View style={styles.container}>
			<ItemList type="food" displayList={true} list={availableFoodList} />
			<AddItemButton title="Add Food" />
		</View>
	);
};

export default FoodMenu;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
