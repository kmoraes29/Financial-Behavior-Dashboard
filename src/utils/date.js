export function getPreviousPeriod(period) {
  const [year, month] = period.split("-").map(Number);
  const previousDate = new Date(year, month - 2, 1);

  const previousYear = previousDate.getFullYear();
  const previousMonth = String(previousDate.getMonth() + 1).padStart(2, "0");

  return `${previousYear}-${previousMonth}`;
};

export function getPreviousPeriodFive(period) {
  const [year, month] = period.split("-").map(Number);

  return Array.from({ length: 5 }, (_, index) => {
    const previousDate = new Date(year, month - 2 - index, 1);

    const previousYear = previousDate.getFullYear();
    const previousMonth = String(previousDate.getMonth() + 1).padStart(2, "0");

    return `${previousYear}-${previousMonth}`;
  });
};