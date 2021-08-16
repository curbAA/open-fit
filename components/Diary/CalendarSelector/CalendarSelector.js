import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import moment from "moment";

// Components
import TouchableOpacity from "openfit/components/TouchableOpacity";
import CalendarOverlay from "./CalendarOverlay";

const CalendarSelector = () => {
	const [selectedDate, setSelectedDate] = useState(moment());
	const DATE_FORMAT = "MMMM Do YYYY";

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	const [displayCalendar, setDisplayCalendar] = useState(false);
	const toggleCalendar = () => setDisplayCalendar(!displayCalendar);

	const handleOk = () => {
		toggleCalendar();
	};

	const handleCancel = () => {
		toggleCalendar();
	};

	return (
		<View>
			<TouchableOpacity onPress={toggleCalendar}>
				<Text style={styles.selectedDate}>
					{selectedDate.format(DATE_FORMAT) == moment().format(DATE_FORMAT)
						? selectedDate.format(DATE_FORMAT) + " (Today)"
						: selectedDate.format(DATE_FORMAT)}
				</Text>
			</TouchableOpacity>
			<CalendarOverlay
				isVisible={displayCalendar}
				handleCancel={handleCancel}
				handleOk={handleOk}
				selectedDate={selectedDate}
				handleDateChange={handleDateChange}
				onBackdropPress={toggleCalendar}
			/>
		</View>
	);
};

export default CalendarSelector;

const styles = StyleSheet.create({
	selectedDate: {
		textAlign: "center",
		padding: 10,
		borderColor: "#cecece",
		borderWidth: 1,
	},
});
