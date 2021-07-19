import React, { useContext, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Overlay, Text, Input, Divider, Button } from "react-native-elements";

//Context
import { AppContext } from "openfit/components/Context/AppContext";

const AddItemOverlay = ({ type: returnType, displayOverlay, toggleOverlay }) => {
	const { createAvailableFood, createAvailableExercise } = useContext(AppContext);

	const foodDefault = {
		type: "food",
		value: "",
		label: "",
		common: 0,
		unit: "",
		kcal: 0,
	};

	const [newAvailableFood, setNewAvailableFood] = useState(foodDefault);

	const exerciseDefault = {
		type: "exercise",
		value: "",
		label: "",
		common: 0,
		unit: "min",
		kcal: 0,
	};

	const [newAvailableExercise, setNewAvailableExercise] = useState(exerciseDefault);

	const handleChange = (type, value, data) => {
		if (type == "food") {
			let placeholderFood = newAvailableFood;
			placeholderFood[value] = data;
			setNewAvailableFood(placeholderFood);
		} else if (type == "exercise") {
			let placeholderExericse = newAvailableExercise;
			placeholderExericse[value] = data;
			setNewAvailableExercise(placeholderExericse);
		}
	};

	const storeData = (type) => {
		const parseData = (raw) => {
			let parsed = raw;
			parsed.value = parsed.value;
			parsed.label = parsed.label;
			parsed.kcal = parseInt(parsed.kcal);
			parsed.unit = parsed.unit.toLowerCase();
			parsed.common = parseInt(parsed.common);
			// Label stays the same
			return parsed;
		};
		if (type == "food") {
			createAvailableFood(parseData(newAvailableFood));
			setNewAvailableFood(foodDefault);
		} else if (type == "exercise") {
			createAvailableExercise(parseData(newAvailableExercise));
			setNewAvailableExercise(exerciseDefault);
		}
		toggleOverlay();
	};

	if (returnType == "food") {
		return (
			<View style={styles.container}>
				<Overlay isVisible={displayOverlay} onBackdropPress={toggleOverlay}>
					<View style={styles.overlay}>
						<Text style={styles.title}>Create Food</Text>
						<Divider style={styles.divider} />
						<Input
							onChangeText={(data) => {
								handleChange("food", "label", data);
								handleChange("food", "value", data);
							}}
							placeholder="Food"
						/>
						<Input
							placeholder="Calories"
							onChangeText={(data) => {
								handleChange("food", "kcal", data);
							}}
							keyboardType="number-pad"
						/>
						<Input
							keyboardType="number-pad"
							placeholder="Common Serving"
							onChangeText={(data) => {
								handleChange("food", "common", data);
							}}
						/>
						<Input
							placeholder="Unit"
							onChangeText={(data) => {
								handleChange("food", "unit", data);
							}}
						/>
						<View style={styles.buttonContainer}>
							<Button buttonStyle={styles.button} title="Save" onPress={() => storeData("food")} />
							<Button
								buttonStyle={styles.button}
								type="outline"
								onPress={toggleOverlay}
								title="Cancel"
							/>
						</View>
					</View>
				</Overlay>
			</View>
		);
	} else if (returnType == "exercise") {
		return (
			<View style={styles.container}>
				<Overlay isVisible={displayOverlay} onBackdropPress={toggleOverlay}>
					<View style={styles.overlay}>
						<Text style={styles.title}>Create Exericse</Text>
						<Divider style={styles.divider} />
						<Input
							onChangeText={(data) => {
								handleChange("exercise", "label", data);
								handleChange("exercise", "value", data);
							}}
							placeholder="Exercise"
						/>
						<Input
							onChangeText={(data) => {
								handleChange("exercise", "kcal", data);
							}}
							keyboardType="number-pad"
							placeholder="Calories Burned in Common Time"
						/>
						<Input
							placeholder="Common Time"
							onChangeText={(data) => {
								handleChange("exercise", "common", data);
							}}
							keyboardType="number-pad"
						/>
						<View style={styles.buttonContainer}>
							<Button
								buttonStyle={styles.button}
								onPress={() => {
									storeData("exercise");
									console.log(newAvailableExercise);
								}}
								title="Save"
							/>
							<Button
								buttonStyle={styles.button}
								type="outline"
								onPress={toggleOverlay}
								title="Cancel"
							/>
						</View>
					</View>
				</Overlay>
			</View>
		);
	} else {
		return <></>;
	}
};

export default AddItemOverlay;

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
	},
	overlay: {
		flexDirection: "column",
		flexWrap: "nowrap",
		width: Dimensions.get("window").width * 0.87,
	},
	title: {
		color: "cornflowerblue",
		fontSize: 16,
	},
	divider: {
		marginTop: 5,
		marginBottom: 20,
		backgroundColor: "cornflowerblue",
	},

	buttonContainer: {
		flexDirection: "row-reverse",
	},
	button: {
		width: 100,
		margin: 5,
	},
});
