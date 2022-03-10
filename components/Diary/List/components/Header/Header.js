import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

const Header = ({ title, toggleList, displayList, toggleOverlay, totalCalories }) => {
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
					iconStyle={!displayList ? { transform: [{ rotateX: "180deg" }] } : {}}
					color="white"
					name="chevron-down"
					type="font-awesome"
					size={16}
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
		marginRight: 5,
	},
	rightContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});

export default Header;
