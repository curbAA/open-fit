import React, { useState, useContext } from "react";

// Context
import { AppContext } from "../../../../components/Context/AppContext";

// Components
import Base from "./components/Base/Base";
import DropdownPicker from "./components/DropdownPicker/DropdownPicker";
import AmountInput from "./components/AmountInput/AmountInput";

const AddExercise = () => {
	const { availableExerciseList, addExercise } = useContext(AppContext);

	const [selectedExercise, setSelectedExercise] = useState("");
	const [calories, setCalories] = useState("");
	const [time, setTime] = useState("");

	const [overlayVisible, setOverlayVisible] = useState(false);

	const toggleOverlay = () => {
		setOverlayVisible(!overlayVisible);
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
				toggleOverlay();
			}}
			overlayVisible={overlayVisible}
			toggleOverlay={toggleOverlay}
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
			/>
		</Base>
	);
};

export default AddExercise;
