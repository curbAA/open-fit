import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

// Context
import { DiaryContext } from "../Context/DiaryContext";

const Header = ({ title, addFunction, collapseFunction, totalCalories }) => {
	const {
		toggleFoodOverlay,
		toggleFoodList,
		toggleExerciseOverlay,
		toggleExerciseList,
	} = useContext(DiaryContext);

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.title}>{title}</Text>
			</View>
			<View style={styles.rightContainer}>
				<Text style={styles.title}>{totalCalories} Kcal</Text>
				<Icon
					style={styles.plusIcon}
					onPress={() => {
						if (title == "FOOD") {
							toggleFoodOverlay();
						} else if (title == "EXERCISE") {
							toggleExerciseOverlay();
						}
					}}
					color="white"
					name="add"
					type="ionicon"
				/>
				<Icon
					onPress={() => {
						if (title == "FOOD") {
							toggleFoodList();
						} else if (title == "EXERCISE") {
							toggleExerciseList();
						}
					}}
					color="white"
					name="chevron-down"
					type="ionicon"
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 14,
		paddingVertical: 8,
		backgroundColor: "cornflowerblue",
		justifyContent: "space-between",
		flexDirection: "row",
	},
	title: {
		color: "white",
		fontSize: 16,
		marginRight: 10,
	},
	plusIcon: {
		marginRight: 3,
	},
	rightContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
});

export default Header;
