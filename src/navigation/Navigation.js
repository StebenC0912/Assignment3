import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "../screens/Home";
import ExpenseDetail from "../screens/ExpenseDetail";
import AddExpense from "../screens/AddExpense";
import EditExpense from "../screens/EditExpense";
import AllExpense from "../screens/AllExpense";
import CategoryExpenseList from "../screens/CategoryExpenseList";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Expense Detail" component={ExpenseDetail} />
      <Stack.Screen name="Edit Expense" component={EditExpense} />
      <Stack.Screen name="Category Expense" component={CategoryExpenseList} />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ headerShown: false, tabBarActiveTintColor: "#5B75FC" }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={AddExpense}
          options={{
            tabBarLabel: "Add Expense",
            tabBarIcon: ({ color }) => (
              <Ionicons name="add-circle" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="All Expense"
          component={AllExpense}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="book" color={color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
