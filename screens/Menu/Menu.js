import React, {useContext} from "react";
import { View, StyleSheet} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import IonIcons from "react-native-vector-icons/Ionicons";

// Tab Navigation
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();

// Screens
import FoodMenu from "./Screens/FoodMenu/FoodMenu";
import ExerciseMenu from "./Screens/ExerciseMenu/ExerciseMenu";

// Context
import { AppContext } from "../../components/Context/AppContext";

const Menu = () => {
	const { availableFoodList, availableExerciseList } = useContext(AppContext);

	return (
		<NavigationContainer independent={true}>
			<View style={styles.container}>
				<Tab.Navigator 
					// screenOptions={({ route }) => ({
					// 	tabBarIcon: ({ color, size }) => {
					// 		switch (route.name) {
					// 			case "Foods":
					// 				return <IonIcons name={"fast-food"} size={size} color={color} />;
					// 				break;
					// 			case "Exercises":
					// 				return <IonIcons name={"bicycle"} size={size} color={color} />;
					// 				break;
					// 		}
					// 	},
					// })}
				>
					<Tab.Screen name="Foods" component={FoodMenu} />
					<Tab.Screen name="Exercises" component={ExerciseMenu} />
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
