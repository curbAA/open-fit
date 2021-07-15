import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, ListItem } from "react-native-elements";

const ListItemFood = ({ food }) => {
	return (
		<ListItem bottomDivider>
			<ListItem.Content style={styles.itemContainer}>
				<View>
					<ListItem.Title>{food.label}</ListItem.Title>
					<ListItem.Subtitle>{food.unit}</ListItem.Subtitle>
					<ListItem.Subtitle>{food.kcal}</ListItem.Subtitle>
				</View>
			</ListItem.Content>
		</ListItem>
	);
};

const ListItemExercise = ({ exercise }) => {
	console.log(exercise);
	return (
		<ListItem bottomDivider>
			<ListItem.Content style={styles.itemContainer}>
				<View>
					<ListItem.Title>{exercise.label}</ListItem.Title>
					<ListItem.Subtitle>{exercise.kcal} min</ListItem.Subtitle>
				</View>
			</ListItem.Content>
		</ListItem>
	);
};

const CustomListItem = {
	Food: ListItemFood,
	Exercise: ListItemExercise,
};

export default CustomListItem;

const styles = StyleSheet.create({
	itemContainer: {
		display: "flex",
		justifyContent: "space-between",
		flexDirection: "row",
	},
	caloriesContainer: {
		textAlign: "center",
	},
	calories: {
		textAlign: "center",
		color: "cornflowerblue",
		fontWeight: "bold",
	},
	subtitle: {
		color: "cornflowerblue",
		fontSize: 12,
		textAlign: "center",
	},
});
