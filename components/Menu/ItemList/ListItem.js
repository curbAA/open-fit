import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, ListItem } from "react-native-elements";

// Context
import { AppContext } from "openfit/components/Context/AppContext";

const ListItemFood = ({ food }) => {
	const { deleteAvailableFood, roundNumber } = useContext(AppContext);

	return (
		<ListItem bottomDivider>
			<ListItem.Content style={styles.itemContainer}>
				<View style={foodStyles.container}>
					<View>
						<ListItem.Title>{food.label}</ListItem.Title>
						<ListItem.Subtitle>
							{`${roundNumber(food.kcal * food.common, 0)}kcal / ${food.common}${food.unit}`}
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
							onPress={() => deleteAvailableFood({ id: food.id })}
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
					</View>
				</View>
			</ListItem.Content>
		</ListItem>
	);
};

const ListItemExercise = ({ exercise }) => {
	const { deleteAvailableExercise, roundNumber } = useContext(AppContext);
	return (
		<ListItem bottomDivider>
			<ListItem.Content style={styles.itemContainer}>
				<View style={foodStyles.container}>
					<View>
						<ListItem.Title>{exercise.label}</ListItem.Title>
						<ListItem.Subtitle>
							{`${roundNumber(exercise.kcal * exercise.common, 0)}kcal / ${exercise.common}${
								exercise.unit
							}`}
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
							onPress={() => deleteAvailableExercise({ id: exercise.id })}
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
					</View>
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
