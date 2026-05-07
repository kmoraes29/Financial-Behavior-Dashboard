import { useAccounts } from "../../context/AccountsContext"; 
import { useTransactions } from "../../context/TransactionsContext";
import { RevenueExpensesBarChart } from "../Charts/RevenueExpensesBarChart/RevenueExpensesBarChart";
import { useBalances } from "../../context/BalancesContext";
import { formatRevenueExpensesChartData } from "../../utils/chartData";
import { getIndicatorsPeriod } from '../../utils/financialIndicators';
import { usePeriods } from "../../context/PeriodsContext";
import { useCompanies } from "../../context/EmpresaContext";

export const Dashboard = () => {
    
    const { accounts, loadingAccounts, handleAccountSelected } = useAccounts();
    const { transactions, loadingTransaction } = useTransactions();
    const { balances, loadingBalances } = useBalances();
    const { periodSelected } = usePeriods();
    const { companySelected } = useCompanies();

    const chartData = formatRevenueExpensesChartData(balances);

    const indicators = getIndicatorsPeriod({transactions,balances,periodSelected, companySelectedId: companySelected?.id});

    return (
        <div>
            {indicators ? 
            <p>{indicators.averageRevenue}</p>
            : 
            <p>nada</p> 
            }

        {/* <h2>Contas Bancárias</h2>

            {
                loadingAccounts 
                ?
                <p>Carregando contas...</p>
                :            
                <select defaultValue="0" onChange={(event)=>handleAccountSelected(event.target.value)}> 
                    <option value="0" disabled>Selecione a sua conta</option>

                    {accounts.map((account)=>{ 
                        return (
                            <option key={account.id} value={account.id}>
                            {account.id} | {account.instituicao} | {account.agencia} | {account.conta}
                            </option>) })
                    }

                </select>
            }

        <hr />

        <h2>Transações</h2>
        
            {
                loadingTransaction 
                ?
                    <p>Carregando transações...</p>
                :            
                    (<ul> 
                        {transactions.map((transaction)=>{ 
                            const data_vencimento_fmt = new Date(transaction.data_vencimento).toLocaleDateString('pt-BR',{timeZone:'UTC'});

                            return (
                    
                            <li key={transaction.id}>
                                    {transaction.id} | {transaction.tipo} | {transaction.categoria} | R${transaction.valor.toFixed(2)} | {data_vencimento_fmt}
                            </li>) 
                        }
                        )
                        } 
                    </ul>)
            }

            <hr />
            <h2>Gráfico Balanço Receitas x Despesas</h2>
            { 
            loadingBalances 
            ? 
                <p>Carregando gráfico...</p> 
            : 
                <RevenueExpensesBarChart balances={chartData} /> 
            } */}
        </div>
    );
};
