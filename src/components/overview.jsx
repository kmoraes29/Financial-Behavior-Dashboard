import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GaugeComponent from "react-gauge-component";

import caminho from "../assets/imagens/caminho.png";
import caminhoAtencao from "../assets/imagens/caminho-atencao.png";
import caminhoCritico from "../assets/imagens/caminho-critico.png";

import avatarEstavel from "../assets/imagens/avatar-estavel.png";
import avatarAtencao from "../assets/imagens/avatar-atencao.png";
import avatarSobPressao from "../assets/imagens/avatar-sobpressao.png";
import avatarCritico from "../assets/imagens/avatar-critico.png";

import { BsSuitDiamondFill } from "react-icons/bs";
import { GiDiamonds } from "react-icons/gi";
import { IoFlameOutline, IoTrendingUp, IoTrendingDown } from "react-icons/io5";
import {
  FaLocationDot,
  FaFaceSmile,
  FaFaceMeh,
  FaFaceFrown,
  FaFaceTired,
} from "react-icons/fa6";
import { MdTrendingFlat } from "react-icons/md";

import { MetricCards } from "./MetricCards";

import { useTransactions } from "../context/TransactionsContext";
import { useBalances } from "../context/BalancesContext";
import { usePeriods } from "../context/PeriodsContext";
import { useCompanies } from "../context/EmpresaContext";
import { getIndicatorsPeriod } from "../utils/financialIndicators";

const COLORS = {
  success: "#2ED47A",
  warning: "#FFC857",
  danger: "#FF5A5F",
  medium: "#FF8A65",
};

const emotionalStates = {
  estavel: {
    title: "Estável",
    description: "Sua empresa está operando de forma equilibrada.",
    trend: "Melhorando",
    trendIcon: IoTrendingUp,
    color: "text-success",
    avatar: avatarEstavel,
    gaugeValue: 88,
    emoji: FaFaceSmile,
  },
  atencao: {
    title: "Em Atenção",
    description: "Alguns indicadores começaram a oscilar.",
    trend: "Monitorando",
    trendIcon: MdTrendingFlat,
    color: "text-warning",
    avatar: avatarAtencao,
    gaugeValue: 68,
    emoji: FaFaceMeh,
  },
  sobpressao: {
    title: "Sob Pressão",
    description: "Sua empresa está reagindo mais do que planejando.",
    trend: "Piorando",
    trendIcon: IoTrendingDown,
    color: "text-medium",
    avatar: avatarSobPressao,
    gaugeValue: 42,
    emoji: FaFaceFrown,
  },
  critico: {
    title: "Crítico",
    description: "A estabilidade financeira está em risco.",
    trend: "Crítico",
    trendIcon: IoTrendingDown,
    color: "text-danger",
    avatar: avatarCritico,
    gaugeValue: 12,
    emoji: FaFaceTired,
  },
};

const getMarkerPosition = (days) => {
  const safeDays = Math.max(0, Math.min(days, 90));
  const position = 100 - (safeDays / 90) * 100;

  return `${position}%`;
};

const getRunwayStatus = (days) => {
  if (days >= 90) {
    return {
      key: "estavel",
      label: "Zona Segura",
      color: "text-success",
      bg: "bg-success-soft",
      image: caminho,
      markerPosition: getMarkerPosition(days),
    };
  }

  if (days >= 60) {
    return {
      key: "estavel",
      label: "Zona Estável",
      color: "text-success",
      bg: "bg-success-soft",
      image: caminho,
      markerPosition: getMarkerPosition(days),
    };
  }

  if (days >= 30) {
    return {
      key: "sobpressao",
      label: "Zona de Atenção",
      color: "text-warning",
      bg: "bg-warning-soft",
      image: caminhoAtencao,
      markerPosition: getMarkerPosition(days),
    };
  }

  return {
    key: "critico",
    label: "Zona Crítica",
    color: "text-danger",
    bg: "bg-danger-soft",
    image: caminhoCritico,
    markerPosition: getMarkerPosition(days),
  };
};

