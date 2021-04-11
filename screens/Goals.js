import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Goals = () => {
	return (
		<View style={styles.container}>
			<Text>Goals</Text>
		</View>
	);
};

export default Goals;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
