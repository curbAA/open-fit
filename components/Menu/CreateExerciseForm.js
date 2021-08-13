import React, { useContext, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Overlay, Text, Input, Divider, Button } from "react-native-elements";

// Context
import { AppContext } from "openfit/components/Context/AppContext";

// Components
import ErrorMessage from "openfit/components/FormErrorMessage/ErrorMessage";

const ExerciseForm = ({ toggleOverlay, displayOverlay }) => {
	const { createAvailableExercise } = useContext(AppContext);

	const exerciseDefault = {
		label: "",
		common: 0,
		kcal: 0,
	};

	const [newAvailableExercise, setNewAvailableExercise] = useState(exerciseDefault);

	// ─── INPUT ERROR MESSAGE ────────────────────────────────────────────────────────
	const [displayError, setDisplayError] = useState(false);
	// ────────────────────────────────────────────────────────────────────────────────

	const handleChange = (value, data) => {
		let placeholderExericse = newAvailableExercise;
		placeholderExericse[value] = data;
		setNewAvailableExercise(placeholderExericse);
		setDisplayError(false);
	};

	const storeData = () => {
		createAvailableExercise({
			label: newAvailableExercise.label,
			common: newAvailableExercise.common,
			kcal: newAvailableExercise.kcal,
		})
			.then((result) => {
				setNewAvailableExercise(exerciseDefault);
				toggleOverlay();
			})
			.catch((error) => {
				setDisplayError(true);
			});
	};

	return (
		<View style={styles.container}>
			<Overlay
				isVisible={displayOverlay}
				onBackdropPress={() => {
					toggleOverlay();
					setDisplayError(false);
				}}
			>
				<View style={styles.overlay}>
					<Text style={styles.title}>Create Exericse</Text>
					<Divider style={styles.divider} />
					<View style={{ marginVertical: 30 }}>
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
						<ErrorMessage displayError={displayError} />
					</View>
					<View style={styles.buttonContainer}>
						<Button buttonStyle={styles.button} onPress={storeData} title="Save" />
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
		paddingHorizontal: 10,
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
