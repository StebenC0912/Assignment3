import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getFormattedDate } from "../data/models/Date";

const ExpenseItem = ({ item , handleExpress}) => {

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleExpress(item.id)}
    >
      <Ionicons
        name={item.category.icon}
        size={24}
        color={"#5B75FC"}
      />
      <View style={styles.textContainer}>
        <Text style={styles.note}>{item.note}</Text>
        <Text>{getFormattedDate(item.date)}</Text>
      </View>
      <Text style={styles.amount}>${item.amount}</Text>
      <Ionicons name="chevron-forward" size={16} color={"#5B75FC"} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  note: {
    marginBottom: 5,
  },
  amount: {
    color: "red",
    fontSize: 16,
    marginRight: 10,
  },
});

export default ExpenseItem;
