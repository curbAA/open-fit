import React, { useContext, useState } from "react";

// Context
import { AppContext } from "../../../../components/Context/AppContext";

// Components
import Base from "./components/Base/Base";
import DropdownPicker from "./components/AddFood/DropdownPicker/DropdownPicker";
import AmountInput from "./components/AddFood/AmountInput/AmountInput";

const AddFood = () => {
	const { availableFoodList } = useContext(AppContext);

  // Food Data
	const [selectedFood, setSelectedFood] = useState("");
	const [unit, setUnit] = useState("");
	const [calories, setCalories] = useState("");
	const [amount, setAmount] = useState("");

	return (
		<Base title="Add Food">
			<DropdownPicker
				list={availableFoodList}
				value={selectedFood}
				setCalories={setCalories}
				setSelectedFood={setSelectedFood}
				setUnit={setUnit}
			/>
			<AmountInput
				unit={unit}
				calories={calories}
				amount={amount}
				setAmount={setAmount}
			/>
		</Base>
	);
};

export default AddFood;
