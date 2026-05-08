import { IoArrowForward } from "react-icons/io5";
import {
  TbAlertSquareRounded,
  TbShieldCheck,
  TbTargetArrow,
} from "react-icons/tb";

const insights = [
  {
    icon: TbAlertSquareRounded,
    title: "Padrão de Gasto Reativo",
    description:
      "Seus custos aumentam sempre que a receita cai. Identificamos esse padrão 3 vezes nos últimos 6 meses.",
    action: "Ver análise completa",
    impact: "Alto impacto",
    iconClass: "text-danger",
    iconBg: "bg-danger-soft",
    cardBg: "bg-danger-soft",
    tagClass: "tag-danger",
  },
  {
    icon: TbShieldCheck,
    title: "Acúmulo de Assinaturas",
    description:
      "Ferramentas recorrentes cresceram 27% sem aumento proporcional de resultados.",
    action: "Recomendar revisão",
    impact: "Médio impacto",
    iconClass: "text-medium",
    iconBg: "bg-medium/10",
    cardBg: "bg-[#FFF8EA]",
    tagClass: "tag-medium",
  },
  {
    icon: TbTargetArrow,
    title: "Evitação de Decisões",
    description:
      "Nenhuma ação de corte ou renegociação foi tomada mesmo com queda na runway.",
    action: "Ver recomendações",
    impact: "Alto impacto",
    iconClass: "text-defensive",
    iconBg: "bg-defensive/10",
    cardBg: "bg-[#F8F3FF]",
    tagClass: "tag-defensive",
  },
];

const InsightsCard = () => {
  return (
    <div className="rounded-3xl border border-soft bg-card p-6 shadow-sm xl:col-span-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase text-primary">
          Insights Inteligentes
        </h2>

        <button className="text-xs font-semibold text-primary-purple hover:underline">
          Ver todos (3)
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
