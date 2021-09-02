import React, { useState } from "react";
import { StyleSheet, Pressable } from "react-native";

const TouchableOpacity = (props) => {
	const [isPressed, setIsPressed] = useState(false);

	return (
		<Pressable
			onPressIn={() => {
				setIsPressed(true);
			}}
			onPressOut={() => {
				setIsPressed(false);
			}}
			style={[props.containerStyle, isPressed ? styles.pressed : styles.released]}
			{...props}
		>
			{props.children}
		</Pressable>
	);
};

export default TouchableOpacity;

const styles = StyleSheet.create({
	pressed: {
		backgroundColor: "#cecece",
	},
	released: {},
});
