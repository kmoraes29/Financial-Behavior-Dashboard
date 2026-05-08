import { getPreviousPeriod } from './date';

export function getExpensesAnalytics({
    transactions,
    periodSelected,
    companySelectedId,
}) {
    if(!companySelectedId || !periodSelected) {
        return null;
    };

    const transactionsYearMonth = transactions.map((transaction) => {
    const [year, month] = transaction.data_competencia.split("-");
    return { ...transaction, ano_mes: `${year}-${month}` };
    });

    const categories = transactions.reduce((acc, value)=>{

        if(String(value.empresaId) === String(companySelectedId)) {
            return [...acc,value.categoria]
        }
        return acc;
    },[]);

    const previousPeriod = getPreviousPeriod(periodSelected);

    const expensesCurrentMonth = transactionsYearMonth.filter(
    (transaction) =>
      transaction.ano_mes === periodSelected &&
      String(transaction.empresaId) === String(companySelectedId) &&
      transaction.tipo === "despesa"
    );

    const expensesPreviousMonth = transactionsYearMonth.filter(
    (transaction) =>
      transaction.ano_mes === previousPeriod &&
      String(transaction.empresaId) === String(companySelectedId) &&
      transaction.tipo === "despesa"
  );

    const expensesByCategoriesMonth = expensesCurrentMonth.reduce((acc, value)=>{

        return {...acc, [value.categoria]: (acc[value.categoria] || 0) + value.valor,};
    }
    ,{});

    const expensesByCategoriesPreviousMonth = expensesPreviousMonth.reduce((acc, value)=>{

        return {...acc, [value.categoria]: (acc[value.categoria] || 0) + value.valor,};
    }
    ,{});

    
    return { categories, expensesByCategoriesMonth, expensesByCategoriesPreviousMonth, };

};