import React, { useContext, useMemo, useLayoutEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ExpenseContext } from "../data/store/reducer/ExpenseContext";

export default function CategoryExpenseList(props) {
  const { navigation } = props;

  const context = useContext(ExpenseContext);
  const category = props.route.params.category.name;
  useLayoutEffect(() => {
    navigation.setOptions({ title: category });
  }, [navigation, category]);
  // Get all the expenses matching the category
  const expenses = context.Expense.filter(
    (expense) => expense.category.name === category
  );
  // Calculate total expense
  const totalExpense = useMemo(() => {
    // Calculate total expense by summing up all the expenses
    return expenses.reduce((acc, curr) => acc + curr.amount, 0);
  });

  //  sort the expenses by date
  const sortedExpenses = useMemo(() => {
    return expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  // Object to store unique dates and corresponding expense IDs
  const uniqueDateInExpenses = {};

  // Populate uniqueDateInExpenses
  sortedExpenses.forEach((expense) => {
    const expenseDate = new Date(expense.date).toLocaleDateString();
    const expenseId = expense.id;
    if (!uniqueDateInExpenses[expenseDate]) {
      uniqueDateInExpenses[expenseDate] = [];
    }
    uniqueDateInExpenses[expenseDate].push(expenseId);
  });

  // Extract the dates from uniqueDateInExpenses
  const uniqueDates = Object.keys(uniqueDateInExpenses);

  console.log(uniqueDates);

  return (
    <SafeAreaView
      style={StyleSheet.create({
        flex: 1,
        backgroundColor: "white",
      })}
    >
      <ScrollView>
        <View
          style={StyleSheet.create({
            alignContent: "center",
            justifyContent: "center",
            padding: 20,
            width: "100%",
          })}
        >
          <Text
            style={StyleSheet.create({
              textAlign: "center",
            })}
          >
            Total Expense: {totalExpense}
          </Text>
        </View>
        <FlatList
          scrollEnabled={false}
          data={uniqueDates}
          renderItem={({ item }) => {
            return (
              <View
                style={StyleSheet.create({
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: 10,
                  borderBottomColor: "#EFEFEF",
                  width: "100%",
                })}
              >
                <Text
                  style={StyleSheet.create({
                    borderBottomWidth: 1,
                    marginBottom: 10,
                  })}
                >
                  {item}
                </Text>
                <FlatList
                  data={uniqueDateInExpenses[item]}
                  renderItem={({ item }) => {
                    const expense = expenses.find(
                      (expense) => expense.id === item
                    );
                    return (
                        <TouchableOpacity
                        style={StyleSheet.create({
                          flexDirection: "row",
                          justifyContent: "space-between",
                          padding: 10,
                          borderRadius: 10,
                          marginBottom: 10,
                          backgroundColor: "#8FA1FF",
                          width: "100%",
                          alignContent: "center",
                        })}
                        onPress={() => {
                          props.navigation.navigate("Expense Detail", {
                            id: expense.id,
                          });
                        }}
                      >
                        <View>
                          <Text>{expense.note}</Text>
                          <Text>{expense.category.name}</Text>
                        </View>
                        <Text
                          style={StyleSheet.create({
                            textAlign: "right",
                            alignSelf: "center",
                          })}
                        >
                          USD {expense.amount}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
                <View
                  style={StyleSheet.create({
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 10,
                    borderRadius: 10,
                    marginBottom: 10,
                    borderTopWidth: 1,
                    width: "100%",
                  })}
                >
                  <Text>Total: </Text>
                  <Text>
                    {uniqueDateInExpenses[item].reduce((acc, curr) => {
                      const expense = expenses.find(
                        (expense) => expense.id === curr
                      );
                      return acc + expense.amount;
                    }, 0)}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
