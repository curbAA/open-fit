import React, { useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import moment from "moment";

// Components
import TouchableOpacity from "openfit/components/TouchableOpacity";
import CalendarOverlay from "./CalendarOverlay";

// Context
import { AppContext } from "openfit/components/Context/AppContext";

const CalendarSelector = () => {
	const { selectedDate, setSelectedDate, _dateFormat } = useContext(AppContext);

	const unparsedDate = () => {
		console.log("selectedDate", moment(selectedDate));
		console.log("Date Format", moment().format(_dateFormat));
		if (selectedDate) return moment(selectedDate);
		else return moment(selectedDate);
	};

	const handleDateChange = (date) => {
		setSelectedDate(date.format(_dateFormat));
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
					{selectedDate == moment().format(_dateFormat)
						? selectedDate + " (Today)"
						: selectedDate}
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
