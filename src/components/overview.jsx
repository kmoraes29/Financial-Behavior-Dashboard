import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GaugeComponent from "react-gauge-component";

import caminho from "../assets/imagens/caminho.png";
import avatarEstavel from "../assets/imagens/avatar-estavel.png";
import avatarAtencao from "../assets/imagens/avatar-atencao.png";
import avatarSobPressao from "../assets/imagens/avatar-sobpressao.png";
import avatarCritico from "../assets/imagens/avatar-critico.png";

import { BsCashCoin, BsSuitDiamondFill } from "react-icons/bs";
import { IoFlameOutline, IoTrendingUp, IoTrendingDown } from "react-icons/io5";
import {
  FaLocationDot,
  FaLandmark,
  FaFaceSmile,
  FaFaceMeh,
  FaFaceFrown,
  FaFaceTired,
} from "react-icons/fa6";
import { TbChartHistogram } from "react-icons/tb";

import { MdTrendingFlat } from "react-icons/md";

const metricCards = [
  {
    title: "Saldo Mensal",
    value: "R$ 72.550",
    icon: BsCashCoin,
    color: "#2ED47A",
    bg: "#E8FFF2",
    detail: "↑ 3,1% vs mês passado",
    detailClass: "text-success",
  },
  {
    title: "Saída de Caixa",
    value: "R$ 184.250",
    icon: IoFlameOutline,
    color: "#FF5A5F",
    bg: "#FFF0F1",
    detail: "↑ 12.7% vs mês passado",
    detailClass: "text-danger",
  },
  {
    title: "Caixa Disponível",
    value: "R$ 98.120",
    icon: FaLandmark,
    color: "#4DA3FF",
    bg: "#EAF4FF",
  },
  {
    title: "Receita Média Mensal",
    value: "R$ 256.800",
    icon: TbChartHistogram,
    color: "#6C63FF",
    bg: "#F0EEFF",
  },
];

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

const COLORS = {
  success: "#2ED47A",
  warning: "#FFC857",
  danger: "#FF5A5F",
  medium: "#FF8A65",
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

const emotionalFactors = [
  "Gastos reativos acima do ideal",
  "Despesas crescendo mais que receitas",
  "Poucas ações estratégicas nos últimos 60 dias",
];

const Overview = () => {
  const [diasAnimados, setDiasAnimados] = useState(0);
  const diasAtuais = 32;

  const emotionalState = emotionalStates.sobpressao;
  const TrendIcon = emotionalState.trendIcon;

  const dataAtual = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    let start = 0;
    const end = diasAtuais;
    const duration = 1600;
    const incrementTime = duration / end;

    const counter = setInterval(() => {
      start += 1;
      setDiasAnimados(start);

      if (start >= end) {
        clearInterval(counter);
      }
    }, incrementTime);

    return () => clearInterval(counter);
  }, []);

  return (
    <section className="p-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Horizonte de Caixa */}
        <div className="relative flex min-h-[430px] flex-col overflow-hidden rounded-3xl border border-soft bg-card p-6 shadow-sm xl:col-span-7">
          <div className="relative z-10">
            <h2 className="text-sm font-bold uppercase text-primary">
              Horizonte de Caixa
            </h2>
            <p className="mt-1 text-xs text-secondary">
              Atualizado em {dataAtual}
            </p>

            <div className="mt-8 flex items-end gap-3">
              <span className="text-7xl font-bold leading-none text-success">
                {diasAnimados}
              </span>

              <div className="mb-2">
                <p className="text-lg font-semibold text-success">dias</p>
                <p className="text-sm leading-5 text-primary">
                  de estabilidade <br /> operacional
                </p>
              </div>
            </div>

            <div className="mt-5 inline-flex items-center gap-1 rounded-full bg-[#FFF4D6] px-3 py-2 text-xs font-semibold text-warning">
              <BsSuitDiamondFill /> Zona de Atenção
            </div>
          </div>

          <img
            src={caminho}
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
    md:mt-0
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

          <div className="relative z-10 mt-8 lg:mt-auto">
            <div className="relative h-4 rounded-full bg-gradient-to-r from-[#2ED47A] via-[#FFC857] to-[#FF5A5F]">
              <motion.div
                initial={{ left: "8%" }}
                animate={{ left: "68%" }}
                transition={{
                  duration: 2,
                  ease: "easeOut",
                }}
                className="group absolute top-1/2 -translate-x-1/2 -translate-y-full"
              >
                <div className="pointer-events-none absolute bottom-[52px] left-1/2 z-20 w-[140px] -translate-x-1/2 rounded-xl border border-soft bg-white p-4 shadow-md opacity-0 transition-all duration-200 group-hover:-translate-y-1 group-hover:opacity-100">
                  <p className="text-sm font-semibold text-primary">Hoje</p>

                  <p className="mb-[-6px] mt-1 text-lg font-bold text-primary">
                    32 dias
                  </p>

                  <p className="text-xs text-secondary">restantes</p>

                  <p className="mt-1 text-xs">
                    Zona:
                    <span className="font-semibold text-warning"> Atenção</span>
                  </p>
                </div>

                <div className="relative flex flex-col items-center">
                  <FaLocationDot className="text-[42px] text-[#6C63FF] drop-shadow-[0_4px_10px_rgba(108,99,255,0.35)]" />
                </div>
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

        {/* Cards de métricas */}
        <div className="grid grid-cols-1 gap-4 xl:col-span-2">
          {metricCards.map((card) => {
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

        {/* Estado emocional */}
        <div className="rounded-3xl border border-soft bg-card p-6 shadow-sm xl:col-span-3">
          <h2 className="text-sm font-bold uppercase text-primary">
            Estado Emocional da Empresa
          </h2>

          <div className="mt-5 flex items-start justify-between gap-4">
            {/* Conteúdo esquerdo */}
            <div className="flex-1">
              <h3 className={`text-2xl font-bold ${emotionalState.color}`}>
                {emotionalState.title}
              </h3>

              <p className="mt-4 text-xs leading-4 text-primary">
                {emotionalState.description}
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs text-secondary">
                <span>Tendência:</span>

                <div
                  className={`flex items-center gap-1 font-semibold ${emotionalState.color}`}
                >
                  <span>{emotionalState.trend}</span>

                  <TrendIcon className="text-base" />
                </div>
              </div>

              <div className="mt-6">
                <EmotionalGauge
                  value={emotionalState.gaugeValue}
                  emoji={emotionalState.emoji}
                  color={emotionalState.color}
                />
              </div>
            </div>

            {/* Avatar */}
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
                  <div className="flex size-5 items-center justify-center rounded-full bg-[#FFF0F1] text-danger">
                    <IoFlameOutline size={12} />
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
