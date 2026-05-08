import { GiDiamonds } from "react-icons/gi";
import { EmotionalGauge } from "./EmotionalGauge";

export const EmotionalStateCard = ({ hasCompanySelected, emotionalState, emotionalFactors }) => {
    
    const TrendIcon = emotionalState.trendIcon;
    
    return (
        <div className="rounded-3xl border border-soft bg-card p-6 shadow-sm xl:col-span-3">
          <h2 className="text-sm font-bold uppercase text-primary">
            Estado Emocional da Empresa
          </h2>

          <div className="mt-5 flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className={`text-2xl font-bold ${emotionalState.color}`}>
                {hasCompanySelected ? emotionalState.title : "Aguardando"}
              </h3>

              <p className="mt-4 text-xs leading-4 text-primary">
                {hasCompanySelected
                  ? emotionalState.description
                  : "Selecione uma empresa para analisar o estado emocional financeiro."}
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs text-secondary">
                <span>Tendência:</span>

                <div
                  className={`flex items-center gap-1 font-semibold ${emotionalState.color}`}
                >
                  <span>{hasCompanySelected ? emotionalState.trend : "--"}</span>
                  <TrendIcon className="text-base" />
                </div>
              </div>

              <div className="mt-6">
                <EmotionalGauge
                  value={hasCompanySelected ? emotionalState.gaugeValue : 0}
                  emoji={emotionalState.emoji}
                  color={emotionalState.color}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <img
                src={emotionalState.avatar}
                alt={emotionalState.title}
                className="w-[180px] object-contain"
              />
            </div>
          </div>

          <div className="mt-6 border-t border-soft pt-5">
            <h4 className="text-xs font-bold text-primary">
              Principais Fatores
            </h4>

            <div className="mt-4 space-y-3">
              {emotionalFactors.map((factor) => (
                <div key={factor} className="flex items-center gap-3">
                  <div className="flex size-5 items-center justify-center rounded-full bg-blue-100 text-secondary">
                    <GiDiamonds size={12} />
                  </div>

                  <p className="text-xs text-primary">{factor}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
    )
};