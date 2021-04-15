import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

const Header = ({ title, toggleList, toggleOverlay, totalCalories }) => {
	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.title}>{title}</Text>
			</View>
			<View style={styles.rightContainer}>
				<Text style={styles.title}>{totalCalories} Kcal</Text>
				<Icon
					style={styles.plusIcon}
					onPress={toggleOverlay}
					color="white"
					name="add"
					type="ionicon"
				/>
				<Icon
					onPress={toggleList}
					color="white"
					name="chevron-down"
					type="ionicon"
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 14,
		paddingVertical: 8,
		backgroundColor: "cornflowerblue",
		justifyContent: "space-between",
		flexDirection: "row",
	},
	title: {
		color: "white",
		fontSize: 16,
		marginRight: 10,
	},
	plusIcon: {
		marginRight: 3,
	},
	rightContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
});

export default Header;
