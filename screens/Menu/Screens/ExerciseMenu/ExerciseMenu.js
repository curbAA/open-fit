import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ExerciseMenu = () => {
	return (
		<View style={styles.container}>
			<Text>Exercise Menu</Text>
		</View>
	);
};

export default ExerciseMenu;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
