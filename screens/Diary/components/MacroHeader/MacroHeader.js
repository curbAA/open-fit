import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";

// Components
import Display from "./components/Display";

const MacroHeader = ({exerciseTotal, foodTotal, goal}) => {
	return (
		<View style={styles.container}>
			<Display calories={goal} subtitle="GOAL" />
			<Display calories={goal - (foodTotal + exerciseTotal)} green subtitle="REMAINING" />
			<Display calories={foodTotal + exerciseTotal} subtitle="NET" />
			<Display calories={foodTotal} subtitle="FOOD" />
			<Display calories={exerciseTotal} subtitle="EXERCISE" />
		</View>
	);
};

export default MacroHeader;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 16,
		width: Dimensions.get("screen").width,
	},
});
