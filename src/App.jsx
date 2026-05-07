import Navbar from "./components/navbar";
import Overview from "./components/overview";
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
          <Dashboard />
        </BalancesProvider>
      </TransactionsProvider>
    </AccountsProvider>
  );
}

export default App;
