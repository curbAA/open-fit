import React, { useState, useContext } from "react";

// Context
import { AppContext } from "openfit/components/Context/AppContext";

// Components
import Base from "./components/Base/Base";
import DropdownPicker from "./components/DropdownPicker/DropdownPicker";
import AmountInput from "./components/AmountInput/AmountInput";

// TODO create error component for modal
// TODO show error component inside modal when user gives wrong input
// TODO create a button for creating new exercise in availableExercise selector

const AddExerciseForm = ({ displayOverlay, toggleOverlay }) => {
	const { availableExerciseList, addExercise } = useContext(AppContext);

	// User Determined
	const [selectedExercise, setSelectedExercise] = useState({});
	const [time, setTime] = useState(0);

	// Clear form
	const resetState = () => {
		setSelectedExercise({});
		setTime(0);
	};

	// Error Message
	const [displayError, setDisplayError] = useState(false);

	const toggleError = () => {
		setDisplayError(!displayError);
	};

	return (
		<Base
			title="Add Exercise"
			addFunction={() => {
				addExercise({ exercise: selectedExercise, time: time });
				resetState();
				toggleOverlay();
			}}
			cancelFunction={() => {
				resetState();
				toggleOverlay();
			}}
			overlayVisible={displayOverlay}
			onBackdropPress={() => {
				resetState();
				toggleOverlay();
			}}
			displayError={displayError}
			toggleError={toggleError}
		>
			<DropdownPicker
				list={availableExerciseList}
				onChangeItem={(item) => {
					setSelectedExercise(item);
				}}
			/>
			<AmountInput
				unit={selectedExercise.unit}
				calories={selectedExercise.kcal}
				amount={time}
				setAmount={setTime}
				placeholder="Time"
			/>
		</Base>
	);
};

export default AddExerciseForm;
