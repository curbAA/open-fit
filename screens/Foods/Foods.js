import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Foods = () => {
	return (
		<View style={styles.container}>
			<Text>Foods</Text>
		</View>
	);
};

export default Foods;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
