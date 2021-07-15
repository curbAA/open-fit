import React from "react";
import { StyleSheet, Text, View } from "react-native";

const FoodMenu = () => {
	return (
		<View style={styles.container}>
			<Text>Food Menu</Text>
		</View>
	);
};

export default FoodMenu;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
