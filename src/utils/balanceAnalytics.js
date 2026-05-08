import { getPreviousPeriodFive } from './date';

export function getBalanceAnalytics({
    balances,
    periodSelected,
    companySelectedId,
}) {
    if(!companySelectedId || !periodSelected) {
        return null;
    };

    const periods = [periodSelected,...getPreviousPeriodFive(periodSelected)];

    const resumeBalancesPeriods = periods.map((period)=>{
        const balance = balances.find((balance) =>
            balance.ano_mes === period &&
            String(balance.empresaId) === String(companySelectedId)
    );
        
        if (!balance){return null;};

        return {
            "mes": balance.ano_mes,
            "receitas": balance.total_receitas,
            "despesas": balance.total_despesas,
            "resultado_mes": balance.resultado_mes,
            "saldo_final": balance.saldo_final,
            "saldo_inicial": balance.saldo_inicial,
        }
    }).filter(Boolean).reverse();
    
    return { resumeBalancesPeriods, };

};