import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";

// Components
import Display from "./components/Display";

const MacroHeader = () => {
	return (
		<View style={styles.container}>
			<Display calories={2000} subtitle="GOAL" />
			<Display calories={350} subtitle="REMAINING" />
			<Display calories={1650} subtitle="NET" />
			<Display calories={1920} subtitle="FOOD" />
			<Display calories={-270} subtitle="EXERCISE" />
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
