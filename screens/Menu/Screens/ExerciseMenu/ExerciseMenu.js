import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";

// Components
import ItemList from "../../components/ItemList/ItemList";
import AddItemButton from "openfit/components/AddItemButton/AddItemButton";
import ExerciseForm from "./ExerciseForm";

const ExerciseMenu = ({ availableExerciseList }) => {
	const [displayOverlay, setDisplayOverlay] = useState(false);

	const toggleOverlay = () => {
		setDisplayOverlay(!displayOverlay);
	};

	return (
		<View style={styles.container}>
			<ScrollView>
				<ItemList type="exercise" displayList={true} list={availableExerciseList} />
				<AddItemButton title="Create Exercise" onPress={toggleOverlay} />
				<ExerciseForm displayOverlay={displayOverlay} toggleOverlay={toggleOverlay} />
			</ScrollView>
		</View>
	);
};

export default ExerciseMenu;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
