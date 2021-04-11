import React from "react";
import { View, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

const list = [
	{
		name: "Egg",
		amount: 2,
		unit: "units",
		kcal: 75
	},
	{
		name: "Cheese",
		amount: 143,
		unit: "g",
		kcal: 2
	},
	{
		name: "Milk",
		amount: 200,
		unit: "ml",
		kcal: 0.7
	},
	{
		name: "Steak",
		amount: 245,
		unit: "g",
		kcal: 1.7
	},
];

const Diary = () => {
	return (
		<View style={styles.container}>
			{
				list.map((l,i) => (
					<ListItem key={i} bottomDivider>
						<ListItem.Content>
							<ListItem.Title>{l.name}</ListItem.Title>
							<ListItem.Subtitle>{l.amount + " " + l.unit}</ListItem.Subtitle>
						</ListItem.Content>
					</ListItem>
				))
			}
		</View>
	);
};

export default Diary;

const styles = StyleSheet.create({
	container: {
	},
});
