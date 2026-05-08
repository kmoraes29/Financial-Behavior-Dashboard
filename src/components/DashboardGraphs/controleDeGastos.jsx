import { ResponsiveContainer, LineChart, Line } from "recharts";
import {
  FaMoneyBillWave,
  FaBullhorn,
  FaLaptopCode,
  FaBuilding,
  FaEllipsisH,
} from "react-icons/fa";
import { IoArrowForward, IoArrowUp, IoArrowDown } from "react-icons/io5";

import { useTransactions } from "../../context/TransactionsContext";
import { usePeriods } from "../../context/PeriodsContext";
import { useCompanies } from "../../context/EmpresaContext";
import { formatCurrency } from "../../utils/currency";
import { getExpensesAnalytics } from "../../utils/expensesAnalytics";

const Sparkline = ({ data, color }) => {
  return (
    <div className="h-7 w-20">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const categoryGroups = {
  folha_pagamento: ["folha_pagamento"],
  marketing: ["marketing"],
  softwares: ["sistemas"],
  operacional: ["aluguel", "energia", "agua", "gas", "manutencao"],
  outros: [
    "insumos",
    "embalagens",
    "freelancers",
    "impostos",
    "taxas_cartao_delivery",
  ],
};

const categoryConfig = {
  folha_pagamento: {
    title: "Folha de Pagamento",
    icon: FaMoneyBillWave,
    iconClass: "text-success",
    lineColor: "var(--danger)",
  },
  marketing: {
    title: "Marketing e Vendas",
    icon: FaBullhorn,
    iconClass: "text-medium",
    lineColor: "var(--medium)",
  },
  softwares: {
    title: "Assinaturas e Softwares",
    icon: FaLaptopCode,
    iconClass: "text-primary-purple",
    lineColor: "var(--warning)",
  },
  operacional: {
    title: "Operacional",
    icon: FaBuilding,
    iconClass: "text-primary-blue",
    lineColor: "var(--success)",
  },
  outros: {
    title: "Outros",
    icon: FaEllipsisH,
    iconClass: "text-secondary",
    lineColor: "var(--danger)",
  },
};

const getVariation = (current, previous) => {
  if (!previous || previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

const getBehaviorTag = (variation) => {
  if (variation > 20) {
    return {
      tag: "Impulsivo",
      tagClass: "tag-medium",
    };
  }

  if (variation > 8) {
    return {
      tag: "Reativo",
      tagClass: "tag-warning",
    };
  }

  if (variation < 0) {
    return {
      tag: "Estratégico",
      tagClass: "tag-success",
    };
  }

  return {
    tag: "Estratégico",
    tagClass: "tag-success",
  };
};

const ControleDeGastos = () => {
  const { transactions } = useTransactions();
  const { periods, periodSelected } = usePeriods();
  const { companySelected } = useCompanies();
  const companySelectedId = companySelected?.id;
  
  const currentPeriod =
    periodSelected ||
    periods?.[0]?.value ||
    transactions[0]?.data_competencia?.slice(0, 7);

  const expensesAnalytics = getExpensesAnalytics({
    transactions,
    periodSelected,
    companySelectedId,
  });

  const expensesByCategoriesMonth = expensesAnalytics?.expensesByCategoriesMonth || {};
  const expensesByCategoriesPreviousMonth =
    expensesAnalytics?.expensesByCategoriesPreviousMonth || {};
  const resumeByCategories = expensesAnalytics?.resumeByCategories || [];
  const totalExpenses = resumeByCategories.reduce((acc, category) => {
    return acc + Number(category.valor || 0);
  }, 0);

  const periodsForSparkline =
    periods?.length > 0
      ? periods.slice(0, 5).reverse()
      : [{ value: currentPeriod }];

  const categories = Object.entries(categoryConfig).map(([key, config]) => {
    const groupCategories = categoryGroups[key] || [key];

    const total = groupCategories.reduce((acc, category) => {
      return acc + Number(expensesByCategoriesMonth[category] || 0);
    }, 0);

    const previousTotal = groupCategories.reduce((acc, category) => {
      return acc + Number(expensesByCategoriesPreviousMonth[category] || 0);
    }, 0);

    const percentage =
      totalExpenses > 0 ? ((total / totalExpenses) * 100).toFixed(0) : 0;

    const variation = getVariation(total, previousTotal);

    const sparkline = periodsForSparkline.map((period) => {
      const monthTotal = transactions
        .filter((transaction) => {
          const sparklinePeriod = period.value || period;

          return (
            String(transaction.empresaId) === String(companySelectedId) &&
            transaction.tipo === "despesa" &&
            transaction.data_competencia?.startsWith(sparklinePeriod) &&
            groupCategories.includes(transaction.categoria)
          );
        })
        .reduce((acc, transaction) => acc + Number(transaction.valor || 0), 0);

      return { value: monthTotal };
    });

    const behavior = getBehaviorTag(variation);

    return {
      ...config,
      amount: formatCurrency(total),
      percentage: `${percentage}%`,
      variation: `${Math.abs(variation).toFixed(1)}%`,
      variationClass: variation >= 0 ? "text-danger" : "text-success",
      tag: behavior.tag,
      tagClass: behavior.tagClass,
      sparkline,
    };
  });

  return (
    <div className="rounded-3xl border border-soft bg-card p-6 shadow-sm xl:col-span-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase text-primary">
          Controle de Gastos
        </h2>

        <span className="text-xs text-secondary">ⓘ</span>
      </div>

      <div className="mt-6 hidden md:block">
        <div className="w-full">
          <div className="grid grid-cols-[2.2fr_1.2fr_0.8fr_1.5fr_1.3fr] gap-4 border-b border-soft pb-3 text-[11px] font-semibold text-secondary">
            <p>Categoria</p>
            <p>Gasto no Mês</p>
            <p>% do Total</p>
            <p>Variação</p>
            <p>Tag Comportamental</p>
          </div>

          <div className="mt-4 space-y-5">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <div
                  key={category.title}
                  className="grid grid-cols-[2.2fr_1.2fr_0.8fr_1.5fr_1.3fr] items-center gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-hover">
                      <Icon className={`text-xs ${category.iconClass}`} />
                    </div>

                    <p className="text-xs font-semibold text-primary">
                      {category.title}
                    </p>
                  </div>

                  <p className="text-xs text-primary">{category.amount}</p>

                  <p className="text-xs text-primary">{category.percentage}</p>

                  <div className="flex items-center gap-3">
                    <div
                      className={`flex items-center gap-1 text-xs font-semibold ${category.variationClass}`}
                    >
                      {category.variationClass === "text-danger" ? (
                        <IoArrowUp className="text-[12px]" />
                      ) : (
                        <IoArrowDown className="text-[12px]" />
                      )}

                      <span>{category.variation}</span>
                    </div>

                    <Sparkline
                      data={category.sparkline}
                      color={category.lineColor}
                    />
                  </div>

                  <div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${category.tagClass}`}
                    >
                      {category.tag}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button className="flex items-center gap-2 whitespace-nowrap rounded-full border border-soft px-5 py-2 text-xs font-medium text-primary-purple transition-all hover:bg-hover">
            Ver todas as categorias
            <IoArrowForward className="text-[16px]" />
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-4 md:hidden">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <div
              key={category.title}
              className="rounded-2xl border border-soft bg-card p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-hover">
                    <Icon className={`text-xs ${category.iconClass}`} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-primary">
                      {category.title}
                    </p>
                    <p className="mt-1 text-xs text-secondary">
                      {category.percentage} do total
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold ${category.tagClass}`}
                >
                  {category.tag}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-secondary">Gasto no mês</p>
                  <p className="text-sm font-bold text-primary">
                    {category.amount}
                  </p>
                </div>

                <div
                  className={`flex items-center gap-1 text-xs font-semibold ${category.variationClass}`}
                >
                  {category.variationClass === "text-danger" ? (
                    <IoArrowUp className="text-[12px]" />
                  ) : (
                    <IoArrowDown className="text-[12px]" />
                  )}

                  <span>{category.variation}</span>
                </div>
              </div>

              <div className="mt-3">
                <Sparkline
                  data={category.sparkline}
                  color={category.lineColor}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ControleDeGastos;
