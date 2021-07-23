import React, { useContext, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Overlay, Text, Input, Divider, Button } from "react-native-elements";

//Context
import { AppContext } from "openfit/components/Context/AppContext";

const AddItemOverlay = ({ type, displayOverlay, toggleOverlay }) => {
	const { createAvailableFood, createAvailableExercise } = useContext(AppContext);

	const foodDefault = {
		label: "",
		common: 0,
		kcal: 0,
	};

	const [newAvailableFood, setNewAvailableFood] = useState(foodDefault);

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

	if (type == "food") {
		return (
			<View style={styles.container}>
				<Overlay isVisible={displayOverlay} onBackdropPress={toggleOverlay}>
					<View style={styles.overlay}>
						<Text style={styles.title}>Create Food</Text>
						<Divider style={styles.divider} />
						<Input
							onChangeText={(data) => {
								handleChange("label", data);
							}}
							placeholder="Food"
						/>
						<Input
							placeholder="Calories"
							onChangeText={(data) => {
								handleChange("kcal", data);
							}}
							keyboardType="number-pad"
						/>
						<Input
							keyboardType="number-pad"
							placeholder="Common Serving"
							onChangeText={(data) => {
								handleChange("common", data);
							}}
						/>
						<Input
							placeholder="Unit"
							onChangeText={(data) => {
								handleChange("unit", data);
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
	} else if (type == "exercise") {
		return (
			<View style={styles.container}>
				<Overlay isVisible={displayOverlay} onBackdropPress={toggleOverlay}>
					<View style={styles.overlay}>
						<Text style={styles.title}>Create Exericse</Text>
						<Divider style={styles.divider} />
						<Input
							onChangeText={(data) => {
								handleChange("label", data);
							}}
							placeholder="Exercise"
						/>
						<Input
							onChangeText={(data) => {
								handleChange("kcal", data);
							}}
							keyboardType="number-pad"
							placeholder="Calories Burned in Common Time"
						/>
						<Input
							placeholder="Common Time"
							onChangeText={(data) => {
								handleChange("common", data);
							}}
							keyboardType="number-pad"
						/>
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
