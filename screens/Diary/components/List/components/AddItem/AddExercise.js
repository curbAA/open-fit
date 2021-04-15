import React, { useState, useContext } from "react";

// Context
import { AppContext } from "../../../../../../components/Context/AppContext";

// Components
import Base from "./components/Base/Base";
import DropdownPicker from "./components/DropdownPicker/DropdownPicker";
import AmountInput from "./components/AmountInput/AmountInput";

const AddExercise = ({ displayOverlay, toggleOverlay }) => {
	const { availableExerciseList, addExercise } = useContext(AppContext);

	const [selectedExercise, setSelectedExercise] = useState("");
	const [calories, setCalories] = useState("");
	const [time, setTime] = useState("");

	const resetState = () => {
		setSelectedExercise("");
		setCalories("");
		setTime("");
	};

	return (
		<Base
			title="Add Exercise"
			addFunction={() => {
				let newExercise = {
					name: selectedExercise,
					time: time,
					kcal: calories,
				};

				addExercise(newExercise);
				resetState();
				toggleOverlay();
			}}
			cancelFunction={() => {
				resetState();
				toggleOverlay();
			}}
			overlayVisible={displayOverlay}
			onBackdropPress={toggleOverlay}
		>
			<DropdownPicker
				list={availableExerciseList}
				value={selectedExercise.toLowerCase}
				onChangeItem={(item) => {
					setSelectedExercise(item.label);
					setCalories(item.kcal);
				}}
			/>
			<AmountInput
				unit={"minutes"}
				calories={calories}
				amount={time}
				setAmount={setTime}
				placeholder="Time"
			/>
		</Base>
	);
};

export default AddExercise;
