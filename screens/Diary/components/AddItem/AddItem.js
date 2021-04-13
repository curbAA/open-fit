import React, { useState } from "react";
import { Button, Overlay, Text, Input, Divider } from "react-native-elements";
import { View, StyleSheet, Dimensions } from "react-native";

// Food Components
import DropdownPicker from "./components/AddFood/DropdownPicker/DropdownPicker";
import AmountInput from "./components/AddFood/AmountInput/AmountInput";
import ButtonContainer from "./components/General/ButtonContainer/ButtonContainer";

// Exercise Components
import OverlayContent from "./components/AddExercise/OverlayContent/OverlayContent";

const availableFoodList = [
	{
		label: "Egg",
		value: "egg",
		unit: "units",
		kcal: 75,
	},
	{
		label: "Cheese",
		value: "cheese",
		unit: "g",
		kcal: 2,
	},
	{
		label: "Milk",
		value: "milk",
		unit: "ml",
		kcal: 0.7,
	},
	{
		label: "Steak",
		value: "steak",
		unit: "g",
		kcal: 1.7,
	},
	{
		label: "Steak",
		value: "fefe",
		unit: "g",
		kcal: 1.7,
	},
	{
		label: "Steak",
		value: "sasdasteak",
		unit: "g",
		kcal: 1.7,
	},
];

const AddFood = () => {
	const [visible, setVisible] = useState(false);

	const [selectedFood, setSelectedFood] = useState("");
	const [unit, setUnit] = useState("");
	const [calories, setCalories] = useState("");
	const [amount, setAmount] = useState("");

	const toggleOverlay = () => {
		setVisible(!visible);
	};

	const cancelOperation = () => {};

	const addFood = () => {};

	return (
		<View style={styles.container}>
			<Button title="Add Food" onPress={toggleOverlay} />

			<Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
				<View style={styles.overlay}>
					<Text style={styles.title}>Add Food</Text>
					<Divider style={styles.divider} />
					<View style={styles.content}>
						<DropdownPicker
							list={availableFoodList}
							value={selectedFood}
							setCalories={setCalories}
							setSelectedFood={setSelectedFood}
							setUnit={setUnit}
						/>
						<AmountInput
							unit={unit}
							calories={calories}
							amount={amount}
							setAmount={setAmount}
						/>
						<ButtonContainer />
					</View>
				</View>
			</Overlay>
		</View>
	);
};

const AddExercise = () => {
	const [visible, setVisible] = useState(false);

	// Exercise Data
	const [name, setName] = useState("");
	const [time, setTime] = useState("");
	const [calories, setCalories] = useState("");

	const toggleOverlay = () => {
		setVisible(!visible);
	};

	return (
		<View style={styles.container}>
			<Button title="Add Exercise" onPress={toggleOverlay} />

			<Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
				<View style={styles.overlay}>
					<Text style={styles.title}>Add Exercise</Text>
					<Divider style={styles.divider} />
					<View style={styles.content}>
						<OverlayContent
							name={name}
							setName={setName}
							time={time}
							setTime={setTime}
							calories={calories}
							setCalories={setCalories}
						/>
						<ButtonContainer />
					</View>
				</View>
			</Overlay>
		</View>
	);
};

const AddItem = {
	Exercise: AddExercise,
	Food: AddFood,
};

export default AddItem;

const styles = StyleSheet.create({
	container: {
		margin: 16,
		flexDirection: "column",
	},
	overlay: {
		flexDirection: "column",
		flexWrap: "nowrap",
		width: Dimensions.get("window").width * 0.87,
	},
	content: {
		margin: 10,
	},
	divider: {
		marginBottom: 20,
		marginTop: 10,
	},
	title: {
		color: "cornflowerblue",
		fontSize: 16,
	},
});
