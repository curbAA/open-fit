import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";

const ButtonContainer = () => {
	return (
		<View style={styles.buttonContainer}>
			<Button
				type="outline"
				buttonStyle={[styles.button, styles.cancelButton]}
				title="Cancel"
			/>
			<Button buttonStyle={[styles.button, styles.addButton]} title="Add" />
		</View>
	);
};

export default ButtonContainer;

const styles = StyleSheet.create({
	buttonContainer: {
		marginTop: 10,
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	button: {
		width: 100,
	},
	addButton: {},
	cancelButton: {
		marginRight: 16,
	},
});
