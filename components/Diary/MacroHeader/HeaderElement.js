import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Element = ({ calories, subtitle, green }) => {
	return (
		<View style={styles.container}>
			<Text style={[styles.calories, { color: green ? "limegreen" : "black" }]}>{calories}</Text>
			<Text style={styles.subtitle}>{subtitle}</Text>
		</View>
	);
};

export default Element;

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
