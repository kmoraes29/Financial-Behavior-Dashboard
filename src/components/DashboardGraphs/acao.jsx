import { useState } from "react";
import { motion } from "framer-motion";
import { FaLocationDot } from "react-icons/fa6";
import {
  IoPersonRemoveOutline,
  IoTrendingDown,
  IoArrowUp,
  IoWarningOutline,
} from "react-icons/io5";
import { TfiArrowRight } from "react-icons/tfi";
import { MdKeyboardArrowDown } from "react-icons/md";

import { useTransactions } from "../../context/TransactionsContext";
import { useBalances } from "../../context/BalancesContext";
import { usePeriods } from "../../context/PeriodsContext";
import { useCompanies } from "../../context/EmpresaContext";
import { getIndicatorsPeriod } from "../../utils/financialIndicators";

import caminho from "../../assets/imagens/caminho.png";
import caminhoCritico from "../../assets/imagens/caminho-critico.png";
import caminhoAtencao from "../../assets/imagens/caminho-atencao.png";

const scenarios = [
  {
    id: "lose_client",
    label: "Perder maior cliente",
    icon: IoPersonRemoveOutline,
  },
  {
    id: "moderate_drop",
    label: "Queda de 20% no delivery",
    icon: IoTrendingDown,
  },
  {
    id: "close_store",
    label: "Fechar 01 loja",
    icon: IoPersonRemoveOutline,
  },
  {
    id: "cost_increase",
    label: "Aumentar custos em 15%",
    icon: IoArrowUp,
  },
  {
    id: "bankruptcy_risk",
    label: "Colapso operacional",
    icon: IoWarningOutline,
  },
];

const getMarkerPosition = (days) => {
  const safeDays = Math.max(0, Math.min(days, 90));
  const position = (safeDays / 90) * 100;

  return `${position}%`;
};

const getScenarioImage = (days) => {
  if (days < 30) return caminhoCritico;
  if (days < 60) return caminhoAtencao;
  return caminho;
};

const getScenarioStatus = (days) => {
  if (days >= 90) {
    return {
      status: "Zona Segura",
      statusClass: "text-success",
    };
  }

  if (days >= 60) {
    return {
      status: "Zona Estável",
      statusClass: "text-success",
    };
  }

  if (days >= 30) {
    return {
      status: "Zona de Atenção",
      statusClass: "text-warning",
    };
  }

  return {
    status: "Zona Crítica",
    statusClass: "text-danger",
  };
};

