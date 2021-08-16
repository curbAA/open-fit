import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";

const Calendar = () => {
	const [selectedDate, setSelectedDate] = useState(moment());
	const DATE_FORMAT = "MMMM Do YYYY";
	const currentDate = moment();

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	const [displayCalendar, setDisplayCalendar] = useState(false);
	const toggleCalendar = () => setDisplayCalendar(!displayCalendar);

	return (
		<View>
			<Pressable onPress={toggleCalendar}>
				<Text style={styles.selectedDate}>
					{selectedDate.format(DATE_FORMAT) == moment().format(DATE_FORMAT)
						? selectedDate.format(DATE_FORMAT) + " (Today)"
						: selectedDate.format(DATE_FORMAT)}
				</Text>
			</Pressable>
			{displayCalendar ? (
				<CalendarPicker selectedStartDate={selectedDate.format()} onDateChange={handleDateChange} />
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
});
