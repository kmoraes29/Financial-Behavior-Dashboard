import Navbar from "./components/navbar";
import Overview from "./components/overview";
import DashboardGraphs from "./components/DashboardGraphs/dashboardGraphs";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { AccountsProvider } from "./context/AccountsContext";
import { TransactionsProvider } from "./context/TransactionsContext";
import { BalancesProvider } from "./context/BalancesContext";
import { CompaniesProvider } from "./context/EmpresaContext";
import { PeriodsProvider } from "./context/PeriodsContext";
import { MetricCards } from "./components/MetricCards";

function App() {
  return (
    <AccountsProvider>
      <TransactionsProvider>
        <PeriodsProvider>
          <BalancesProvider>
            <CompaniesProvider>
              <Navbar />
              <Overview />
              <MetricCards />
              <DashboardGraphs />
              <Dashboard />
            </CompaniesProvider>
          </BalancesProvider>
        </PeriodsProvider>
      </TransactionsProvider>
    </AccountsProvider>
  );
}

export default App;
