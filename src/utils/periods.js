export function getAvailablePeriodsFromTransactions(transactions) {
  const periods = transactions.map((transaction) => {
    const [year, month] = transaction.data_competencia.split("-");

    return {
      value: `${year}-${month}`,
      label: `${month}/${year}`
    };
  });

  const uniquePeriods = periods.filter((period, index, array) => {
    return array.findIndex((item) => item.value === period.value) === index;
  });

  return uniquePeriods.sort((a, b) => b.value.localeCompare(a.value));
}