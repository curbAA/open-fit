import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ErrorMessage = ({ displayError, textStyle, containerStyle }) => {
	if (displayError) {
		return (
			<View style={[containerStyle, styles.container]}>
				<Text style={[textStyle, styles.text]}>Invalid Fields</Text>
			</View>
		);
	} else {
		return <></>;
	}
};

export default ErrorMessage;

const styles = StyleSheet.create({
	container: {},
	text: {
		color: "red",
	},
});
