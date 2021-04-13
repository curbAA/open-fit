import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Display = ({ calories, subtitle, green }) => {
	return (
		<View style={styles.container}>
			<Text style={[styles.calories, { color: green ? "limegreen" : "black" }]}>{calories}</Text>
			<Text style={styles.subtitle}>{subtitle}</Text>
		</View>
	);
};

export default Display;

const styles = StyleSheet.create({
	container: {
		textAlign: "center",
	},
	calories: {
		textAlign: "center",
	},
	subtitle: {
		textAlign: "center",
		fontSize: 10,
		color: "gray",
	},
});