const getEmotionalFactors = ({ diasAtuais, indicators }) => {
  if (!indicators) {
    return [
      "Selecione uma empresa para gerar fatores automáticos",
      "Aguardando dados do período selecionado",
      "Análise será atualizada em tempo real",
    ];
  }

  const factors = [];

  if (diasAtuais < 30) {
    factors.push("Runway abaixo de 30 dias");
  } else if (diasAtuais < 60) {
    factors.push("Runway em zona de atenção");
  } else {
    factors.push("Runway dentro da faixa operacional");
  }

  if (indicators.cashOutVariation > 0) {
    factors.push("Despesas cresceram em relação ao mês anterior");
  } else {
    factors.push("Despesas controladas no período");
  }

  if (indicators.cashInVariation < 0) {
    factors.push("Receitas caíram em relação ao mês anterior");
  } else {
    factors.push("Receitas estáveis ou em crescimento");
  }

  if (indicators.monthlyBalance?.resultado_mes < 0) {
    factors.push("Saldo mensal negativo");
  }

  if (indicators.balanceVariation < 0) {
    factors.push("Resultado mensal pior que o mês anterior");
  }

  return factors.slice(0, 3);
};

const EmotionalGauge = ({ value, emoji: EmojiIcon, color }) => {
  return (
    <div className="relative mt-4 w-[190px]">
      <GaugeComponent
        type="semicircle"
        value={value}
        minValue={0}
        maxValue={100}
        arc={{
          width: 0.18,
          padding: 0.02,
          cornerRadius: 4,
          subArcs: [
            { limit: 25, color: COLORS.danger },
            { limit: 50, color: COLORS.medium },
            { limit: 75, color: COLORS.warning },
            { limit: 100, color: COLORS.success },
          ],
        }}
        pointer={{
          type: "arrow",
          color: "#1A1D29",
          baseColor: "#1A1D29",
          length: 0.58,
          width: 8,
        }}
        labels={{
          valueLabel: { hide: true },
          tickLabels: { hideMinMax: true },
        }}
      />

      <div className="absolute left-1/2 top-[60px] flex -translate-x-1/2 items-center justify-center rounded-full bg-[#FFF4D6] shadow-sm">
        <EmojiIcon className={`text-[24px] ${color}`} />
      </div>
    </div>
  );
};

