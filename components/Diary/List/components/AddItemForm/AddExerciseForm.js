import React, { useState, useContext } from "react";

// Context
import { AppContext } from "openfit/components/Context/AppContext";

// Components
import Base from "./components/Base";
import DropdownPicker from "./components/DropdownPicker";
import AmountInput from "./components/AmountInput";

const AddExerciseForm = ({ displayOverlay, toggleOverlay }) => {
	const { availableExerciseList, addExercise } = useContext(AppContext);

	// User Determined
	const [selectedExercise, setSelectedExercise] = useState({});
	const [time, setTime] = useState(0);

	// Clear form
	const resetState = () => {
		setSelectedExercise({});
		setTime(0);
		toggleOverlay();
		setDisplayError(false);
	};

	// Error Message
	const [displayError, setDisplayError] = useState(false);

	// Confirm if data meets the template
	const addFunction = () => {
		addExercise({ exercise: selectedExercise, time: time })
			.then((result) => {
				resetState();
			})
			.catch((error) => {
				setDisplayError(true);
			});
	};

	return (
		<Base
			title="Add Exercise"
			addFunction={addFunction}
			cancelFunction={resetState}
			overlayVisible={displayOverlay}
			onBackdropPress={resetState}
			displayError={displayError}
			toggleError={() => displayError(true)}
		>
			<DropdownPicker
				list={availableExerciseList}
				onChangeItem={(item) => {
					setSelectedExercise(item);
					setDisplayError(false);
				}}
			/>
			<AmountInput
				unit={selectedExercise.unit}
				calories={selectedExercise.kcal}
				amount={time}
				setAmount={(args) => {
					setTime(args);
					setDisplayError(false);
				}}
				placeholder="Time"
			/>
		</Base>
	);
};

export default AddExerciseForm;
