import { BsCashCoin } from "react-icons/bs";
import { IoFlameOutline } from "react-icons/io5";
import { FaLandmark } from "react-icons/fa6";

import { useBalances } from "../context/BalancesContext";
import { getIndicatorsPeriod } from "../utils/financialIndicators";
import { useTransactions } from "../context/TransactionsContext";
import { usePeriods } from "../context/PeriodsContext";
import { useCompanies } from "../context/EmpresaContext";
import { TbChartHistogram } from "react-icons/tb";
import { formatCurrency } from "../utils/currency";

const getVariationLabel = (value) => {
  if (value == null || Number.isNaN(value)) {
    return "-";
  }

  if (value > 500) {
    return "Alta expressiva vs mês passado";
  }

  if (value < -500) {
    return "Queda acentuada vs mês passado";
  }

  return `${value.toFixed(1)}% vs mês passado`;
};

export const MetricCards = () => {
  const { transactions } = useTransactions();
  const { balances } = useBalances();
  const { periodSelected } = usePeriods();
  const { companySelected } = useCompanies();

  const indicators = getIndicatorsPeriod({
    transactions,
    balances,
    periodSelected,
    companySelectedId: companySelected?.id,
  });

  const metricCardsArray = [
    {
      title: "Saldo Mensal",
      value:
        indicators?.monthlyBalance?.resultado_mes != null
          ? formatCurrency(indicators.monthlyBalance.resultado_mes)
          : formatCurrency(0),
      icon: BsCashCoin,
      iconClass: "text-success",
      iconBg: "bg-success-soft",
      detail: getVariationLabel(indicators?.balanceVariation),
      detailClass:
        indicators?.balanceVariation != null
          ? indicators.balanceVariation >= 0
            ? "text-success"
            : "text-danger"
          : "text-secondary",
    },
    {
      title: "Saída de Caixa",
      value:
        indicators?.monthlyBalance?.total_despesas != null
          ? formatCurrency(indicators.monthlyBalance.total_despesas)
          : formatCurrency(0),
      icon: IoFlameOutline,
      iconClass: "text-danger",
      iconBg: "bg-danger-soft",
      detail: getVariationLabel(indicators?.cashOutVariation),
      detailClass:
        indicators?.cashOutVariation != null
          ? indicators.cashOutVariation <= 0
            ? "text-success"
            : "text-danger"
          : "text-secondary",
    },
    {
      title: "Caixa Disponível",
      value: indicators
        ? formatCurrency(indicators.cashAvailable)
        : formatCurrency(0),
      icon: FaLandmark,
      iconClass: "text-primary-blue",
      iconBg: "bg-hover",
    },
    {
      title: "Receita Média Mensal",
      value: indicators
        ? formatCurrency(indicators.averageRevenueMonth)
        : formatCurrency(0),
      icon: TbChartHistogram,
      iconClass: "text-primary-purple",
      iconBg: "bg-hover",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 xl:col-span-2">
      {metricCardsArray.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-soft bg-card p-4 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex size-12 items-center justify-center rounded-full ${card.iconBg}`}
              >
                <Icon size={22} className={card.iconClass} />
              </div>

              <div className="flex-1">
                <p className="text-[11px] font-semibold uppercase text-secondary">
                  {card.title}
                </p>

                <p className="mt-1 text-lg font-bold text-primary">
                  {card.value}
                </p>

                {card.detail && (
                  <p className={`mt-1 text-xs font-medium ${card.detailClass}`}>
                    {card.detail}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
