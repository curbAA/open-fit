import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, ListItem } from "react-native-elements";
import uuid from "react-uuid";

const ListItemFood = ({ food }) => {
	return (
		<ListItem key={uuid()} bottomDivider>
			<ListItem.Content style={styles.itemContainer}>
				<View>
					<ListItem.Title>{food.name}</ListItem.Title>
					<ListItem.Subtitle>{food.amount + " " + food.unit}</ListItem.Subtitle>
				</View>
				<View style={styles.caloriesContainer}>
					<Text style={styles.calories}>
						{Math.round(food.kcal * food.amount)}
					</Text>
					<Text style={styles.subtitle}>Kcal</Text>
				</View>
			</ListItem.Content>
		</ListItem>
	);
};

const ListItemExercise = ({ exercise }) => {
	return (
		<ListItem key={uuid()} bottomDivider>
			<ListItem.Content style={styles.itemContainer}>
				<View>
					<ListItem.Title>{exercise.name}</ListItem.Title>
					<ListItem.Subtitle>{exercise.time} min</ListItem.Subtitle>
				</View>
				<View style={styles.caloriesContainer}>
					<Text style={styles.calories}>
						{parseInt(exercise.kcal) * parseInt(exercise.time)}
					</Text>
					<Text style={styles.subtitle}>Kcal</Text>
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
