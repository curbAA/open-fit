import React, { useState, useContext } from "react";

// Context
import { AppContext } from "../../../../components/Context/AppContext";

// Components
import Base from "./components/Base/Base";
import DropdownPicker from "./components/DropdownPicker/DropdownPicker";
import AmountInput from "./components/AmountInput/AmountInput";

const AddExercise = () => {
	const { availableExerciseList } = useContext(AppContext);
	const [selectedExercise, setSelectedExercise] = useState("");
	const [calories, setCalories] = useState("");
	const [time, setTime] = useState("");

	return (
		<Base title="Add Exercise">
			<DropdownPicker
				list={availableExerciseList}
				value={selectedExercise}
				onChangeItem={(item) => {
					setSelectedExercise(item.value);
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
