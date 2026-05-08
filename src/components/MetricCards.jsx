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
        value: indicators ? formatCurrency(indicators.monthlyBalance.resultado_mes) : formatCurrency(0),
        icon: BsCashCoin,
        color: "#2ED47A",    bg: "#E8FFF2",
        detail: `${indicators?.balanceVariation != null ? indicators.balanceVariation.toFixed(2) : "-"}% vs mês passado`,
        detailClass: `${indicators?.balanceVariation != null ? (indicators.balanceVariation >= 0 ? "text-success" : "text-danger") : "-"}`,
      },
      {
        title: "Saída de Caixa",
        value: indicators ? formatCurrency(indicators.averageExpenseMonth) : formatCurrency(0),
        icon: IoFlameOutline,
        color: "#FF5A5F",
        bg: "#FFF0F1",
        detail: `${indicators?.cashOutVariation != null ? indicators.cashOutVariation.toFixed(2) : "-"}% vs mês passado`,
        detailClass: `${indicators?.cashOutVariation != null ? (indicators.cashOutVariation <= 0 ? "text-success" : "text-danger") : "-"}`,
      },
      {
        title: "Caixa Disponível",
        value: indicators ? formatCurrency(indicators.cashAvailable) : formatCurrency(0),
        icon: FaLandmark,
        color: "#4DA3FF",
        bg: "#EAF4FF",
      },
      {
        title: "Receita Média Mensal",
        value: indicators ? formatCurrency(indicators.averageRevenueMonth) : formatCurrency(0),
        icon: TbChartHistogram,
        color: "#6C63FF",
        bg: "#F0EEFF",
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
                    className="flex size-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: card.bg, color: card.color }}
                    >
                    <Icon size={22} />
                  </div>

                  <div className="flex-1">
                    <p className="text-[11px] font-semibold uppercase text-secondary">
                      {card.title}
                    </p>

                    <p className="mt-1 text-lg font-bold text-primary">
                      {card.value}
                    </p>

                    {card.detail && (
                        <p
                        className={`mt-1 text-xs font-medium ${card.detailClass}`}
                      >
                        {card.detail}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
                )
    }