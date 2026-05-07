import { BsBarChartFill } from "react-icons/bs";
import Navbar from "./components/navbar";
import Overview from "./components/overview";
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
          
          <Navbar />
          <Overview />
          <BsBarChartFill/>
          <Dashboard />

        </BalancesProvider>
      </TransactionsProvider>
    </AccountsProvider>
  )
}

export default App;
