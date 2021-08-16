import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";

// Context
import { AppContext } from "openfit/components/Context/AppContext"; // General Context (App)

// Components
import MacroHeader from "openfit/components/Diary/MacroHeader/MacroHeader";
import FoodList from "openfit/components/Diary/List/FoodList";
import ExerciseList from "openfit/components/Diary/List/ExerciseList";
import Calendar from "openfit/components/Diary/Calendar";

const Diary = () => {
	const { goalCalories, getTotalCalories } = useContext(AppContext);

	return (
		<View style={styles.container}>
			<MacroHeader
				exerciseTotal={getTotalCalories("exercise")}
				foodTotal={getTotalCalories("food")}
				goal={goalCalories}
			/>
			<Calendar />
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
