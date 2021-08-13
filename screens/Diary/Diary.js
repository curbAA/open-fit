import React, { useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

// Context
import { AppContext } from "openfit/components/Context/AppContext"; // General Context (App)

// Components
import MacroHeader from "openfit/components/Diary/MacroHeader/MacroHeader";
import FoodList from "openfit/components/Diary/List/FoodList";
import ExerciseList from "openfit/components/Diary/List/ExerciseList";

const Diary = () => {
	const { goalCalories, getTotalCalories } = useContext(AppContext);

	return (
		<View style={styles.container}>
			<MacroHeader
				exerciseTotal={getTotalCalories("exercise")}
				foodTotal={getTotalCalories("food")}
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
