import React, { useContext, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Overlay, Text, Input, Divider, Button, ButtonGroup } from "react-native-elements";

// Context
import { AppContext } from "openfit/components/Context/AppContext";

// TODO Show visible error when user leaves fields on blank

const FoodForm = ({ toggleOverlay, displayOverlay }) => {
	const { createAvailableFood } = useContext(AppContext);

	const [selectedUnit, setSelectedUnit] = useState(0);
	const FOOD_UNITS = ["g", "ml", "oz"];

	const handleUnitChange = (index) => {
		setSelectedUnit(index);
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
					<ButtonGroup
						onPress={(index) => handleUnitChange(index)}
						selectedIndex={selectedUnit}
						buttons={FOOD_UNITS}
						containerStyle={{ borderColor: "#999", borderWidth: 1, marginBottom: 30 }}
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
