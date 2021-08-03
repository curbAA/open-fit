import React, { useContext, useState } from "react";

// Context
import { AppContext } from "openfit/components/Context/AppContext";

// Components
import Base from "./components/Base/Base";
import DropdownPicker from "./components/DropdownPicker/DropdownPicker";
import AmountInput from "./components/AmountInput/AmountInput";

// TODO create error component for modal
// TODO show error component inside modal when user gives wrong input
// TODO make a button group selector for food unit (g, ml, lbs, oz, unit, fl oz)
// TODO create a button for creating new food in availableFood selector

const AddFood = ({ displayOverlay, toggleOverlay }) => {
	const { availableFoodList, addFood } = useContext(AppContext);

	// Determined (used for getting information from user)
	const [selectedFood, setSelectedFood] = useState({});
	const [amount, setAmount] = useState(0);

	const resetState = () => {
		setSelectedFood({});
		setAmount(0);
	};

	return (
		<Base
			title="Add Food"
			addFunction={() => {
				addFood({ food: selectedFood, amount: amount });
				resetState();
				toggleOverlay();
			}}
			cancelFunction={() => {
				resetState();
				toggleOverlay();
			}}
			overlayVisible={displayOverlay}
			onBackdropPress={() => {
				resetState();
				toggleOverlay();
			}}
		>
			<DropdownPicker
				list={availableFoodList}
				onChangeItem={(item) => {
					setSelectedFood(item);
				}}
			/>
			<AmountInput
				unit={selectedFood.unit}
				calories={selectedFood.kcal}
				amount={amount}
				setAmount={setAmount}
				placeholder="Amount"
			/>
		</Base>
	);
};

export default AddFood;
