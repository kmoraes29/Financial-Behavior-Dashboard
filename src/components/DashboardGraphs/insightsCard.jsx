import { IoArrowForward } from "react-icons/io5";
import {
  TbAlertSquareRounded,
  TbShieldCheck,
  TbTargetArrow,
} from "react-icons/tb";

import { useTransactions } from "../../context/TransactionsContext";
import { useBalances } from "../../context/BalancesContext";
import { usePeriods } from "../../context/PeriodsContext";
import { useCompanies } from "../../context/EmpresaContext";

import { getIndicatorsPeriod } from "../../utils/financialIndicators";
import { getExpensesAnalytics } from "../../utils/expensesAnalytics";

const baseInsightStyle = {
  high: {
    impact: "Alto impacto",
    iconClass: "text-danger",
    iconBg: "bg-danger-soft",
    cardBg: "bg-danger-soft",
    tagClass: "tag-danger",
  },
  medium: {
    impact: "Médio impacto",
    iconClass: "text-medium",
    iconBg: "bg-warning-soft",
    cardBg: "bg-warning-soft",
    tagClass: "tag-medium",
  },
  strategic: {
    impact: "Monitoramento",
    iconClass: "text-defensive",
    iconBg: "bg-defensive/10",
    cardBg: "bg-defensive-soft",
    tagClass: "tag-defensive",
  },
};

const getTopExpenseCategory = (expensesAnalytics) => {
  const categories = expensesAnalytics?.resumeByCategories || [];

  if (!categories.length) return null;

  return categories.reduce((highest, current) =>
    current.valor > highest.valor ? current : highest,
  );
};

const getHighestGrowthCategory = (expensesAnalytics) => {
  const categories = expensesAnalytics?.resumeByCategories || [];

  if (!categories.length) return null;

  return categories.reduce((highest, current) =>
    current.variacao > highest.variacao ? current : highest,
  );
};

const formatCategoryName = (category) => {
  if (!category) return "";

  const names = {
    folha_pagamento: "Folha de Pagamento",
    marketing: "Marketing e Vendas",
    sistemas: "Assinaturas e Softwares",
    aluguel: "Aluguel",
    energia: "Energia",
    agua: "Água",
    gas: "Gás",
    manutencao: "Manutenção",
    insumos: "Insumos",
    embalagens: "Embalagens",
    freelancers: "Freelancers",
    impostos: "Impostos",
    taxas_cartao_delivery: "Taxas e Delivery",
  };

  return names[category] || category;
};

const generateInsights = ({ indicators, expensesAnalytics }) => {
  if (!indicators) {
    return [
      {
        icon: TbAlertSquareRounded,
        title: "Aguardando Análise",
        description:
          "Selecione uma empresa para gerar insights automáticos com base nos dados financeiros.",
        action: "Selecionar empresa",
        ...baseInsightStyle.strategic,
      },
      {
        icon: TbShieldCheck,
        title: "Dados em Preparação",
        description:
          "A análise será atualizada assim que houver empresa e período selecionados.",
        action: "Ver dados",
        ...baseInsightStyle.medium,
      },
      {
        icon: TbTargetArrow,
        title: "Monitoramento Inteligente",
        description:
          "O sistema identifica padrões de receita, despesa e comportamento de consumo.",
        action: "Entender análise",
        ...baseInsightStyle.strategic,
      },
    ];
  }

  const insights = [];

  const topCategory = getTopExpenseCategory(expensesAnalytics);
  const growthCategory = getHighestGrowthCategory(expensesAnalytics);

  if (indicators.cashOutVariation > 0 && indicators.cashInVariation < 0) {
    insights.push({
      icon: TbAlertSquareRounded,
      title: "Padrão de Gasto Reativo",
      description:
        "As despesas cresceram enquanto as receitas caíram no período. Esse comportamento pode reduzir rapidamente o horizonte de caixa.",
      action: "Ver análise completa",
      ...baseInsightStyle.high,
    });
  }

  if (growthCategory && growthCategory.variacao > 20) {
    insights.push({
      icon: TbShieldCheck,
      title: "Categoria em Aceleração",
      description: `${formatCategoryName(
        growthCategory.categoria,
      )} cresceu ${growthCategory.variacao.toFixed(
        1,
      )}% em relação ao mês anterior.`,
      action: "Recomendar revisão",
      ...baseInsightStyle.medium,
    });
  }

  if (topCategory && topCategory.percentual > 35) {
    insights.push({
      icon: TbTargetArrow,
      title: "Concentração de Gastos",
      description: `${formatCategoryName(
        topCategory.categoria,
      )} representa ${topCategory.percentual.toFixed(
        0,
      )}% das despesas do mês. Vale revisar dependência dessa categoria.`,
      action: "Ver recomendações",
      ...baseInsightStyle.high,
    });
  }

  if (indicators.monthlyBalance?.resultado_mes < 0) {
    insights.push({
      icon: TbAlertSquareRounded,
      title: "Saldo Mensal Negativo",
      description:
        "A empresa fechou o período gastando mais do que recebeu. Isso exige ação rápida para proteger o caixa.",
      action: "Ver plano de ação",
      ...baseInsightStyle.high,
    });
  }

  if (insights.length < 3 && indicators.cashOutVariation <= 0) {
    insights.push({
      icon: TbShieldCheck,
      title: "Despesas Controladas",
      description:
        "A saída de caixa está estável ou menor que no mês anterior, indicando melhor controle operacional.",
      action: "Ver histórico",
      ...baseInsightStyle.strategic,
    });
  }

  if (insights.length < 3 && indicators.cashInVariation >= 0) {
    insights.push({
      icon: TbTargetArrow,
      title: "Receita em Evolução",
      description:
        "As receitas estão estáveis ou em crescimento, fortalecendo a previsibilidade financeira.",
      action: "Ver receitas",
      ...baseInsightStyle.strategic,
    });
  }

  if (insights.length < 3) {
    insights.push({
      icon: TbAlertSquareRounded,
      title: "Monitoramento Preventivo",
      description:
        "Nenhum alerta crítico adicional foi identificado, mas o acompanhamento contínuo reduz decisões tardias.",
      action: "Continuar monitorando",
      ...baseInsightStyle.medium,
    });
  }

  return insights.slice(0, 3);
};

const InsightsCard = () => {
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

  const expensesAnalytics = getExpensesAnalytics({
    transactions,
    periodSelected,
    companySelectedId: companySelected?.id,
  });

  const insights = generateInsights({
    indicators,
    expensesAnalytics,
  });

  return (
    <div className="rounded-3xl border border-soft bg-card p-6 shadow-sm xl:col-span-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase text-primary">
          Insights Inteligentes
        </h2>

        <button className="text-xs font-semibold text-primary-purple hover:underline">
          Ver todos ({insights.length})
        </button>
      </div>

      <div className="mt-5 space-y-4">
        {insights.map((insight) => {
          const Icon = insight.icon;

          return (
            <div
              key={insight.title}
              className={`rounded-2xl border border-soft p-3 ${insight.cardBg}`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex size-5 shrink-0 items-center justify-center rounded-full ${insight.iconBg}`}
                >
                  <Icon className={`text-xl ${insight.iconClass}`} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xs font-bold text-primary">
                      {insight.title}
                    </h3>

                    <span
                      className={`whitespace-nowrap rounded-full px-3 py-1 text-[10px] font-semibold ${insight.tagClass}`}
                    >
                      {insight.impact}
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-primary">
                    {insight.description}
                  </p>

                  <button className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary-purple">
                    {insight.action}
                    <IoArrowForward className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InsightsCard;
