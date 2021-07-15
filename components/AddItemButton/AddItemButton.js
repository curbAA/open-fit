import React from "react";
import { StyleSheet } from "react-native";
import { Button, Icon } from "react-native-elements";

const AddItemButton = ({title}) => {
	return (
		<Button
			icon={<Icon name="plus" size={24} color="cornflowerblue" type="antdesign" />}
			buttonStyle={styles.button}
			containerStyle={styles.container}
			type="outline"
			title={` ${title}`}
		/>
	);
};

export default AddItemButton;

const styles = StyleSheet.create({
	button: {},
	container: {
		marginTop: 10,
		marginHorizontal: 10,
	},
});
