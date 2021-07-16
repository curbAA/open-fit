import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, ListItem } from "react-native-elements";

const ListItemFood = ({ food }) => {
	return (
		<ListItem bottomDivider>
			<ListItem.Content style={styles.itemContainer}>
				<View style={foodStyles.container}>
					<View>
						<ListItem.Title>{food.label}</ListItem.Title>
						<ListItem.Subtitle>
							{`${food.kcal * food.common}kcal / ${food.common}${food.unit}`}
						</ListItem.Subtitle>
					</View>
					<View style={[foodStyles.item, foodStyles.buttonContainer]}>
						<Icon
							containerStyle={foodStyles.itemButtonContainer}
							iconStyle={foodStyles.itemButtonIcon}
							size={17}
							color="#9e9e9e"
							name="trash"
							type="font-awesome-5"
							onPress={() => console.log("Delete")}
						/>
						<Icon
							containerStyle={foodStyles.itemButtonContainer}
							iconStyle={foodStyles.itemButtonIcon}
							size={17}
							color="#9e9e9e"
							name="pen"
							type="font-awesome-5"
							onPress={() => console.log("Edit")}
						/>
					</View>
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

const foodStyles = StyleSheet.create({
	container: {
		flexDirection: "row",
	},
	item: {
		flex: 1,
	},
	buttonContainer: {
		flexDirection: "row-reverse",
		alignItems: "center",
	},
	itemButtonContainer: {
		marginHorizontal: 5,
	},
	itemButtonIcon: {
		padding: 8,
	},
});