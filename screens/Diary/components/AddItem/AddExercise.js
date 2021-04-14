import React, { useState } from "react";

// Components
import Base from "./components/Base/Base";
import OverlayContent from "./components/AddExercise/OverlayContent/OverlayContent";

const AddExercise = () => {
	// Exercise Data
	const [name, setName] = useState("");
	const [time, setTime] = useState("");
	const [calories, setCalories] = useState("");

	return (
		<Base title="Add Exercise">
			<OverlayContent
				name={name}
				setName={setName}
				time={time}
				setTime={setTime}
				calories={calories}
				setCalories={setCalories}
			/>
		</Base>
	);
};

export default AddExercise;
