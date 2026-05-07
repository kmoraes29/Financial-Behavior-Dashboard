
import { getPreviousPeriod } from './date'

export function getIndicatorsPeriod({
  transactions,
  balances,
  periodSelected,
  companySelectedId,
}) {
  if (!companySelectedId || !periodSelected) {
    return null;
  }

  const monthlyBalance = balances.find(
    (balance) =>
      balance.ano_mes === periodSelected &&
      String(balance.empresaId) === String(companySelectedId)
  );

  const previousPeriod = getPreviousPeriod(periodSelected);

  const previousBalance = balances.find(
    (balance) =>
      balance.ano_mes === previousPeriod &&
      String(balance.empresaId) === String(companySelectedId)
  );

  if (!monthlyBalance || !previousBalance) {
    return null;
  }

  const transactionsYearMonth = transactions.map((transaction) => {
    const [year, month] = transaction.data_competencia.split("-");
    return { ...transaction, ano_mes: `${year}-${month}` };
  });

  const transactionsCurrentMonth = transactionsYearMonth.filter(
    (transaction) =>
      transaction.ano_mes === periodSelected &&
      String(transaction.empresaId) === String(companySelectedId)
  );

  const revenueTransactions = transactionsCurrentMonth.filter(
    (transaction) => transaction.tipo === "receita"
  );

  const expenseTransactions = transactionsCurrentMonth.filter(
    (transaction) => transaction.tipo === "despesa"
  );

  const averageRevenueMonth =
    revenueTransactions.length > 0
      ? monthlyBalance.total_receitas / revenueTransactions.length
      : 0;

  const averageExpenseMonth =
    expenseTransactions.length > 0
      ? monthlyBalance.total_despesas / expenseTransactions.length
      : 0;

  const cashOutVariation =
    previousBalance.total_despesas > 0
      ? ((monthlyBalance.total_despesas - previousBalance.total_despesas) /
          previousBalance.total_despesas) *
        100
      : null;

  const cashInVariation =
    previousBalance.total_receitas > 0
      ? ((monthlyBalance.total_receitas - previousBalance.total_receitas) /
          previousBalance.total_receitas) *
        100
      : null;

  const cashAvailable = monthlyBalance.saldo_final;

  return {
    monthlyBalance,
    previousBalance,
    cashOutVariation,
    cashInVariation,
    averageRevenueMonth,
    averageExpenseMonth,
    cashAvailable,
  };
}