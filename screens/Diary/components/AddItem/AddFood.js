import React, { useContext, useState } from "react";

// Context
import { AppContext } from "../../../../components/Context/AppContext";

// Components
import Base from "./components/Base/Base";
import DropdownPicker from "./components/DropdownPicker/DropdownPicker";
import AmountInput from "./components/AmountInput/AmountInput";

const AddFood = () => {
	const { availableFoodList, addFood } = useContext(AppContext);

	// Food Data
	const [selectedFood, setSelectedFood] = useState("");
	const [unit, setUnit] = useState("");
	const [calories, setCalories] = useState("");
	const [amount, setAmount] = useState("");

	const [overlayVisible, setOverlayVisible] = useState(false);

	const toggleOverlay = () => {
		setOverlayVisible(!overlayVisible);
	};

	return (
		<Base
			title="Add Food"
			addFunction={() => {
				let newFood = {
					name: selectedFood,
					unit: unit,
					kcal: calories,
					amount: amount,
				};

				addFood(newFood);
				toggleOverlay();
			}}
			overlayVisible={overlayVisible}
			toggleOverlay={toggleOverlay}
		>
			<DropdownPicker
				list={availableFoodList}
				value={selectedFood.toLowerCase()}
				onChangeItem={(item) => {
					setCalories(item.kcal);
					setSelectedFood(item.label);
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
