import React from "react";
import { StyleSheet } from "react-native";
import { Button, Icon } from "react-native-elements";

const AddItemButton = (props) => {
	return (
		<Button
			icon={<Icon name="plus" size={24} color="cornflowerblue" type="antdesign" />}
			buttonStyle={styles.button}
			containerStyle={styles.container}
			type="outline"
			{...props}
		/>
	);
};

export default AddItemButton;

const styles = StyleSheet.create({
	button: {
		borderWidth: 2,
	},
	container: {
		margin: 10,
	},
});
