import React, { useState, useContext } from "react";

// Context
import { AppContext } from "openfit/components/Context/AppContext";

// Components
import Base from "./components/Base/Base";
import DropdownPicker from "./components/DropdownPicker/DropdownPicker";
import AmountInput from "./components/AmountInput/AmountInput";


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

	const addFunction = () => {
		addExercise({ exercise: selectedExercise, time: time })
			.then((result) => {
				resetState();
				toggleOverlay();
			})
			.catch((error) => {
				setDisplayError(true);
			});
	};

	return (
		<Base
			title="Add Exercise"
			addFunction={addFunction}
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
