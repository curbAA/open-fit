import React from "react";
import { StyleSheet, Text, View } from "react-native";

const GoalBanner = ({ goalCalories }) => {
	return (
		<View style={styles.goalCalories}>
			<Text style={styles.goalHeader}>Goal</Text>
			<Text style={styles.goalValue}>{goalCalories} kcal</Text>
		</View>
	);
};

export default GoalBanner;

const styles = StyleSheet.create({
	goalCalories: {
		flexDirection: "column",
		marginRight: 20,
		borderWidth: 1,
		borderColor: "#888",
		borderRadius: 10,
		paddingVertical: 5,
		paddingHorizontal: 10,
	},
	goalHeader: {
		textAlign: "center",
		fontWeight: "bold",
		marginBottom: 5,
	},
	goalValue: {
		fontWeight: "100",
	},
});
