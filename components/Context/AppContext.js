import React, { createContext, useRef, useEffect, useState } from "react";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

export const AppContext = createContext();

import { roundNumber } from "./components/math";
import { newAvailableFood, newFood, newAvailableExercise, newExercise } from "./components/classes";

export const AppContextProvider = (props) => {
	// ─── APP STATE ──────────────────────────────────────────────────────────────────
	const appState = useRef(AppState.currentState);

	useEffect(() => {
		AppState.addEventListener("change", _handleAppStateChange);
		// clearAsyncStorage();
		getAllData();
		// storeAllData();
		return () => {
			AppState.removeEventListener("change", _handleAppStateChange);
		};
	}, []);

	const _handleAppStateChange = (nextAppState) => {
		if (appState.current.match(/inactive|background/) && nextAppState === "active") {
			// ─── FOREGROUND ──────────────────────────────────────────────────
			// console.log("app has come to the foreground!");
			getAllData();
			// storeAllData();
			// ─────────────────────────────────────────────────────────────────
		} else if (
			(appState.current.match(/active/) && nextAppState === "inactive") ||
			nextAppState === "background"
		) {
			// ─── BACKGROUND ──────────────────────────────────────────────────
			// console.log("App has come to the background!");
			// ─────────────────────────────────────────────────────────────────
		}
		appState.current = nextAppState;
	};

	// ─── LIST HISTORY ───────────────────────────────────────────────────────────────
	const _dateFormat = "YYYY-MM-DD";
	const [selectedDate, setSelectedDate] = useState(moment().format(_dateFormat));

	const [foodList, setFoodList] = useState([]);
	const [exerciseList, setExerciseList] = useState([]);

	const example = [
		{
			date: "2021-09-01",
			lists: {
				foodList: [
					{
						amount: 12,
						food: {
							common: 200,
							id: "55f4bbe-8040-bdee-e57e-a82b8b8675d",
							kcal: 2.18,
							label: "Helado",
							type: "availableFood",
							unit: "g",
							value: "helado",
						},
						id: "c28bff4-8ed5-b80a-6acf-8be1adf2d86",
						type: "food",
					},
				],
				exerciseList: [],
			},
		},
		{
			date: "2021-09-02",
			lists: {
				foodList: [],
				exerciseList: [
					{
						exercise: {
							common: 30,
							id: "fe6d4-7167-106e-2cb5-bae2ca8d6c6",
							kcal: 6.67,
							label: "Pesas ",
							type: "availableExercise",
							unit: "min",
							value: "pesas ",
						},
						id: "c367f25-1f6c-3d1-dda1-571c47c0015",
						time: 12,
						type: "exercise",
					},
				],
			},
		},
		{
			date: "2021-09-03",
			lists: {
				foodList: [
					{
						amount: 24,
						food: {
							common: 200,
							id: "55f4bbe-8040-bdeasde-e57e-a82b8b8675d",
							kcal: 2.18,
							label: "Aledo",
							type: "availableFood",
							unit: "g",
							value: "aledo",
						},
						id: "casd28bff4-8ed5-b80a-6acf-8be1adf2d86",
						type: "food",
					},
					{
						amount: 12,
						food: {
							common: 200,
							id: "55f4bbe-8040-bdee-e57e-a82b8b8675d",
							kcal: 2.18,
							label: "Helado",
							type: "availableFood",
							unit: "g",
							value: "helado",
						},
						id: "c28bff4-8ed5-b80a-6acf-8be1adf2d86",
						type: "food",
					},
				],
				exerciseList: [
					{
						exercise: {
							common: 30,
							id: "fe6d4-7167-106e-2cb5-bae2ca8d6c6",
							kcal: 6.67,
							label: "Pesas ",
							type: "availableExercise",
							unit: "min",
							value: "pesas ",
						},
						id: "c367f25-1f6c-3d1-dda1-571c47c0015",
						time: 12,
						type: "exercise",
					},
					{
						exercise: {
							common: 30,
							id: "fe6d4-7167-106e-2cb5-baasde2ca8d6c6",
							kcal: 6.67,
							label: "Sapes ",
							type: "availableExercise",
							unit: "min",
							value: "sapes ",
						},
						id: "c367f25-1f6c-3d1asd-dda1-571c47c0015",
						time: 24,
						type: "exercise",
					},
				],
			},
		},
	];

	const [listHistory, setListHistory] = useState([]);

	useEffect(() => {
		updateLists(listHistory, selectedDate), [selectedDate];
	});

	const [availableFoodList, setAvailableFoodList] = useState([]);
	const [availableExerciseList, setAvailableExerciseList] = useState([]);

	const updateLists = (history = listHistory, date) => {
		let dayItem = history.find((item) => item.date == date);

		if (dayItem) {
			setFoodList(dayItem.lists.foodList);
			setExerciseList(dayItem.lists.exerciseList);
		}

		console.log("lists Updated!");
	};

	const fetchListHistory = async () => {
		try {
			const fetched = await getData("@listHistory");
			setListHistory(fetched);
			updateLists(fetched, selectedDate);
		} catch (err) {
			console.error(err);
		}
	};

	const storeListHistory = (newFoodList, newExerciseList, date) => {
		let newListHistory = listHistory;
		let newItem = { date: date, lists: { foodList: newFoodList, exerciseList: newExerciseList } };

		console.log("NEW LISTHISTORY", newListHistory);
		console.log("NEW ITEM", newItem);

		// If index exists, "list" should be replaced
		let index = newListHistory.findIndex((item) => item.date == date);
		if (index !== undefined) {
			newListHistory[index] = newItem;
		} else {
			newListHistory = [...newListHistory, newItem];
		}

		storeData("@listHistory", newListHistory);
	};

	// ─── FUNCTIONS ──────────────────────────────────────────────────────────────────

	// ─── FOOD ───────────────────────────────────────────────────────────────────────
	const addFood = ({ food, amount }) => {
		return new Promise((resolve, reject) => {
			newFood({ food: food, amount: amount })
				.then((value) => {
					let newFoodList = [...foodList, value];
					setFoodList(newFoodList);
					storeListHistory(newFoodList, exerciseList, selectedDate);
					resolve("Item Has Been Saved");
				})
				.catch((error) => {
					reject(Error(error));
				});
		});
	};

	// ────────────────────────────────────────────────────────────
	const editFood = ({ id, food, amount }) => {
		let newFood = {
			type: "food",
			food: food, // Object from AvailableFoodList
			amount: Math.abs(parseInt(amount)),
			id: id,
		};

		let newFoodList = foodList.map((item, index) => {
			if (item.id == id) return foodList.splice(index, 1, newFood);
		});

		setFoodList(newFoodList);
		storeListHistory(newFoodList, exerciseList, selectedDate);
	};

	// ────────────────────────────────────────────────────────────
	const deleteFood = ({ id }) => {
		let newFoodList = foodList;
		newFoodList = newFoodList.filter((item) => {
			return item.id !== id;
		});

		setFoodList(newFoodList);
		storeListHistory(newFoodList, exerciseList, selectedDate);
	};

	// ─── AVAILABLE FOOD ──────────────────────────────────────────────────────────────
	const createAvailableFood = ({ label, common, unit, kcal }) => {
		return new Promise((resolve, reject) => {
			newAvailableFood({ label: label, common: common, unit: unit, kcal: kcal })
				.then((value) => {
					let newAvailableFoodList = [...availableFoodList, value];
					setAvailableFoodList(newAvailableFoodList);
					storeData("@availableFoodList", newAvailableFoodList);
					resolve("Item Has Been Saved");
					console.log(value);
				})
				.catch((error) => {
					reject(Error(error));
				});
		});
	};

	// ────────────────────────────────────────────────────────────
	const editAvailableFood = ({ id, label, common, unit, kcal }) => {
		let newAvailableFood = {
			type: "availableFood",
			label: label,
			value: label.toLowerCase(),
			common: Math.abs(parseInt(common)),
			unit: unit,
			kcal: roundNumber(Math.abs(parseInt(kcal)) / Math.abs(parseInt(common))),
			id: id,
		};

		let newAvailableFoodList = availableFoodList;
		newAvailableFoodList = newAvailableFoodList.map((item, index) => {
			if (item.id == id) newAvailableFoodList[index] = newAvailableFood;
		});

		setAvailableFoodList(newAvailableFoodList);
		storeData("@availableFoodList", newAvailableFoodList);
	};

	// ────────────────────────────────────────────────────────────
	const deleteAvailableFood = ({ id }) => {
		let newAvailableFoodList = availableFoodList;
		newAvailableFoodList = newAvailableFoodList.filter((item) => {
			return item.id !== id;
		});

		setAvailableFoodList(newAvailableFoodList);
		storeData("@availableFoodList", newAvailableFoodList);
	};

	// ─── EXERCISE ───────────────────────────────────────────────────────────────────
	const addExercise = ({ exercise, time }) => {
		newExercise({ exercise: exercise, time: time })
			.then((result) => console.log(result))
			.catch((error) => Error(error));
		return new Promise((resolve, reject) => {
			newExercise({ exercise: exercise, time: time })
				.then((value) => {
					let newExerciseList = [...exerciseList, value];
					setExerciseList(newExerciseList);
					storeListHistory(foodList, newExerciseList, selectedDate);
					resolve("Item Has Been Saved");
				})
				.catch((error) => {
					reject(Error(error));
				});
		});
	};

	// ────────────────────────────────────────────────────────────
	const editExercise = ({ id, exercise, time }) => {
		let newExercise = {
			type: "exercise",
			exercise: exercise, // Object from availableExerciseList
			time: Math.abs(parseInt(time)),
			id: id,
		};

		let newExerciseList = exerciseList;
		newExerciseList = newExerciseList.map((item, index) => {
			if (item.id == id) newExerciseList[index] = newExercise;
		});

		setExerciseList(newExerciseList);
		storeListHistory(foodList, newExerciseList, selectedDate);
	};

	// ────────────────────────────────────────────────────────────
	const deleteExercise = ({ id }) => {
		let newExerciseList = exerciseList;
		newExerciseList = newExerciseList.filter((item) => {
			return item.id !== id;
		});
		setExerciseList(newExerciseList);
		storeListHistory(foodList, newExerciseList, selectedDate);
	};

	// ─── AVAILABLE EXERCISE ─────────────────────────────────────────────────────────
	const createAvailableExercise = ({ label, common, kcal }) => {
		return new Promise((resolve, reject) => {
			newAvailableExercise({ label: label, common: common, kcal: kcal })
				.then((value) => {
					let newAvailableExerciseList = [...availableExerciseList, value];
					setAvailableExerciseList(newAvailableExerciseList);
					storeData("@availableExerciseList", newAvailableExerciseList);
					resolve("Item Has Been Saved");
				})
				.catch((error) => {
					reject(Error(error));
				});
		});
	};

	// ────────────────────────────────────────────────────────────
	const editAvailableExercise = ({ id, label, common, kcal }) => {
		let newAvailableExercise = {
			type: "availableExercise",
			label: label,
			value: label.toLowerCase(),
			common: Math.abs(parseInt(common)),
			unit: "min",
			cal: roundNumber(Math.abs(parseInt(kcal)) / Math.abs(parseInt(common))) * -1, // Always negative integer
			id: id,
		};

		let newAvailableExerciseList = availableExerciseList;
		newAvailableExerciseList = newAvailableExerciseList.map((item, index) => {
			if (item.id == id) newAvailableExerciseList[index] = newAvailableExercise;
		});

		setAvailableExerciseList(newAvailableExerciseList);
		storeData("@availableExerciseList", newAvailableExerciseList);
	};

	// ────────────────────────────────────────────────────────────
	const deleteAvailableExercise = ({ id }) => {
		let newAvailableExerciseList = availableExerciseList;
		newAvailableExerciseList = newAvailableExerciseList.filter((item) => {
			return item.id !== id;
		});

		setAvailableExerciseList(newAvailableExerciseList);
		storeData("@availableExerciseList", newAvailableExerciseList);
	};

	// ─── GOAL CALORIES ──────────────────────────────────────────────────────────────

	const [goalCalories, setGoalCalories] = useState(2500);

	const editGoalCalories = (value) => {
		setGoalCalories(value ? value : 0);
		storeData("@goalCalories", value);
	};

	const getTotalCalories = (type) => {
		let totalCalories = 0;
		if (type == "food") {
			foodList.map((item) => {
				totalCalories += item.amount * item.food.kcal;
			});
		} else if (type == "exercise") {
			exerciseList.map((item) => {
				totalCalories += Math.abs(item.time * item.exercise.kcal) * -1;
			});
		}
		return totalCalories ? roundNumber(totalCalories) : 0;
	};

	// ─── LOCAL STORAGE ──────────────────────────────────────────────────────────────

	const storeData = async (key, value) => {
		try {
			const jsonValue = JSON.stringify(value);
			await AsyncStorage.setItem(key, jsonValue);
			console.log("List Saved");
		} catch (error) {
			console.error(error);
		}
	};

	const getData = async (key) => {
		try {
			const jsonValue = await AsyncStorage.getItem(key);
			console.log("List Fetched");
			return jsonValue != null ? JSON.parse(jsonValue) : [];
		} catch (error) {
			console.error(error);
		}
	};

	const getAllData = () => {
		fetchListHistory();
		getData("@availableFoodList")
			.then((result) => {
				setAvailableFoodList(result);
			})
			.catch((err) => {
				console.error(err);
			});
		// getData("@foodList")
		// 	.then((result) => {
		// 		setFoodList(result);
		// 	})
		// 	.catch((err) => {
		// 		console.error(err);
		// 	});
		getData("@availableExerciseList")
			.then((result) => {
				setAvailableExerciseList(result);
			})
			.catch((err) => {
				console.error(err);
			});
		// getData("@exerciseList")
		// 	.then((result) => {
		// 		setExerciseList(result);
		// 	})
		// 	.catch((err) => {
		// 		console.error(err);
		// 	});
		getData("@goalCalories")
			.then((result) => {
				setGoalCalories(result);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const storeAllData = () => {
		storeData("@listHistory", listHistory);
		storeData("@availableFoodList", availableFoodList);
		storeData("@availableExerciseList", availableExerciseList);
		storeData("@goalCalories", goalCalories);
	};

	const clearAsyncStorage = async () => {
		AsyncStorage.clear();
	};

	// ─── RETURN ─────────────────────────────────────────────────────────────────────

	return (
		<AppContext.Provider
			value={{
				// Food
				foodList,
				addFood,
				deleteFood,
				editFood,
				// • • • • •
				availableFoodList,
				createAvailableFood,
				editAvailableFood,
				deleteAvailableFood,
				// Exercise
				exerciseList,
				addExercise,
				editExercise,
				deleteExercise,
				// • • • • •
				availableExerciseList,
				createAvailableExercise,
				editAvailableExercise,
				deleteAvailableExercise,
				// Calories
				getTotalCalories,
				goalCalories,
				editGoalCalories,
				// Date
				selectedDate,
				setSelectedDate,
				_dateFormat,
				// Math
				roundNumber,
				// Data
				storeAllData,
				storeData,
				getAllData,
				getData,
				// Dev
				clearAsyncStorage,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
};
