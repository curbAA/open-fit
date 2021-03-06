import "react-native-gesture-handler";
import React from "react";
import { ThemeProvider } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IonIcons from "react-native-vector-icons/Ionicons";

// Screens
import Diary from "./screens/Diary/Diary";
import Menu from "./screens/Menu/Menu";
import Goals from "./screens/Goals/Goals";

// Components
import Header from "./components/Header/Header";

// Context
import { AppContextProvider } from "openfit/components/Context/AppContext";

const Tab = createBottomTabNavigator();

const theme = {};

// TODO revise app components styling for use with themeProvider

export default function App() {
	return (
		<AppContextProvider>
			<NavigationContainer independent={true}>
				<ThemeProvider theme={theme}>
					<Header />
					<Tab.Navigator
						screenOptions={({ route }) => ({
							tabBarIcon: ({ color, size }) => {
								switch (route.name) {
									case "Diary":
										return <IonIcons name={"fast-food"} size={size} color={color} />;
										break;
									case "Menu":
										return <IonIcons name={"book"} size={size} color={color} />;
										break;
									case "Goals":
										return <IonIcons name={"trophy"} size={size} color={color} />;
										break;
								}
							},
						})}
					>
						<Tab.Screen name="Diary" component={Diary} />
						<Tab.Screen name="Menu" component={Menu} />
						<Tab.Screen name="Goals" component={Goals} />
					</Tab.Navigator>
				</ThemeProvider>
			</NavigationContainer>
		</AppContextProvider>
	);
}
