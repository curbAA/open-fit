import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";

const Header = ({ title }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 14,
		paddingVertical: 8,
		backgroundColor: "cornflowerblue",
	},
	title: {
		color: "white",
		fontSize: 16,
	},
});

export default Header;
