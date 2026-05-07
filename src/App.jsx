import { BsBarChartFill } from "react-icons/bs";
import './styles/global_styles.css'
import { Dashboard } from "./components/Dashboard/Dashboard";
import { AccountsProvider } from "./context/AccountsContext";
import { TransactionsProvider } from "./context/TransactionsContext";
import { BalancesProvider } from "./context/BalancesContext";

function App() {

  return (
    <AccountsProvider>
      <TransactionsProvider>
        <BalancesProvider>

          <BsBarChartFill/>
          <Dashboard />

        </BalancesProvider>
      </TransactionsProvider>
    </AccountsProvider>
  )
}

export default App
