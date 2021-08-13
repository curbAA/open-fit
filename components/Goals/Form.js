import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, ButtonGroup, Input, Button } from "react-native-elements";

// Components
import FormErrorMessage from "openfit/components/FormErrorMessage";

const Form = ({ editNewCalories }) => {
	const [gender, setGender] = useState(0);
	const [weight, setWeight] = useState(0);
	const [height, setHeight] = useState(0);
	const [age, setAge] = useState(0);
	const [activity, setActivity] = useState(0);
	const [goal, setGoal] = useState(0);

	// Input Error
	const [displayError, setDisplayError] = useState(false);

	const handleChange = (type, value) => {
		if (type == "gender") setGender(value);
		if (type == "weight") setWeight(parseInt(value) ? parseInt(value) : 0);
		if (type == "height") setHeight(parseInt(value) ? parseInt(value) : 0);
		if (type == "age") setAge(parseInt(value) ? parseInt(value) : 0);
		if (type == "activity") setActivity(value);
		if (type == "goal") setGoal(value);
		setDisplayError(false);
	};

	const calculateBMR = () => {
		return new Promise((resolve, reject) => {
			let result = 0;

			// Errors
			if (weight == 0) {
				setDisplayError(true);
				reject("Wrong Inputs");
			}
			if (height == 0) {
				setDisplayError(true);
				reject("Wrong Inputs");
			}
			if (age == 0) {
				setDisplayError(true);
				reject("Wrong Inputs");
			}

			// Male or Female
			if (gender == 0) result = 66.47 + 13.75 * weight + 5.003 * height - 6.755 * age;
			if (gender == 1) result = 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;

			// Acitivity
			if (activity == 0) result = result * 1.2;
			if (activity == 1) result = result * 1.375;
			if (activity == 2) result = result * 1.55;
			if (activity == 3) result = result * 1.812;

			// Goal
			if (goal == 0) result = result - 400;
			if (goal == 1) result = result;
			if (goal == 2) result = result + 400;

			// Round
			result = Math.round(result);

			console.log(result);
			resolve(result);
		});
	};

	return (
		<View style={{ flex: 1, marginTop: 20 }}>
			<Input
				label="Your Weight in Kg"
				labelStyle={{ fontSize: 12 }}
				placeholder="Weight"
				onChangeText={(value) => handleChange("weight", value)}
			/>
			<Input
				label="Your Height in cm"
				labelStyle={{ fontSize: 12 }}
				placeholder="Height"
				onChangeText={(value) => handleChange("height", value)}
			/>
			<Input
				label="Your Age in years"
				labelStyle={{ fontSize: 12 }}
				placeholder="Age"
				onChangeText={(value) => handleChange("age", value)}
			/>
			<CustomButtonGroup
				label="Gender"
				onPress={(value) => handleChange("gender", value)}
				selectedIndex={gender}
				buttons={["Male", "Female"]}
			/>
			<CustomButtonGroup
				label="Daily Activity"
				onPress={(value) => handleChange("activity", value)}
				selectedIndex={activity}
				buttons={["None", "Little", "Moderate", "High"]}
			/>
			<CustomButtonGroup
				label="Goal"
				onPress={(value) => handleChange("goal", value)}
				selectedIndex={goal}
				buttons={["Lose", "Maintain", "Gain"]}
			/>
			<FormErrorMessage displayError={displayError} />
			<Button
				onPress={() =>
					calculateBMR()
						.then((res) => editNewCalories(res))
						.catch((err) => console.log(err))
				}
				title="Save"
			/>
		</View>
	);
};

const CustomButtonGroup = ({ label, ...props }) => {
	return (
		<View style={{ marginBottom: 20 }}>
			<Text style={{ marginLeft: 20 }}>{label}</Text>
			<ButtonGroup {...props} />
		</View>
	);
};

export default Form;

const styles = StyleSheet.create({});
