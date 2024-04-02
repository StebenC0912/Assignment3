import React, { useContext, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import { ExpenseContext } from "../data/store/reducer/ExpenseContext";
import { Ionicons } from "react-native-vector-icons";
import { Dropdown } from "react-native-element-dropdown";

export default function AddExpense(props) {
  const context = useContext(ExpenseContext);
  const categories = context.Category;
  const [selected, setSelected] = React.useState("");
  const [amount, setAmount] = useState("");
  const amountRef = useRef(null);
  const [date, setDate] = useState("");
  const dateRef = useRef(null);
  const [notes, setNotes] = useState("");
  const notesRef = useRef(null);
  // Transforming Category objects into objects compatible with SelectList
  const data = categories.map((category) => ({
    key: category.id,
    value: category.name,
  }));

  const handleSubmit = () => {
    if (!selected || !amount || !date) {
      Alert.alert("Missing Information", "Please fill in all required fields.");
      return;
    }
    if (date.length !== 10 || date.charAt(4) !== "-"){
      Alert.alert("Invalid Date", "Please enter a valid date.");
      return;
    }
    const formatDate = new Date(date);
    
    const selectedCategory = categories.find((category) => category.name === selected.value);
    context.addExpense({
      amount: parseFloat(amount),
      category: selectedCategory,
      note: notes,
      date: formatDate,
    });
    setSelected("");
    amountRef.current.clear();
    dateRef.current.clear();
    notesRef.current.clear();
    console.log(context.Expense);
    // Optionally, navigate to another screen or show a success message
    Alert.alert("Expense Added", "Your expense has been saved successfully.");
  };

  return (
    <SafeAreaView
      style={StyleSheet.create({
        flex: 1,
        backgroundColor: "#8FA1FF",
      })}
    >
      <ScrollView>
        <View
          style={StyleSheet.create({
            backgroundColor: "white",
            paddingTop: 40,
            paddingBottom: 10,
            justifyContent: "center",
            alignItems: "center",
          })}
        >
          <Text
            style={StyleSheet.create({
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 10,
            })}
          >
            Add Expense
          </Text>
        </View>
        <View
          style={StyleSheet.create({
            padding: 20,
            backgroundColor: "#8FA1FF",
            flex: 1,
            flexDirection: "column",
          })}
        >
          <View>
            <Text style={styles.text}>Amount</Text>
            <TextInput
              ref={amountRef}
              placeholder="Enter Expense Amount"
              style={styles.textFields}
              keyboardType="numeric"
              onChangeText={(text) => setAmount(text)}
            />
            <Text style={styles.text}>Category</Text>
            <Dropdown
              style={styles.textFields}
              placeholderStyle={{ fontSize: 14 }}
              data={data}
              labelField={"value"}
              valueField={"key"}
              value={selected}
              onChange={(value) => setSelected(value)}
            />
            <Text style={styles.text}>Date</Text>
            <TextInput
              ref={dateRef}
              placeholder="YYYY-MM-DD"
              style={styles.textFields}
              keyboardType="numeric"
              onChangeText={(text) => setDate(text)}
            />
            <Text style={styles.text}>Notes</Text>
            <TextInput
              ref={notesRef}
              placeholder="Enter Notes"
              style={styles.textFields}
              onChangeText={(text) => setNotes(text)}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    marginBottom: 5,
    marginTop: 28,
  },
  textFields: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#031B96",
    borderRadius: 10,
    marginHorizontal: 15,
    padding: 10,
    marginTop: 35,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    marginVertical: 5,
    fontSize: 16,
  },
});
