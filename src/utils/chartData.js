export function formatRevenueExpensesChartData (balances){
    return balances.map((balance)=>({
        month: balance.ano_mes,
        revenue: balance.total_receitas,
        expenses: balance.total_despesas,
        result: balance.resultado_mes,
        finalBalance: balance.saldo_final
    }))
};