import React, { useContext } from "react";
import { StyleSheet, Dimensions, View } from "react-native";

// Components
import Element from "./HeaderElement";

// Context
import { AppContext } from "openfit/components/Context/AppContext";

const MacroHeader = ({ exerciseTotal, foodTotal, goal }) => {
	const { roundNumber } = useContext(AppContext);

	return (
		<View style={styles.container}>
			<Element calories={goal} subtitle="GOAL" />
			<Element
				calories={roundNumber(goal - (foodTotal + exerciseTotal), 0)}
				green
				subtitle="REMAINING"
			/>
			<Element calories={roundNumber(exerciseTotal + foodTotal, 0)} subtitle="NET" />
			<Element calories={roundNumber(foodTotal, 0)} subtitle="FOOD" />
			<Element calories={roundNumber(exerciseTotal, 0)} subtitle="EXERCISE" />
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
