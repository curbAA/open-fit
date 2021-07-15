import React, { useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

// Context
import { AppContext } from "../../components/Context/AppContext"; // General Context (App)

// Components
import MacroHeader from "./components/MacroHeader/MacroHeader";
import FoodList from "./components/List/FoodList";
import ExerciseList from "./components/List/ExerciseList";

const Diary = () => {
	const { foodList, exerciseList, goalCalories, getTotalCalories } = useContext(AppContext);

	return (
		<View style={styles.container}>
			<MacroHeader
				exerciseTotal={getTotalCalories(exerciseList)}
				foodTotal={getTotalCalories(foodList)}
				goal={goalCalories}
			/>
			<ScrollView>
				<FoodList />
				<ExerciseList />
			</ScrollView>
		</View>
	);
};

export default Diary;

const styles = StyleSheet.create({
	container: {
		marginBottom: 70,
	},
});
