import { BsBarChartFill } from "react-icons/bs";
import './styles/global_styles.css'
import { Dashboard } from "./components/Dashboard/Dashboard";
import { AccountsProvider } from "./context/AccountsContext";
import { TransactionsProvider } from "./context/TransactionsContext";

function App() {

  return (
    <AccountsProvider>
      <TransactionsProvider>
      <BsBarChartFill/>
      <Dashboard />
      </TransactionsProvider>
    </AccountsProvider>
  )
}

export default App
