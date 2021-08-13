import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

// Tab Navigation
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();

// Screens
import FoodMenu from "./screens/FoodMenu";
import ExerciseMenu from "./screens/ExerciseMenu";

// Context
import { AppContext } from "openfit/components/Context/AppContext";

const Menu = () => {
	const { availableFoodList, availableExerciseList } = useContext(AppContext);

	return (
		<NavigationContainer independent={true}>
			<View style={styles.container}>
				<Tab.Navigator>
					<Tab.Screen
						name="Foods"
						children={() => <FoodMenu availableFoodList={availableFoodList} />}
					/>
					<Tab.Screen
						name="Exercises"
						children={() => <ExerciseMenu availableExerciseList={availableExerciseList} />}
					/>
				</Tab.Navigator>
			</View>
		</NavigationContainer>
	);
};

export default Menu;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
