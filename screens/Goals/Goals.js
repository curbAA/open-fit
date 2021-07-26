import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Text } from "react-native-elements";

// Context
import { AppContext } from "openfit/components/Context/AppContext";

const Goals = () => {
	const { goalCalories, editGoalCalories } = useContext(AppContext);

	const [newGoalCalories, setNewGoalCalories] = useState("");

	const handleChange = (value) => {
		setNewGoalCalories(value);
	};

	const saveGoalCalories = () => {
		editGoalCalories(newGoalCalories);
		setNewGoalCalories("");
	};

	return (
		<View style={styles.container}>
			<Title goalCalories={goalCalories} />
			<Form
				handleChange={handleChange}
				newGoalCalories={newGoalCalories}
				saveGoalCalories={saveGoalCalories}
			/>
		</View>
	);
};

export default Goals;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		margin: 10,
	},
});

//
// ─── COMPONENTS ─────────────────────────────────────────────────────────────────
//

const Title = ({ goalCalories }) => {
	return (
		<View styles={titleStyles.container}>
			<Text h4 style={[titleStyles.text, titleStyles.textTop]}>
				GOAL CALORIES
			</Text>
			<Text h1 style={[titleStyles.text, titleStyles.textBottom]}>
				{goalCalories}
			</Text>
		</View>
	);
};

const titleStyles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		textAlign: "center",
		backgroundColor: "black",
	},
	text: {
		textAlign: "center",
	},
	textTop: {},
	textBottom: {
		color: "green",
	},
});

const Form = ({ handleChange, newGoalCalories, saveGoalCalories }) => {
	const [inputMessage, setInputMessage] = useState("");

	const showInputMessage = (message, time) => {
		setInputMessage(message);
		setTimeout(() => {
			setInputMessage("");
		}, time);
	};

	const save = () => {
		showInputMessage("Changes Applied", 1500);
		saveGoalCalories();
	};

	return (
		<View style={formStyles.form}>
			<Input
				placeholder="Goal Calories"
				errorMessage={inputMessage}
				errorStyle={{ color: "green" }}
				onChangeText={(value) => handleChange(value)}
				value={newGoalCalories.toString()}
				keyboardType="number-pad"
				containerStyle={formStyles.inputContainer}
				inputStyle={formStyles.inputInput}
			/>
			<Button containerStyle={formStyles.button} title="Apply" onPress={save} />
		</View>
	);
};

const formStyles = StyleSheet.create({
	form: {
		flex: 1,
		flexDirection: "row",
		paddingTop: 10,
	},
	inputContainer: {
		flex: 3,
	},
	inputInput: {
		paddingBottom: 0,
		paddingLeft: 10,
	},
	button: {
		flex: 1,
	},
});
