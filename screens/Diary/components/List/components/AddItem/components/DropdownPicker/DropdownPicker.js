import React from "react";
import { StyleSheet } from "react-native";
import DropdownPicker from "react-native-dropdown-picker";

const CustomDropdownPicker = ({ list, value, onChangeItem }) => {
	return (
		<DropdownPicker
			items={list}
			containerStyle={styles.container}
			dropDownStyle={styles.dropdown}
			itemStyle={styles.item}
			defaultValue={value}
			onChangeItem={onChangeItem}
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
