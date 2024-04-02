import { useContext, useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { getFormattedDate } from "../data/models/Date";
import { ExpenseContext } from "../data/store/reducer/ExpenseContext";
function ExpenseDetail(props) {
  const context = useContext(ExpenseContext);
  const data = context.Category;

  const expensesData = context.Expense;
  const expenseId = props.route.params.id;
  console.log(expenseId);
  const expense = expensesData.find((item) => item.id === expenseId);

  return (
    <SafeAreaView
      style={StyleSheet.create({
        flex: 1,
        backgroundColor: "#8FA1FF",
      })}
    >
      <View
        style={StyleSheet.create({
          backgroundColor: "white",
          marginTop: 40,
          marginHorizontal: 15,
          borderRadius: 10,
        })}
      >
        <View
          style={StyleSheet.create({
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#BFC9FA",
            borderRadius: 10,
            padding: 10,
          })}
        >
          <Text
            style={StyleSheet.create({
              fontSize: 16,
              textAlign: "center",
            })}
          >
            Amount
          </Text>
          <Text
            style={StyleSheet.create({
              fontSize: 20,
              textAlign: "center",
              fontWeight: "bold",
              textAlign: "center",
            })}
          >
            ${expense.amount}
          </Text>
        </View>
        <View style={styles.item}>
          <Text>Time</Text>
          <Text>{getFormattedDate(expense.date)}</Text>
        </View>
        <View style={styles.item}>
          <Text>Category</Text>
          <Text>{expense.category.name}</Text>
        </View>
        <View style={styles.item}>
          <Text>Notes</Text>
          <Text>{expense.note}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={StyleSheet.create({
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#031B96",
          borderRadius: 10,
          marginHorizontal: 15,
          padding: 10,
          marginTop: 20,
        })}
        onPress={() => props.navigation.navigate("Edit Expense", { id: expenseId })}
      >
        <Ionicons name="pencil" size={24} color={"white"} />
        <Text style={StyleSheet.create({
          color: "white",
          marginLeft: 16,
          fontWeight: "bold",
          marginVertical: 5,
          fontSize: 16,
        })}>Edit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
});
export default ExpenseDetail;
