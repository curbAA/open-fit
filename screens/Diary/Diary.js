import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

// Components
import MacroHeader from "./components/MacroHeader/MacroHeader";
import Header from "./components/Header/Header";
import ListItem from "./components/ListItem/ListItem";

const Diary = () => {
	const [foodList, setFoodList] = useState([
		{
			name: "Egg",
			amount: 2,
			unit: "units",
			kcal: 75,
		},
		{
			name: "Cheese",
			amount: 143,
			unit: "g",
			kcal: 2,
		},
		{
			name: "Milk",
			amount: 200,
			unit: "ml",
			kcal: 0.7,
		},
		{
			name: "Steak",
			amount: 245,
			unit: "g",
			kcal: 1.7,
		},
	]);
	const [exerciseList, setExerciseList] = useState([
		{
			name: "Burpees",
			minutes: 20,
			kcal: 251,
		},
		{
			name: "Running",
			minutes: 20,
			kcal: 217,
		},
		{
			name: "Weightlifting",
			minutes: 20,
			kcal: 195,
		},
		{
			name: "Weightlifting",
			minutes: 20,
			kcal: 195,
		},
	]);

	const getTotalCal = (list) => {
		let totalCalories = 0;
		list.map((l) => {
			totalCalories += l.amount == undefined ? -l.kcal : l.kcal * l.amount;
		});
		return Math.round(totalCalories);
	};

	return (
		<View style={styles.container}>
			<MacroHeader />
			<ScrollView>
				<Header title="FOOD" totalCalories={getTotalCal(foodList)} />
				{foodList.map((l, i) => (
					<ListItem.Food food={l} key={i} />
				))}
				<Header title="EXERCISE" totalCalories={getTotalCal(exerciseList)} />
				{exerciseList.map((l, i) => (
					<ListItem.Exercise exercise={l} key={i} />
				))}
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
