import React, { useState, useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

// Context
import { AppContext } from "../../components/Context/AppContext";

// Components
import MacroHeader from "./components/MacroHeader/MacroHeader";
import Header from "./components/Header/Header";
import ListItem from "./components/ListItem/ListItem";
import AddItem from "./components/AddItem/AddItem";

const Diary = () => {
	const { foodList, exerciseList, goalCalories } = useContext(AppContext);

	const getTotalCal = (list) => {
		let totalCalories = 0;
		list.map((l) => {
			totalCalories += l.amount == undefined ? -l.kcal : l.kcal * l.amount;
		});
		return Math.round(totalCalories);
	};

	return (
		<View style={styles.container}>
			<MacroHeader
				exerciseTotal={getTotalCal(exerciseList)}
				foodTotal={getTotalCal(foodList)}
				goal={goalCalories}
			/>
			<ScrollView>
				<Header title="FOOD" totalCalories={getTotalCal(foodList)} />
				{foodList.map((l, i) => (
					<ListItem.Food food={l} key={i} />
				))}
				<AddItem.Food />
				<Header title="EXERCISE" totalCalories={getTotalCal(exerciseList)} />
				{exerciseList.map((l, i) => (
					<ListItem.Exercise exercise={l} key={i} />
				))}
				<AddItem.Exercise />
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
