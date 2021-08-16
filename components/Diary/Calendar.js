import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";

// Components
import TouchableOpacity from "openfit/components/TouchableOpacity";

const Calendar = () => {
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
			{displayCalendar ? (
				<>
					<CalendarPicker
						selectedStartDate={selectedDate.format()}
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
				</>
			) : (
				<></>
			)}
		</View>
	);
};

export default Calendar;

const styles = StyleSheet.create({
	selectedDate: {
		textAlign: "center",
		padding: 10,
		borderColor: "#cecece",
		borderWidth: 1,
	},
	buttonContainer: {
		flexDirection: "row-reverse",
	},
	button: {
		width: 100,
		margin: 10,
	},
});