const ScenarioCard = ({
  label,
  subtitle,
  days,
  status,
  statusClass,
  image,
  markerPosition,
  impact,
  disabled = false,
}) => {
  return (
    <div className="flex-1">
      <div className="mb-3 text-center">
        <h3 className="text-sm font-bold uppercase text-primary-purple">
          {label}
        </h3>
        <p className="text-xs text-secondary">{subtitle}</p>
      </div>

      <motion.div
        layout
        transition={{ duration: 0.35 }}
        className={`relative min-h-70 overflow-hidden rounded-3xl border border-soft bg-card px-6 pb-6 pt-8 shadow-sm transition-all ${
          disabled ? "opacity-40 grayscale" : ""
        }`}
      >
        <div className="relative z-10">
          <h4 className="text-xs font-bold uppercase text-primary">
            Horizonte de Caixa
          </h4>

          <div className="mt-5 flex items-end gap-2">
            <span className={`text-6xl font-bold leading-none ${statusClass}`}>
              {disabled ? "--" : days}
            </span>

            <div className="mb-2">
              <p className={`text-sm font-semibold ${statusClass}`}>dias</p>
              <p className="text-xs leading-4 text-primary">
                de estabilidade <br /> operacional
              </p>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute left-[56%] top-8 hidden h-[165px] w-[250px] -translate-x-1/2 overflow-hidden rounded-3xl bg-card xl:block">
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover opacity-90 mix-blend-multiply"
          />
        </div>

        {impact && !disabled && (
          <div className="absolute right-4 top-8 rounded-2xl bg-danger-soft p-3 text-center">
            <p className="text-xs font-semibold text-primary">Impacto:</p>
            <p className="mt-1 text-base font-bold text-danger">{impact}</p>
            <p className="text-[11px] text-secondary">na sua runway</p>
          </div>
        )}

        {disabled && (
          <div className="absolute right-4 top-8 rounded-2xl bg-hover p-3 text-center">
            <p className="text-xs font-semibold text-secondary">Aguardando</p>
            <p className="mt-1 text-xs text-secondary">simulação</p>
          </div>
        )}

        <div className="absolute bottom-3 left-6 right-6">
          <div className="relative h-3 rounded-full bg-gradient-to-r from-[#FF5A5F] via-[#FFC857] to-[#2ED47A]">
            <motion.div
              initial={{ left: "0%" }}
              animate={{ left: disabled ? "0%" : markerPosition }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="group absolute top-1/2 -translate-x-1/2 -translate-y-full"
            >
              <div className="pointer-events-none absolute bottom-[44px] left-1/2 z-20 w-[130px] -translate-x-1/2 rounded-xl border border-soft bg-card p-3 text-center shadow-md opacity-0 transition-all duration-200 group-hover:-translate-y-1 group-hover:opacity-100">
                <p className="text-[11px] font-semibold text-secondary">
                  Status atual
                </p>

                <p className={`mt-1 text-xs font-bold ${statusClass}`}>
                  {disabled ? "Sem simulação" : status}
                </p>
              </div>

              <FaLocationDot
                className={`text-[36px] drop-shadow-[0_4px_10px_rgba(108,99,255,0.35)] ${
                  disabled ? "text-disabled" : "text-primary-purple"
                }`}
              />
            </motion.div>
          </div>

          <div className="mt-3 flex justify-between text-[11px] text-secondary">
            <span>0 dias</span>
            <span>30 dias</span>
            <span>60 dias</span>
            <span>90+ dias</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Acao = () => {
  const [selectedScenario, setSelectedScenario] = useState("");

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

  const monthlyExpenses = indicators?.monthlyBalance?.total_despesas || 0;
  const cashAvailable = indicators?.cashAvailable || 0;

  const beforeDays =
    monthlyExpenses > 0
      ? Math.max(0, Math.floor(cashAvailable / (monthlyExpenses / 30)))
      : 0;

  const impactByScenario = {
    lose_client: 52,
    moderate_drop: 62,
    close_store: 80,
    cost_increase: 26,
    bankruptcy_risk: 116,
  };

  const selectedImpact = impactByScenario[selectedScenario] || 0;

  const afterDays = selectedScenario
    ? Math.max(0, beforeDays - selectedImpact)
    : beforeDays;

  const beforeStatus = getScenarioStatus(beforeDays);
  const afterStatus = getScenarioStatus(afterDays);

  const isSimulationDisabled = !selectedScenario;

  return (
    <section className="px-6 pb-8">
      <div className="rounded-3xl border border-soft bg-card/70 p-6 shadow-sm">
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[1fr_420px_1fr]">
          <ScenarioCard
            label="Antes"
            subtitle="Situação atual"
            days={beforeDays}
            status={beforeStatus.status}
            statusClass={beforeStatus.statusClass}
            image={getScenarioImage(beforeDays)}
            markerPosition={getMarkerPosition(beforeDays)}
          />

          <div className="flex h-full min-w-[360px] flex-col">
            <div className="mb-2 text-center">
              <h3 className="text-sm font-bold uppercase text-primary-purple">
                Ação
              </h3>

              <p className="text-xs text-secondary">
                Simule uma decisão de impacto
              </p>
            </div>

            <div className="flex flex-1 items-center justify-center gap-10">
              <TfiArrowRight className="hidden text-4xl text-primary-purple xl:block" />

              <div className="w-full max-w-[240px]">
                <div className="relative">
                  <select
                    value={selectedScenario}
                    onChange={(event) =>
                      setSelectedScenario(event.target.value)
                    }
                    className="h-[56px] w-full appearance-none rounded-2xl border-1 border-primary-purple bg-hover px-4 pr-10 text-sm text-primary-purple shadow-sm outline-none transition-all focus:ring-2 focus:ring-[#6C63FF]/30"
                  >
                    <option value="">Escolha uma ação</option>

                    {scenarios.map((scenario) => (
                      <option key={scenario.id} value={scenario.id}>
                        {scenario.label}
                      </option>
                    ))}
                  </select>

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-primary-purple">
                    <MdKeyboardArrowDown className="text-xl" />
                  </span>
                </div>
              </div>

              <TfiArrowRight className="hidden text-4xl text-primary-purple xl:block" />
            </div>
          </div>

          <ScenarioCard
            label="Depois"
            subtitle={
              selectedScenario ? "Impacto da decisão" : "Selecione uma ação"
            }
            days={afterDays}
            status={afterStatus.status}
            statusClass={afterStatus.statusClass}
            image={getScenarioImage(afterDays)}
            markerPosition={getMarkerPosition(afterDays)}
            impact={selectedScenario ? `-${selectedImpact} dias` : null}
            disabled={isSimulationDisabled}
          />
        </div>
      </div>
    </section>
  );
};

export default Acao;
