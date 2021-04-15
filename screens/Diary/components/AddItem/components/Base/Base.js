import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Button, Divider, Overlay } from "react-native-elements";

// Components
import ButtonContainer from "../ButtonContainer/ButtonContainer";

const Base = ({ title, addFunction, cancelFunction, children }) => {
	const [overlayVisible, setOverlayVisible] = useState(false);

	const toggleOverlay = () => {
		setOverlayVisible(!overlayVisible);
	};

	return (
		<View style={styles.container}>
			<Button title={title} onPress={toggleOverlay} />
			<Overlay isVisible={overlayVisible} onBackdropPress={toggleOverlay}>
				<View style={styles.overlay}>
					<Text style={styles.title}>{title}</Text>
					<Divider style={styles.divider} />
					<View style={styles.content}>
						{children}
						<ButtonContainer
							addFunction={addFunction}
							cancelFunction={cancelFunction}
						/>
					</View>
				</View>
			</Overlay>
		</View>
	);
};

export default Base;

const styles = StyleSheet.create({
	container: {
		margin: 16,
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
