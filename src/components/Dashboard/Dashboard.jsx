import { useAccounts } from "../../context/AccountsContext"; 
import { useTransactions } from "../../context/TransactionsContext";
import { RevenueExpensesBarChart } from "../Charts/RevenueExpensesBarChart/RevenueExpensesBarChart";
import { useBalances } from "../../context/BalancesContext";
import { formatRevenueExpensesChartData } from "../../utils/chartData";

export const Dashboard = () => {

    const { accounts, loadingAccounts, handleAccountSelected } = useAccounts();
    const { transactions, loadingTransaction } = useTransactions();

    const { balances, loadingBalances } = useBalances();
    const chartData = formatRevenueExpensesChartData(balances);

    return (
        <div>
        <h2>Contas Bancárias</h2>

            {
                loadingAccounts 
                ?
                <p>Carregando contas...</p>
                :            
                <select onChange={(event)=>handleAccountSelected(event.target.value)}> 
                    <option value="0" disabled selected>Selecione a sua conta</option>

                    {accounts.map((account)=>{ 
                        return (
                            <option key={account.id} value={account.instituicao}>
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
            }
        </div>
    );
};