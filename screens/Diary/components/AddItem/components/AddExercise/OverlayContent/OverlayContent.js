import React from "react";
import { StyleSheet, View } from "react-native";
import { Input, Text } from "react-native-elements";

const OverlayContent = ({
	name,
	setName,
	time,
	setTime,
	calories,
	setCalories,
}) => {
	return (
		<>
			<Input
				placeholder="Name"
				onChangeText={(value) => setName(value)}
				defaultValue={name}
			/>
			<View style={styles.inputContainer}>
				<Input
					keyboardType="number-pad"
					placeholder="Time"
					containerStyle={styles.input}
					onChangeText={(value) => setTime(value)}
					defaultValue={time}
				/>
				<Text style={styles.inputText}>Minutes</Text>
			</View>
			<View style={styles.inputContainer}>
				<Input
					keyboardType="number-pad"
					placeholder="Calories"
					containerStyle={styles.input}
					onChangeText={(value) => setCalories(value)}
					defaultValue={calories}
				/>
				<Text style={styles.inputText}>Kcal</Text>
			</View>
		</>
	);
};

export default OverlayContent;

const styles = StyleSheet.create({
	inputContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center",
	},
	input: {
		width: 250,
	},
	inputText: {
		color: "gray",
	},
});
