import React, { useContext } from "react";
import { StyleSheet, Dimensions, View } from "react-native";

// Components
import Element from "./components/HeaderElement";

// Context
import { AppContext } from "openfit/components/Context/AppContext";

const MacroHeader = ({ exerciseTotal, foodTotal, goal }) => {
	const { roundNumber } = useContext(AppContext);

	return (
		<View style={styles.container}>
			<Element calories={goal} subtitle="GOAL" />
			<Element calories={goal - (foodTotal + exerciseTotal)} green subtitle="REMAINING" />
			<Element calories={roundNumber(exerciseTotal + foodTotal)} subtitle="NET" />
			<Element calories={foodTotal} subtitle="FOOD" />
			<Element calories={exerciseTotal} subtitle="EXERCISE" />
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
