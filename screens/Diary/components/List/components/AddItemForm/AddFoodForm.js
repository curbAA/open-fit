import React, { useContext, useState } from "react";

// Context
import { AppContext } from "openfit/components/Context/AppContext";

// Components
import Base from "./components/Base/Base";
import DropdownPicker from "./components/DropdownPicker/DropdownPicker";
import AmountInput from "./components/AmountInput/AmountInput";

// TODO create error component for modal
// TODO show error component inside modal when user gives wrong input
// TODO create a button for creating new food in availableFood selector

const AddFoodForm = ({ displayOverlay, toggleOverlay }) => {
	const { availableFoodList, addFood } = useContext(AppContext);

	// Determined (used for getting information from user)
	const [selectedFood, setSelectedFood] = useState({});
	const [amount, setAmount] = useState(0);

	const reset = () => {
		setSelectedFood({});
		setAmount(0);
		toggleOverlay();
		setDisplayError(false);
	};

	// Error Message
	const [displayError, setDisplayError] = useState(false);

	const toggleError = () => {
		setDisplayError(!displayError);
	};

	const addFunction = () => {
		addFood({ food: selectedFood, amount: amount })
			.then((result) => {
				reset();
			})
			.catch((error) => {
				setDisplayError(true);
			});
	};

	return (
		<Base
			title="Add Food"
			addFunction={addFunction}
			cancelFunction={reset}
			overlayVisible={displayOverlay}
			onBackdropPress={reset}
			displayError={displayError}
			toggleError={toggleError}
		>
			<DropdownPicker
				list={availableFoodList}
				onChangeItem={(item) => {
					setSelectedFood(item);
					setDisplayError(false);
				}}
			/>
			<AmountInput
				unit={selectedFood.unit}
				calories={selectedFood.kcal}
				amount={amount}
				setAmount={(args) => {
					setAmount(args);
					setDisplayError(false);
				}}
				placeholder="Amount"
			/>
		</Base>
	);
};

export default AddFoodForm;
