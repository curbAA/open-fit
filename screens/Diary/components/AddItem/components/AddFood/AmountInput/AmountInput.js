import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Input } from "react-native-elements";

const AmountInput = ({ unit, calories, amount, setAmount }) => {
	return (
		<View style={styles.amount}>
			<Input
				keyboardType="number-pad"
				containerStyle={styles.amoutContainer}
				placeholder="Amount"
				onChangeText={(value) => setAmount(value)}
			/>
			<Text style={styles.amountUnit}>
				{unit}
				{"   "}={"   "}
				{calories && amount ? parseInt(calories) * parseInt(amount) : 0} Kcal
			</Text>
		</View>
	);
};

export default AmountInput;

const styles = StyleSheet.create({
	amoutContainer: {
		width: 150,
		textAlign: "right",
	},
	amount: {
		marginTop: 10,
		flexDirection: "row",
		alignItems: "center",
	},
	amountUnit: {
		color: "gray",
	},
});
