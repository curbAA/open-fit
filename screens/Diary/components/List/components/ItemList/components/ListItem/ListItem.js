import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text, ListItem, Icon } from "react-native-elements";

// Context
import { AppContext } from "openfit/components/Context/AppContext";

const ListItemFood = ({ item }) => {
	const { deleteFood, editFood } = useContext(AppContext);
	return (
		<ListItem bottomDivider>
			<ListItem.Content style={styles.itemContainer}>
				<View>
					<ListItem.Title>{item.food.label}</ListItem.Title>
					<ListItem.Subtitle>{item.amount + " " + item.food.unit}</ListItem.Subtitle>
				</View>
				<View style={styles.caloriesContainer}>
					<Text style={styles.calories}>{Math.round(item.food.kcal * item.amount)}</Text>
					<Text style={styles.subtitle}>Kcal</Text>
				</View>
					<Icon
						containerStyle={foodStyles.itemButtonContainer}
						iconStyle={foodStyles.itemButtonIcon}
						size={17}
						color="#9e9e9e"
						name="trash"
						type="font-awesome-5"
						onPress={() => deleteFood({ id: item.id })}
					/>
					{/* <Icon
							containerStyle={foodStyles.itemButtonContainer}
							iconStyle={foodStyles.itemButtonIcon}
							size={17}
							color="#9e9e9e"
							name="pen"
							type="font-awesome-5"
							onPress={() => console.log("Edit")}
						/> */}
			</ListItem.Content>
		</ListItem>
	);
};

const ListItemExercise = ({ item }) => {
	const { deleteExercise, editExercise } = useContext(AppContext);
	return (
		<ListItem bottomDivider>
			<ListItem.Content style={styles.itemContainer}>
				<View>
					<ListItem.Title>{item.exercise.label}</ListItem.Title>
					<ListItem.Subtitle>{item.time} min</ListItem.Subtitle>
				</View>
				<View style={styles.caloriesContainer}>
					<Text style={styles.calories}>{parseInt(item.exercise.kcal) * parseInt(item.time)}</Text>
					<Text style={styles.subtitle}>Kcal</Text>
				</View>

					<Icon
						containerStyle={foodStyles.itemButtonContainer}
						iconStyle={foodStyles.itemButtonIcon}
						size={17}
						color="#9e9e9e"
						name="trash"
						type="font-awesome-5"
						onPress={() => deleteExercise({ id: item.id })}
					/>
					{/* <Icon
							containerStyle={foodStyles.itemButtonContainer}
							iconStyle={foodStyles.itemButtonIcon}
							size={17}
							color="#9e9e9e"
							name="pen"
							type="font-awesome-5"
							onPress={() => console.log("Edit")}
						/> */}
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
