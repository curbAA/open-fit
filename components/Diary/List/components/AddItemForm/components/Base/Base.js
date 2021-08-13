import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Divider, Overlay } from "react-native-elements";

// Components
import ButtonContainer from "../ButtonContainer/ButtonContainer";
import ErrorMessage from "./ErrorMessage";

const Base = ({
	title,
	onBackdropPress,
	overlayVisible,
	addFunction,
	cancelFunction,
	children,
	toggleError,
	displayError,
}) => {
	return (
		<View style={styles.container}>
			<Overlay isVisible={overlayVisible} onBackdropPress={onBackdropPress}>
				<View style={styles.overlay}>
					<Text style={styles.title}>{title}</Text>
					<Divider style={styles.divider} />
					<View style={styles.content}>
						{children}
						<ErrorMessage displayError={displayError} />
						<ButtonContainer addFunction={addFunction} cancelFunction={cancelFunction} />
					</View>
				</View>
			</Overlay>
		</View>
	);
};

export default Base;

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
	},
	overlay: {
		flexDirection: "column",
		flexWrap: "nowrap",
		width: Dimensions.get("window").width * 0.87,
	},
	content: {
		margin: 10,
	},
	divider: {
		marginBottom: 20,
		marginTop: 10,
	},
	title: {
		color: "cornflowerblue",
		fontSize: 16,
	},
});
