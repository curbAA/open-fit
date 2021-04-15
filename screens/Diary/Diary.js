import React, { useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

// Context
import { AppContext } from "../../components/Context/AppContext"; // General Context (App)
import { DiaryContextProvider } from "./components/Context/DiaryContext"; // Local Context (Diary)
import { DiaryContext } from "./components/Context/DiaryContext";

// Components
import MacroHeader from "./components/MacroHeader/MacroHeader";
import Header from "./components/Header/Header";
import ItemList from "./components/ItemList/ItemList";
import AddFood from "./components/AddItem/AddFood";
import AddExercise from "./components/AddItem/AddExercise";

const Diary = () => {
	const { foodList, exerciseList, goalCalories } = useContext(AppContext);
	const getTotalCal = (list) => {
		let totalCalories = 0;
		list.map((l) => {
			totalCalories +=
				l.amount == undefined ? l.kcal * l.time : l.kcal * l.amount;
		});
		return Math.round(totalCalories);
	};

	return (
		<DiaryContextProvider>
			<View style={styles.container}>
				<MacroHeader
					exerciseTotal={getTotalCal(exerciseList)}
					foodTotal={getTotalCal(foodList)}
					goal={goalCalories}
				/>
				<ScrollView>
					<Header title="FOOD" totalCalories={getTotalCal(foodList)} />
					<ItemList type="food" list={foodList} />
					<AddFood />
					<Header title="EXERCISE" totalCalories={getTotalCal(exerciseList)} />
					<ItemList type="exercise" list={exerciseList} />
					<AddExercise />
				</ScrollView>
			</View>
		</DiaryContextProvider>
	);
};

export default Diary;

const styles = StyleSheet.create({
	container: {
		marginBottom: 70,
	},
});
