import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";

// Components
import ItemList from "../../components/ItemList/ItemList";
import AddItemButton from "openfit/components/AddItemButton/AddItemButton";
import FoodForm from "./CreateFoodForm";

const FoodMenu = ({ availableFoodList }) => {
	const [displayOverlay, setDisplayOverlay] = useState(false);

	const toggleOverlay = () => {
		setDisplayOverlay(!displayOverlay);
	};

	return (
		<View style={styles.container}>
			<ScrollView>
				<ItemList type="food" displayList={true} list={availableFoodList} />
				<AddItemButton title="Create Food" onPress={toggleOverlay} />
				<FoodForm
					displayOverlay={displayOverlay}
					toggleOverlay={toggleOverlay}
				/>
			</ScrollView>
		</View>
	);
};

export default FoodMenu;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
