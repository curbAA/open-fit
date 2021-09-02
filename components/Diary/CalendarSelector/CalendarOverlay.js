import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Overlay, Button } from "react-native-elements";
import CalendarPicker from "react-native-calendar-picker";

const CalendarOverlay = ({
	isVisible,
	handleOk,
	handleCancel,
	handleDateChange,
	selectedDate,
	onBackdropPress,
}) => {
	return (
		<View style={styles.container}>
			<Overlay isVisible={isVisible} onBackdropPress={onBackdropPress}>
				<View style={styles.overlay}>
					<CalendarPicker
						selectedStartDate={selectedDate}
						onDateChange={handleDateChange}
					/>
					<View style={styles.buttonContainer}>
						<Button onPress={handleOk} containerStyle={styles.button} title="Ok" />
						<Button
							onPress={handleCancel}
							containerStyle={styles.button}
							type="outline"
							title="Cancel"
						/>
					</View>
				</View>
			</Overlay>
		</View>
	);
};

export default CalendarOverlay;

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: "row-reverse",
	},
	button: {
		width: 100,
		margin: 10,
	},
	container: {},
	overlay: {
		flexDirection: "column",
		flexWrap: "wrap",
	},
});
