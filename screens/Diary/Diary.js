import React, { useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-elements";

// Context
import { AppContext } from "../../components/Context/AppContext"; // General Context (App)

// Components
import MacroHeader from "./components/MacroHeader/MacroHeader";
import FoodList from "./components/List/FoodList";
import ExerciseList from "./components/List/ExerciseList";

const Diary = () => {
	const { foodList, exerciseList, goalCalories, getTotalCalories, storeData, getData } = useContext(
		AppContext
	);

	let test = {};

	const getTest = () => {
		test = getData("test");
	};

	const storeTest = () => {
		test = storeData("test", { test: "test" });
	};

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
				
				<Button onPress={storeTest} title="Store Test" />
				<Button onPress={getTest} title="Retrieve Test" />
				<Button onPress={() => console.log(test._W)} title="Test" />
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
