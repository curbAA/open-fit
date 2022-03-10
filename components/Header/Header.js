import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";

const Header = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>OpenFit</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: StatusBar.currentHeight,
		padding: 14,
		backgroundColor: "cornflowerblue",
	},
	title: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default Header;
