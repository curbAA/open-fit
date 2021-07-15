import React from "react";
import { StyleSheet, View } from "react-native";

// Components
import ItemList from "../../components/ItemList/ItemList";
import AddItemButton from "../../../../components/AddItemButton/AddItemButton";

const ExerciseMenu = ({ availableExerciseList }) => {
	return (
		<View style={styles.container}>
			<ItemList type="exercise" displayList={true} list={availableExerciseList} />
			<AddItemButton title="Add Exercise" />
		</View>
	);
};

export default ExerciseMenu;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
