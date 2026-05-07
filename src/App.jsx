import { BsBarChartFill } from "react-icons/bs";
<<<<<<< HEAD
import './styles/global_styles.css'
=======
import Navbar from "./components/navbar";
import Overview from "./components/overview";
import './styles/global_styles.css'
import { Dashboard } from "./components/Dashboard/Dashboard";
import { AccountsProvider } from "./context/AccountsContext";
import { TransactionsProvider } from "./context/TransactionsContext";
import { BalancesProvider } from "./context/BalancesContext";
>>>>>>> e839dddce8ffd1930e0c8023e59cb5c5044230b4

function App() {
  return (
    <>
<<<<<<< HEAD
    <BsBarChartFill/>
    <h1>Sistema Inteligente de Análise de Perfil Financeiro, Consumo e Geração de 
Insights</h1>
    </>
=======
      <Navbar />
      <Overview />
    </>
  );
    <AccountsProvider>
      <TransactionsProvider>
        <BalancesProvider>

          <BsBarChartFill/>
          <Dashboard />

        </BalancesProvider>
      </TransactionsProvider>
    </AccountsProvider>
>>>>>>> e839dddce8ffd1930e0c8023e59cb5c5044230b4
  )
}

export default App;
