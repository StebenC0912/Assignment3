import ExpenseProvider from "./src/data/store/reducer/ExpenseContext";
import Navigation from "./src/navigation/Navigation";

export default function App() {
  return <ExpenseProvider>
    <Navigation />
  </ExpenseProvider>;
}
