import React, { useContext, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Overlay, Text, Input, Divider, Button, ButtonGroup } from "react-native-elements";

// Context
import { AppContext } from "openfit/components/Context/AppContext";

// TODO Show visible error when user leaves fields on blank

const FoodForm = ({ toggleOverlay, displayOverlay }) => {
	const { createAvailableFood } = useContext(AppContext);

	const [selectedUnitIndex, setSelectedUnitIndex] = useState(0);
	const FOOD_UNITS = ["g", "ml", "oz"];

	const handleUnitChange = (index) => {
		setSelectedUnitIndex(index);
		handleChange("unit", FOOD_UNITS[index]);
	};

	const foodDefault = {
		label: "",
		common: 0,
		kcal: 0,
		unit: "g",
	};

	const [newAvailableFood, setNewAvailableFood] = useState(foodDefault);

	const handleChange = (value, data) => {
		let placeholderFood = newAvailableFood;
		placeholderFood[value] = data;
		setNewAvailableFood(placeholderFood);
	};

	const storeData = () => {
		createAvailableFood({
			label: newAvailableFood.label,
			common: newAvailableFood.common,
			unit: newAvailableFood.unit,
			kcal: newAvailableFood.kcal,
		});
		setNewAvailableFood(foodDefault);
		toggleOverlay();
	};

	return (
		<View style={styles.container}>
			<Overlay isVisible={displayOverlay} onBackdropPress={toggleOverlay}>
				<View style={styles.overlay}>
					<Text style={styles.title}>Create Food</Text>
					<Divider style={styles.divider} />
					<View style={{ marginVertical: 30 }}>
						<Input
						containerStyle={{width:250}}
							onChangeText={(data) => {
								handleChange("label", data);
							}}
							placeholder="Food Name"
						/>
						<View style={styles.commonServingContainer}>
							<Input
								containerStyle={{ flex: 3 }}
								keyboardType="number-pad"
								placeholder="Common Serving"
								onChangeText={(data) => {
									handleChange("common", data);
								}}
							/>
							<Text style={{ flex: 0.8, textAlignVertical: "center", color: "#666" }}>
								{FOOD_UNITS[selectedUnitIndex]}
							</Text>
							<Input
								containerStyle={{ flex: 2 }}
								placeholder="Calories"
								onChangeText={(data) => {
									handleChange("kcal", data);
								}}
								keyboardType="number-pad"
							/>
						</View>
						<ButtonGroup
							onPress={(index) => handleUnitChange(index)}
							selectedIndex={selectedUnitIndex}
							buttons={FOOD_UNITS}
							containerStyle={{ borderColor: "#999", borderWidth: 1 }}
						/>
					</View>
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
};

export default FoodForm;

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
	// ────────────────────────────────────────────────────────────────────────────────
	commonServingContainer: {
		display: "flex",
		flexDirection: "row",
		height: 60,
	},
	// ────────────────────────────────────────────────────────────────────────────────
	buttonContainer: {
		flexDirection: "row-reverse",
	},
	button: {
		width: 100,
		margin: 5,
	},
});
