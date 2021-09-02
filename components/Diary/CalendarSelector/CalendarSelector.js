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

	const handleDateChange = (date) => {
		setSelectedDate(date.format(_dateFormat));
	};

	const goToPreviousDay = () => {
		setSelectedDate(moment(selectedDate).subtract(1, "days").format(_dateFormat));
	};
	const goToNextDay = () => {
		setSelectedDate(moment(selectedDate).add(1, "days").format(_dateFormat));
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
			<View style={styles.dateButtonContainer}>
				<TouchableOpacity onPress={goToPreviousDay} containerStyle={styles.sideButton}>
					<Text style={styles.selectedDate}>1</Text>
				</TouchableOpacity>
				<TouchableOpacity containerStyle={styles.mainButton} onPress={toggleCalendar}>
					<Text style={styles.selectedDate}>
						{selectedDate == moment().format(_dateFormat)
							? selectedDate + " (Today)"
							: selectedDate}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={goToNextDay} containerStyle={styles.sideButton}>
					<Text style={styles.selectedDate}>2</Text>
				</TouchableOpacity>
			</View>
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
	dateButtonContainer: {
		flexDirection: "row",
	},
	sideButton: {
		flex: 1,
	},
	mainButton: { flex: 10 },
});
