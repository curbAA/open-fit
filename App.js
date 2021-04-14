import "react-native-gesture-handler";
import React, { useContext } from "react";
import { ThemeProvider } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IonIcons from "react-native-vector-icons/Ionicons";

// Screens
import Diary from "./screens/Diary/Diary";
import Foods from "./screens/Foods/Foods";
import Goals from "./screens/Goals/Goals";

// Components
import Header from "./components/Header/Header";

// Context
import { AppContextProvider } from "./components/Context/AppContext";

const Tab = createBottomTabNavigator();

const theme = {};

export default function App() {
	return (
		<AppContextProvider>
			<NavigationContainer>
				<ThemeProvider theme={theme}>
					<Header />
					<Tab.Navigator
						screenOptions={({ route }) => ({
							tabBarIcon: ({ color, size }) => {
								switch (route.name) {
									case "Diary":
										return (
											<IonIcons name={"fast-food"} size={size} color={color} />
										);
										break;
									case "Foods":
										return <IonIcons name={"book"} size={size} color={color} />;
										break;
									case "Goals":
										return (
											<IonIcons name={"trophy"} size={size} color={color} />
										);
										break;
								}
							},
						})}
					>
						<Tab.Screen name="Diary" component={Diary} />
						<Tab.Screen name="Foods" component={Foods} />
						<Tab.Screen name="Goals" component={Goals} />
					</Tab.Navigator>
				</ThemeProvider>
			</NavigationContainer>
		</AppContextProvider>
	);
}
