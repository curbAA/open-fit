import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";

// Components
import Form from "openfit/components/Goals/Form";
import GoalBanner from "openfit/components/Goals/GoalBanner";

// Context
import { AppContext } from "openfit/components/Context/AppContext";

const Goals = () => {
	const { goalCalories, editGoalCalories } = useContext(AppContext);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text h3>BMI Calculator</Text>
				<GoalBanner goalCalories={goalCalories} />
			</View>
			<Form saveNewCalories={editGoalCalories} />
		</View>
	);
};

export default Goals;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 10,
		marginTop: 20,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
});
