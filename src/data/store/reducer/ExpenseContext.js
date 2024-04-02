import { createContext, useReducer } from "react";
import { CategoryData, ExpenseData } from "../../dummy-data";
export const ExpenseContext = createContext({
  Expense: ExpenseData,
  Category: CategoryData,
  addExpense: ({ amount, category, note, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { amount, category, note, date }) => {},
});

function expenseReducer(state, action) {
  switch (action.type) {
    case "ADD_EXPENSE":
      const id = new Date().toString() + Math.random().toString();
      

      return {
        ...state,
        Expense: [
          ...state.Expense,
          {
            id,
            amount: action.payload.amount,
            category: action.payload.category,
            note: action.payload.note,
            date: action.payload.date,
          },
        ],
      };
    case "DELETE_EXPENSE":
      return {
        ...state,
        Expense: state.Expense.filter(
          (expense) => expense.id !== action.payload
        ),
      };
    case "UPDATE_EXPENSE":
      return {
        ...state,
        Expense: state.Expense.map((expense) =>
          expense.id === action.payload.id
            ? {
                ...expense,
                amount: action.payload.amount,
                category: action.payload.category,
                note: action.payload.note,
                date: action.payload.date,
              }
            : expense
        ),
      };
    default:
      return state;
  }
}
function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, {
    Expense: ExpenseData,
    Category: CategoryData,
  });

  function addExpense({ amount, category, note, date }) {
    dispatch({
      type: "ADD_EXPENSE",
      payload: { amount, category, note, date },
    });
  }
  function deleteExpense(id) {
    dispatch({
      type: "DELETE_EXPENSE",
      payload: id,
    });
  }
  function updateExpense(id, { amount, category, note, date }) {
    dispatch({
      type: "UPDATE_EXPENSE",
      payload: { id, amount, category, note, date },
    });
  }

  const contextValue = {
    Expense: state.Expense,
    Category: state.Category,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpenseContext.Provider value={contextValue}>
      {children}
    </ExpenseContext.Provider>
  );
}
export default ExpenseProvider;
