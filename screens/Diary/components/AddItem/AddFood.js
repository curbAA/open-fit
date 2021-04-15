import React, { useContext, useState } from "react";

// Context
import { AppContext } from "../../../../components/Context/AppContext";

// Components
import Base from "./components/Base/Base";
import DropdownPicker from "./components/DropdownPicker/DropdownPicker";
import AmountInput from "./components/AmountInput/AmountInput";

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
				onChangeItem={(item) => {
					setCalories(item.kcal);
					setSelectedFood(item.value);
					setUnit(item.unit);
				}}
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