const Overview = () => {
  const { transactions, loadingTransaction } = useTransactions();
  const { balances } = useBalances();
  const { periodSelected } = usePeriods();
  const { companySelected } = useCompanies();

  const [diasAnimados, setDiasAnimados] = useState(0);

  const indicators = getIndicatorsPeriod({
    transactions,
    balances,
    periodSelected,
    companySelectedId: companySelected?.id,
  });

  const monthlyExpenses = indicators?.monthlyBalance?.total_despesas || 0;
  const cashAvailable = indicators?.cashAvailable || 0;

  const diasAtuais =
    monthlyExpenses > 0
      ? Math.max(0, Math.floor(cashAvailable / (monthlyExpenses / 30)))
      : 0;

  const runwayStatus = getRunwayStatus(diasAtuais);
  const emotionalState = emotionalStates[runwayStatus.key];
  const TrendIcon = emotionalState.trendIcon;

  const emotionalFactors = getEmotionalFactors({
    diasAtuais,
    indicators,
  });

  const dataAtual = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    setDiasAnimados(0);

    if (!companySelected?.id || diasAtuais <= 0) {
      return;
    }

    let start = 0;
    const end = diasAtuais;
    const duration = 1600;
    const incrementTime = Math.max(20, duration / end);

    const counter = setInterval(() => {
      start += 1;
      setDiasAnimados(start);

      if (start >= end) {
        clearInterval(counter);
      }
    }, incrementTime);

    return () => clearInterval(counter);
  }, [diasAtuais, companySelected?.id]);

  return (
    <section className="p-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="relative flex min-h-[430px] flex-col overflow-hidden rounded-3xl border border-soft bg-card p-6 shadow-sm xl:col-span-7">
          <div className="relative z-10">
            <h2 className="text-sm font-bold uppercase text-primary">
              Horizonte de Caixa
            </h2>

            <p className="mt-1 text-xs text-secondary">
              Atualizado em {dataAtual}
            </p>

            <div className="mt-8 flex items-end gap-3">
              <span
                className={`text-7xl font-bold leading-none ${runwayStatus.color}`}
              >
                {companySelected?.id ? diasAnimados : "--"}
              </span>

              <div className="mb-2">
                <p className={`text-lg font-semibold ${runwayStatus.color}`}>
                  dias
                </p>

                <p className="text-sm leading-5 text-primary">
                  de estabilidade <br /> operacional
                </p>
              </div>
            </div>

            <div
              className={`mt-5 inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold ${runwayStatus.bg} ${runwayStatus.color}`}
            >
              <BsSuitDiamondFill />
              {companySelected?.id
                ? runwayStatus.label
                : "Selecione uma empresa"}
            </div>
          </div>

          <img
            src={runwayStatus.image}
            alt="Caminho representando horizonte de caixa"
            className="
              relative
              z-0
              h-[70%]
              w-full
              object-contain
              opacity-90

              md:absolute
              md:right-8
              md:top-[-20px]
              md:mt-14
              md:h-auto
              md:w-[75%]

              lg:right-12
              lg:top-[-50px]
              lg:w-[68%]

              xl:right-16
              xl:top-[-80px]
              xl:w-[75%]
            "
          />

          <div className="absolute right-8 top-10 z-10 rounded-2xl border border-soft bg-white/85 p-4 shadow-sm backdrop-blur">
            <p className="text-xs font-semibold text-primary">Objetivo:</p>
            <p className="mt-2 text-lg font-bold text-success">90+ dias</p>
            <p className="text-xs text-success">Zona Segura</p>
          </div>

          <div className="relative z-10 mt-auto pt-8">
            <div className="relative h-4 rounded-full bg-gradient-to-r from-[#2ED47A] via-[#FFC857] to-[#FF5A5F]">
              <motion.div
                initial={{ left: "8%" }}
                animate={{
                  left: companySelected?.id
                    ? runwayStatus.markerPosition
                    : "8%",
                }}
                transition={{
                  duration: 2,
                  ease: "easeOut",
                }}
                className="group absolute top-1/2 -translate-x-1/2 -translate-y-full"
              >
                <div
                  className={`
    pointer-events-none
    absolute
    bottom-[52px]
    z-20
    w-[150px]
    rounded-xl
    border
    border-soft
    bg-white
    p-4
    shadow-md
    opacity-0
    transition-all
    duration-200
    group-hover:-translate-y-1
    group-hover:opacity-100

    ${
      diasAtuais >= 75
        ? "left-0"
        : diasAtuais <= 20
          ? "right-0"
          : "left-1/2 -translate-x-1/2"
    }
  `}
                >
                  {" "}
                  <p className="text-sm font-semibold text-primary">Hoje</p>
                  <p className="mb-[-6px] mt-1 text-lg font-bold text-primary">
                    {companySelected?.id ? `${diasAtuais} dias` : "--"}
                  </p>
                  <p className="text-xs text-secondary">restantes</p>
                  <p className="mt-1 text-xs">
                    Zona:
                    <span className={`font-semibold ${runwayStatus.color}`}>
                      {" "}
                      {companySelected?.id ? runwayStatus.label : "--"}
                    </span>
                  </p>
                </div>

                <FaLocationDot className="text-[42px] text-[#6C63FF] drop-shadow-[0_4px_10px_rgba(108,99,255,0.35)]" />
              </motion.div>
            </div>

            <div className="mt-3 flex justify-between text-xs text-secondary">
              <span>90+ dias</span>
              <span>60 dias</span>
              <span>30 dias</span>
              <span>0 dias</span>
            </div>
          </div>
        </div>

        <MetricCards loading={loadingTransaction} />

        <div className="rounded-3xl border border-soft bg-card p-6 shadow-sm xl:col-span-3">
          <h2 className="text-sm font-bold uppercase text-primary">
            Estado Emocional da Empresa
          </h2>

          <div className="mt-5 flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className={`text-2xl font-bold ${emotionalState.color}`}>
                {companySelected?.id ? emotionalState.title : "Aguardando"}
              </h3>

              <p className="mt-4 text-xs leading-4 text-primary">
                {companySelected?.id
                  ? emotionalState.description
                  : "Selecione uma empresa para analisar o estado emocional financeiro."}
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs text-secondary">
                <span>Tendência:</span>

                <div
                  className={`flex items-center gap-1 font-semibold ${emotionalState.color}`}
                >
                  <span>
                    {companySelected?.id ? emotionalState.trend : "--"}
                  </span>
                  <TrendIcon className="text-base" />
                </div>
              </div>

              <div className="mt-6">
                <EmotionalGauge
                  value={companySelected?.id ? emotionalState.gaugeValue : 0}
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
      </div>
    </section>
  );
};

export default Overview;
