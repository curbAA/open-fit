import React, { useContext, useState } from "react";

// Context
import { AppContext } from "../../../../components/Context/AppContext";
import { DiaryContext } from "../Context/DiaryContext";

// Components
import Base from "./components/Base/Base";
import DropdownPicker from "./components/DropdownPicker/DropdownPicker";
import AmountInput from "./components/AmountInput/AmountInput";

const AddFood = () => {
	const { availableFoodList, addFood } = useContext(AppContext);
	const { displayFoodOverlay, toggleFoodOverlay } = useContext(DiaryContext);

	// Food Data
	const [selectedFood, setSelectedFood] = useState("");
	const [unit, setUnit] = useState("");
	const [calories, setCalories] = useState("");
	const [amount, setAmount] = useState("");

	const resetState = () => {
		setSelectedFood("");
		setUnit("");
		setCalories("");
		setAmount("");
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
				resetState();
				toggleFoodOverlay();
			}}
			cancelFunction={() => {
				resetState();
				toggleFoodOverlay();
			}}
			overlayVisible={displayFoodOverlay}
			onBackdropPress={toggleFoodOverlay}
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
