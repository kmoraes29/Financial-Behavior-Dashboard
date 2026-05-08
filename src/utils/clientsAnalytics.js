import { getPreviousPeriodFive } from './date';

export function getClientsAnalytics({
    clients,
    transactions,
    periodSelected,
    companySelectedId,
}) {
    if(!companySelectedId || !periodSelected) {
        return null;
    };

    const periods = [periodSelected, ...getPreviousPeriodFive(periodSelected)].reverse();

    const transactionsYearMonth = transactions.map((transaction) => {
        const [year, month] = transaction.data_competencia.split("-");
        return { ...transaction, ano_mes: `${year}-${month}` };
    });

    const clientsByCompany = clients.filter((client) =>
        String(client.empresaId) === String(companySelectedId) 
        // &&
        // !['Venda Balcão', 'Venda Delivery'].includes(client.nome)
    );

    const revenueByClientAndPeriod = transactionsYearMonth.reduce((acc, transaction) => {
        const isCompanyTransaction = String(transaction.empresaId) === String(companySelectedId);

        const isRevenue = transaction.tipo === "receita";
        
        const isPeriodIncluded = periods.includes(transaction.ano_mes);

        if (!isCompanyTransaction || !isRevenue || !isPeriodIncluded || !transaction.clienteId) {
            return acc;
        }

        const clientId = String(transaction.clienteId);

        if (!acc[clientId]) {
            acc[clientId] = {};
        }

        acc[clientId][transaction.ano_mes] =
            (acc[clientId][transaction.ano_mes] || 0) + Number(transaction.valor || 0);

        return acc;
    }, {});

    const resumeClientsPeriods = clientsByCompany.map((client) => {
        const clientRevenueByPeriod = revenueByClientAndPeriod[String(client.id)] || {};

        const receitas_por_mes = periods.map((period) => ({
            "mes": period,
            "receitas": clientRevenueByPeriod[period] || 0,
        }));

        const total_receitas = receitas_por_mes.reduce((acc, period) => {
            return acc + period.receitas;
        }, 0);

        return {
            "cliente": client,
            "clienteId": client.id,
            "nome": client.nome,
            "total_receitas": total_receitas,
            "receitas_por_mes": receitas_por_mes,
        };
    }).filter((client) => client.total_receitas > 0);
    
    return { resumeClientsPeriods, };

};
