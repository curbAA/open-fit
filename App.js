import "react-native-gesture-handler";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import Diary from "./screens/Diary";
import Foods from "./screens/Foods";
import Goals from "./screens/Goals";

import IonIcons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const theme = {};

export default function App() {
	return (
		<NavigationContainer>
			<SafeAreaProvider>
				<ThemeProvider theme={theme}>
					<Tab.Navigator
						screenOptions={({ route }) => ({
							tabBarIcon: ({color, size}) => {
								switch (route.name) {
									case "Diary":
										return <IonIcons name={"fast-food"} size={size} color={color} />;
										break;
									case "Foods":
										return <IonIcons name={"book"} size={size} color={color} />;
										break;
									case "Goals":
										return <IonIcons name={"trophy"} size={size} color={color} />;
										break;
								}
							}
						})}
					>
						<Tab.Screen name="Diary" component={Diary} />
						<Tab.Screen name="Foods" component={Foods} />
						<Tab.Screen name="Goals" component={Goals} />
					</Tab.Navigator>
				</ThemeProvider>
			</SafeAreaProvider>
		</NavigationContainer>
	);
}
