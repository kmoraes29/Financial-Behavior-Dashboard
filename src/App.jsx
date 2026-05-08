import Navbar from "./components/navbar";
import Overview from "./components/overview";
import DashboardGraphs from "./components/DashboardGraphs/dashboardGraphs";
import Acao from "./components/DashboardGraphs/acao";
import { Dashboard } from "./components/Dashboard/Dashboard";
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
              <Acao />
            </CompaniesProvider>
          </BalancesProvider>
        </PeriodsProvider>
      </TransactionsProvider>
    </AccountsProvider>
  );
}

export default App;
