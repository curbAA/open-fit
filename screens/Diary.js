import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Diary = () => {
	return (
		<View style={styles.container}>
			<Text>Diary</Text>
		</View>
	);
};

export default Diary;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
