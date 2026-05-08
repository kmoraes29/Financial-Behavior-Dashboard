import Navbar from "./components/navbar";
import Overview from "./components/overview";
import DashboardGraphs from "./components/DashboardGraphs/dashboardGraphs";
import { AccountsProvider } from "./context/AccountsContext";
import { TransactionsProvider } from "./context/TransactionsContext";
import { BalancesProvider } from "./context/BalancesContext";
import { CompaniesProvider } from "./context/EmpresaContext";
import { PeriodsProvider } from "./context/PeriodsContext";

function App() {
  return (
    <AccountsProvider>
      <TransactionsProvider>
        <PeriodsProvider>
          <BalancesProvider>
            <CompaniesProvider>

              <Navbar />
              <Overview />
              <DashboardGraphs />

            </CompaniesProvider>
          </BalancesProvider>
        </PeriodsProvider>
      </TransactionsProvider>
    </AccountsProvider>
  );
}

export default App;
