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
import CategoryItem from "../components/CategoryItem";
import ExpenseItem from "../components/ExpenseItem";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ExpenseContext } from "../data/store/reducer/ExpenseContext";
export default function Home(props) {
  const context = useContext(ExpenseContext);
  const data = context.Category;
  let expensesData = context.Expense;
  expensesData = expensesData.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  // from expeseData take the first 3 items
  const expenses = expensesData.slice(0, 3);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  // Initialize state for current month
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    new Date().getMonth()
  );

  // Function to handle previous month click
  // Function to handle previous month click
  const handlePrevMonthClick = () => {
    let prevMonthIndex = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;
    let prevYear = currentYear;
    if (prevMonthIndex === 11) {
      prevYear--;
    }
    setCurrentMonthIndex(prevMonthIndex);
    setCurrentYear(prevYear);
  };

  // Function to handle next month click
  const handleNextMonthClick = () => {
    if (
      currentMonthIndex === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
    ) {
      return;
    }

    let nextMonthIndex = currentMonthIndex === 11 ? 0 : currentMonthIndex + 1;
    let nextYear = currentYear;
    if (nextMonthIndex === 0) {
      nextYear++;
    }
    setCurrentMonthIndex(nextMonthIndex);
    setCurrentYear(nextYear);
  };

  // Calculate total expense based on the selected month and year
  const totalExpense = useMemo(() => {
    return expensesData
      .filter(
        (expense) =>
          new Date(expense.date).getMonth() === currentMonthIndex && // Filter by current month
          new Date(expense.date).getFullYear() === currentYear // Filter by current year
      )
      .reduce((acc, expense) => acc + expense.amount, 0)
      .toLocaleString();
  }, [currentMonthIndex, currentYear, expensesData]);
  const handleExpense = (id) => {
    props.navigation.navigate("Expense Detail", { id: id });
  };
  const handleCategory = (category) => {
    console.log(category);
    props.navigation.navigate("Category Expense", { category: category });
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={StyleSheet.create({
            flex: 1,
            alignContent: "center",
            justifyContent: "center",
            padding: 20,
          })}
        >
          <Text
            style={StyleSheet.create({
              fontSize: 36,
              marginTop: 20,
              marginBottom: 20,
              textAlign: "center",
            })}
          >
            Welcome
          </Text>
          <View
            style={StyleSheet.create({
              justifyContent: "space-evenly",
              alignItems: "center",
              backgroundColor: "#031B96",
              borderRadius: 10,
              height: 200,
            })}
          >
            <Text
              style={StyleSheet.create({
                fontSize: 18,
                marginBottom: 10,
                color: "white",
              })}
            >
              Total Expense
            </Text>
            <Text
              style={StyleSheet.create({
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 10,
                color: "white",
              })}
            >
              ${totalExpense}
            </Text>

            <View
              style={StyleSheet.create({
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginBottom: 10,
              })}
            >
              <TouchableOpacity
                style={StyleSheet.create({
                  backgroundColor: "white",
                  borderRadius: 50,
                })}
                onPress={handlePrevMonthClick}
              >
                <Ionicons
                  name="chevron-back-circle"
                  size={24}
                  color="#5B75FC"
                />
              </TouchableOpacity>

              <Text
                style={StyleSheet.create({
                  fontSize: 18,
                  marginHorizontal: 20,
                  color: "white",
                })}
              >
                {monthNames[currentMonthIndex]} / {currentYear}
              </Text>
              <TouchableOpacity
                style={StyleSheet.create({
                  backgroundColor: "white",
                  borderRadius: 50,
                })}
                onPress={handleNextMonthClick}
              >
                <Ionicons
                  name="chevron-forward-circle"
                  size={24}
                  color="#5B75FC"
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={StyleSheet.create({
              fontSize: 16,
              color: "black",
              marginTop: 20,
            })}
          >
            Category
          </Text>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            numColumns={4}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <CategoryItem item={item} handleExpress={handleCategory}/>}
            scrollEnabled={false}
            style={StyleSheet.create({
              flex: 1,
              width: "100%",
              marginTop: 10,
            })}
          />
          <View
            style={StyleSheet.create({
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            })}
          >
            <Text
              style={StyleSheet.create({
                fontSize: 16,
                color: "black",
                marginTop: 20,
              })}
            >
              Recent Expenses
            </Text>
          </View>
          <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExpenseItem item={item} handleExpress={handleExpense} />
            )}
            scrollEnabled={false}
            style={StyleSheet.create({
              flex: 1,
              width: "100%",
              marginTop: 10,
            })}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
