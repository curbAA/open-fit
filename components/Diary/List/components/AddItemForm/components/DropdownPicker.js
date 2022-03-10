import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import DropdownPicker from "react-native-dropdown-picker";

const CustomDropdownPicker = ({ list, onChangeItem }) => {
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState({})
	const [itemList, setItemList] = useState(list)


	return (
		<DropdownPicker
			open={open}
			value={value}
			items={itemList}
			setOpen={setOpen}
			setValue={setValue}
			setItems={setItemList}

			onSelectItem={(item) => onChangeItem(item)}

			containerStyle={styles.container}
			dropDownStyle={styles.dropdown}
			itemStyle={styles.item}
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
