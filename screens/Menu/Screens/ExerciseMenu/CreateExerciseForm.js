import React, { useContext, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Overlay, Text, Input, Divider, Button } from "react-native-elements";

// Context
import { AppContext } from "openfit/components/Context/AppContext";

// TODO show visible error when user leaves fields on blank
// TODO show calories input next to common time input with "min" in the middle

const ExerciseForm = ({ toggleOverlay, displayOverlay }) => {
	const { createAvailableExercise } = useContext(AppContext);

	const exerciseDefault = {
		label: "",
		common: 0,
		kcal: 0,
	};

	const [newAvailableExercise, setNewAvailableExercise] = useState(exerciseDefault);

	const handleChange = (value, data) => {
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

	const storeData = () => {
		if (type == "food") {
			createAvailableFood({
				label: newAvailableFood.label,
				common: newAvailableFood.common,
				unit: newAvailableFood.unit,
				kcal: newAvailableFood.kcal,
			});
			setNewAvailableFood(foodDefault);
		} else if (type == "exercise") {
			createAvailableExercise({
				label: newAvailableExercise.label,
				common: newAvailableExercise.common,
				kcal: newAvailableExercise.kcal,
			});
			setNewAvailableExercise(exerciseDefault);
		}
		toggleOverlay();
	};

	return (
		<View style={styles.container}>
			<Overlay isVisible={displayOverlay} onBackdropPress={toggleOverlay}>
				<View style={styles.overlay}>
					<Text style={styles.title}>Create Exericse</Text>
					<Divider style={styles.divider} />
					<View style={{marginVertical:30}}>
						<Input
							containerStyle={{ width: 250 }}
							onChangeText={(data) => {
								handleChange("label", data);
							}}
							placeholder="Exercise Name"
						/>
						<View style={{ height: 60, flexDirection: "row" }}>
							<Input
								containerStyle={{ flex: 2 }}
								placeholder="Common Time"
								onChangeText={(data) => {
									handleChange("common", data);
								}}
								keyboardType="number-pad"
							/>
							<Text style={{ textAlignVertical: "center", flex: 0.6, color: "#666" }}>min</Text>
							<Input
								containerStyle={{ flex: 1.5 }}
								onChangeText={(data) => {
									handleChange("kcal", data);
								}}
								keyboardType="number-pad"
								placeholder="Calories"
							/>
						</View>
					</View>
					<View style={styles.buttonContainer}>
						<Button
							buttonStyle={styles.button}
							onPress={() => {
								storeData();
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
};

export default ExerciseForm;

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
