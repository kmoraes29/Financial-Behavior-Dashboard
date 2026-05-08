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


    const totalExpensesMonth = Object.values(expensesByCategoriesMonth).reduce((acc,value)=>{
        return acc + value;
    },0);

    const expensesByCategoriesPreviousMonthObject = Object.entries(expensesByCategoriesPreviousMonth).map((expense) =>{
        return {
            "categoria": expense[0],
            "valor": expense[1],
        }
    });

    const resumeByCategoria = Object.entries(expensesByCategoriesMonth).map((expense)=>{
        
        const expensePreviousMonth = expensesByCategoriesPreviousMonthObject.find((valor) => valor.categoria === expense[0]);

        return {
            "categoria": expense[0],
            "valor": expense[1],
            "percentual": expense[1] / totalExpensesMonth * 100,
            "variacao": (expensePreviousMonth && expensePreviousMonth.valor > 0) ? ((expense[1] - expensePreviousMonth.valor) / expensePreviousMonth.valor * 100): 100,
        };
    });
    
    return { categories, expensesByCategoriesMonth, expensesByCategoriesPreviousMonth, resumeByCategoria };

};