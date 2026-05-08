import Navbar from "./components/navbar";
import Overview from "./components/overview";
import DashboardGraphs from "./components/DashboardGraphs/dashboardGraphs";
import Acao from "./components/DashboardGraphs/acao";
import { AccountsProvider } from "./context/AccountsContext";
import { TransactionsProvider } from "./context/TransactionsContext";
import { BalancesProvider } from "./context/BalancesContext";
import { CompaniesProvider } from "./context/EmpresaContext";
import { PeriodsProvider } from "./context/PeriodsContext";
import { ClientsProvider } from "./context/ClientContext";

function App() {
  return (
    <AccountsProvider>
      <TransactionsProvider>
        <PeriodsProvider>
          <BalancesProvider>
            <CompaniesProvider>
              <ClientsProvider>

                <Navbar />
                <Overview />
                <DashboardGraphs />
                <Acao />
              
              </ClientsProvider>
            </CompaniesProvider>
          </BalancesProvider>
        </PeriodsProvider>
      </TransactionsProvider>
    </AccountsProvider>
  );
}

export default App;
