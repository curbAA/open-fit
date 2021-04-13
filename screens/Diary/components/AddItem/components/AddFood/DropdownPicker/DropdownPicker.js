import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DropdownPicker from "react-native-dropdown-picker";

const CustomDropdownPicker = ({
	list,
	value,
	setCalories,
	setSelectedFood,
	setUnit,
}) => {
	return (
		<DropdownPicker
			items={list}
			containerStyle={styles.container}
			dropDownStyle={styles.dropdown}
			itemStyle={styles.item}
			defaultValue={value}
			onChangeItem={(item) => {
				setCalories(item.kcal);
				setSelectedFood(item.value);
				setUnit(item.unit);
			}}
		/>
	);
};

export default CustomDropdownPicker;

const styles = StyleSheet.create({
	container: {
		height: 50,
	},
	dropdown: {
		backgroundColor: "#fafafa",
	},
	item: {
		justifyContent: "flex-start",
	},
});
