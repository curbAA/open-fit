import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text, ListItem, Icon } from "react-native-elements";

// Context
import { AppContext } from "openfit/components/Context/AppContext";

// Components
const MacroContainer = ({ item, roundNumber }) => {
    return (
        <View style={styles.macroParent}>
            <View style={styles.macroContainer}>
                <Text style={styles.macroNumber}>
                    {roundNumber(item.food.macros.protein * item.amount, 0)} g
                </Text>
                <Text style={styles.macroSubtitle}>Prot.</Text>
            </View>
            <View style={styles.macroContainer}>
                <Text style={styles.macroNumber}>
                    {roundNumber(item.food.macros.carbs * item.amount, 0)} g
                </Text>
                <Text style={styles.macroSubtitle}>Carb.</Text>
            </View>
            <View style={styles.macroContainer}>
                <Text style={styles.macroNumber}>
                    {roundNumber(item.food.macros.fat * item.amount, 0)} g
                </Text>
                <Text style={styles.macroSubtitle}>Fat.</Text>
            </View>
        </View>
    );
};

const ListItemFood = ({ item }) => {
    const { deleteFood, editFood, roundNumber } = useContext(AppContext);
    return (
        <ListItem bottomDivider>
            <ListItem.Content style={styles.itemContainer}>
                <View>
                    <ListItem.Title>{item.food.label}</ListItem.Title>
                    <ListItem.Subtitle>{item.amount + " " + item.food.unit}</ListItem.Subtitle>
                </View>
                <MacroContainer item={item} roundNumber={roundNumber} />
                <View style={styles.caloriesContainer}>
                    <Text style={styles.calories}>
                        {roundNumber(item.food.kcal * item.amount, 0)}
                    </Text>
                    <Text style={styles.subtitle}>Kcal</Text>
                </View>
                <Icon
                    containerStyle={foodStyles.itemButtonContainer}
                    iconStyle={foodStyles.itemButtonIcon}
                    size={17}
                    color="#9e9e9e"
                    name="trash"
                    type="font-awesome-5"
                    onPress={() => deleteFood({ id: item.id })}
                />
                {/* <Icon
							containerStyle={foodStyles.itemButtonContainer}
							iconStyle={foodStyles.itemButtonIcon}
							size={17}
							color="#9e9e9e"
							name="pen"
							type="font-awesome-5"
							onPress={() => console.log("Edit")}
						/> */}
            </ListItem.Content>
        </ListItem>
    );
};

const ListItemExercise = ({ item }) => {
    const { deleteExercise, editExercise, roundNumber } = useContext(AppContext);
    return (
        <ListItem bottomDivider>
            <ListItem.Content style={styles.itemContainer}>
                <View>
                    <ListItem.Title>{item.exercise.label}</ListItem.Title>
                    <ListItem.Subtitle>{item.time} min</ListItem.Subtitle>
                </View>
                <View style={styles.caloriesContainer}>
                    <Text style={styles.calories}>
                        {roundNumber(item.exercise.kcal * item.time, 0)}
                    </Text>
                    <Text style={styles.subtitle}>Kcal</Text>
                </View>

                <Icon
                    containerStyle={foodStyles.itemButtonContainer}
                    iconStyle={foodStyles.itemButtonIcon}
                    size={17}
                    color="#9e9e9e"
                    name="trash"
                    type="font-awesome-5"
                    onPress={() => deleteExercise({ id: item.id })}
                />
                {/* <Icon
							containerStyle={foodStyles.itemButtonContainer}
							iconStyle={foodStyles.itemButtonIcon}
							size={17}
							color="#9e9e9e"
							name="pen"
							type="font-awesome-5"
							onPress={() => console.log("Edit")}
						/> */}
            </ListItem.Content>
        </ListItem>
    );
};

const CustomListItem = {
    Food: ListItemFood,
    Exercise: ListItemExercise,
};

export default CustomListItem;

const styles = StyleSheet.create({
    itemContainer: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    caloriesContainer: {
        textAlign: "center",
    },
    calories: {
        textAlign: "center",
        color: "cornflowerblue",
        fontWeight: "bold",
    },
    subtitle: {
        color: "cornflowerblue",
        fontSize: 12,
        textAlign: "center",
    },
    macroParent: {
        display: "flex",
        flexDirection: "row",
        width: 120,
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "gray",
        paddingVertical: 2,
        paddingHorizontal: 15,
        borderRadius: 30,
    },
    macroContainer: {
        textAlign: "center",
    },
    macroNumber: {
        textAlign: "center",
        color: "gray",
    },
    macroSubtitle: {
        color: "gray",
        fontSize: 10,
    },
});

const foodStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    item: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: "row-reverse",
        alignItems: "center",
    },
    itemButtonContainer: {
        marginHorizontal: 5,
    },
    itemButtonIcon: {
        padding: 8,
    },
});
