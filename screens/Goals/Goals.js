import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";

// Components
import Form from "openfit/components/Goals/Form"

// Context
import { AppContext } from "openfit/components/Context/AppContext";

const Goals = () => {
	const { goalCalories, editGoalCalories } = useContext(AppContext);

	return (
		<View style={styles.container}>
			<Text style={{ textAlign: "center" }} h3>
				BMI Calculator
			</Text>
			<Form saveNewCalories={editGoalCalories} />
		</View>
	);
};

export default Goals;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 10,
	},
});
