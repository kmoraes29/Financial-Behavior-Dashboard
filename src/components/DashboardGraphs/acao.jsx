import { motion } from "framer-motion";
import { FaLocationDot } from "react-icons/fa6";
import { IoPersonRemoveOutline } from "react-icons/io5";
import { TfiArrowRight } from "react-icons/tfi";

import caminho from "../../assets/imagens/caminho.png";
import caminhoCritico from "../../assets/imagens/caminho-critico.png";
import caminhoAtencao from "../../assets/imagens/caminho-atencao.png";

const ScenarioCard = ({
  label,
  subtitle,
  days,
  status,
  statusClass,
  image,
  markerPosition,
  impact,
}) => {
  return (
    <div className="flex-1">
      <div className="mb-3 text-center">
        <h3 className="text-sm font-bold uppercase text-primary-purple">
          {label}
        </h3>
        <p className="text-xs text-secondary">{subtitle}</p>
      </div>

      <div className="relative min-h-70 overflow-hidden rounded-3xl border border-soft bg-card px-6 pb-6 pt-8 shadow-sm">
        {" "}
        <div className="relative z-10">
          <h4 className="text-xs font-bold uppercase text-primary">
            Horizonte de Caixa
          </h4>

          <div className="mt-5 flex items-end gap-2">
            <span className={`text-6xl font-bold leading-none ${statusClass}`}>
              {days}
            </span>

            <div className="mb-2">
              <p className={`text-sm font-semibold ${statusClass}`}>dias</p>
              <p className="text-xs leading-4 text-primary">
                de estabilidade <br /> operacional
              </p>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute left-[56%] top-8 hidden h-41.25 w-62.5 -translate-x-1/2 overflow-hidden rounded-3xl bg-card xl:block">
          {" "}
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover opacity-90 mix-blend-multiply"
          />
        </div>
        {impact && (
          <div className="absolute right-4 top-8 rounded-2xl bg-danger-soft p-3 text-center">
            <p className="text-xs font-semibold text-primary">Impacto:</p>
            <p className="mt-1 text-base font-bold text-danger">{impact}</p>
            <p className="text-[11px] text-secondary">na sua runway</p>
          </div>
        )}
        <div className="absolute bottom-3 left-6 right-6">
          <div className="relative h-3 rounded-full bg-gradient-to-r from-[#2ED47A] via-[#FFC857] to-[#FF5A5F]">
            <motion.div
              initial={{ left: "10%" }}
              animate={{ left: markerPosition }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="group absolute top-1/2 -translate-x-1/2 -translate-y-full"
            >
              <div className="pointer-events-none absolute bottom-[44px] left-1/2 z-20 w-[130px] -translate-x-1/2 rounded-xl border border-soft bg-card p-3 text-center shadow-md opacity-0 transition-all duration-200 group-hover:-translate-y-1 group-hover:opacity-100">
                <p className="text-[11px] font-semibold text-secondary">
                  Status atual
                </p>

                <p className={`mt-1 text-xs font-bold ${statusClass}`}>
                  {status}
                </p>
              </div>

              <FaLocationDot className="text-[36px] text-primary-purple drop-shadow-[0_4px_10px_rgba(108,99,255,0.35)]" />
            </motion.div>
          </div>

          <div className="mt-3 flex justify-between text-[11px] text-secondary">
            <span>90+ dias</span>
            <span>60 dias</span>
            <span>30 dias</span>
            <span>0 dias</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const getScenarioImage = (days) => {
  if (days < 30) return caminhoCritico;
  if (days < 60) return caminhoAtencao;
  return caminho;
};

const beforeDays = 32;
const afterDays = 18;

const Acao = () => {
  return (
    <section className="px-6 pb-8">
      <div className="rounded-3xl border border-soft bg-card/70 p-6 shadow-sm">
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[1fr_420px_1fr]">
          <ScenarioCard
            label="Antes"
            subtitle="Situação atual"
            days={32}
            status="Zona de Atenção"
            statusClass="text-warning"
            image={getScenarioImage(beforeDays)}
            markerPosition="68%"
          />

          <div className="flex h-full min-w-[360px] flex-col">
            <div className="text-center mb-2">
              <h3 className="text-sm font-bold uppercase text-primary-purple">
                Ação
              </h3>

              <p className="text-xs text-secondary">
                Simulação: perder um cliente
              </p>
            </div>

            <div className="flex flex-1 items-center justify-center gap-10">
              <TfiArrowRight className="hidden text-4xl text-primary-purple xl:block" />

              <button className="flex items-center gap-2 rounded-2xl bg-gradient-ai px-8 py-4 text-sm font-semibold text-white shadow-md transition-all hover:scale-[1.02]">
                <IoPersonRemoveOutline className="text-lg" />
                Perder um cliente
              </button>

              <TfiArrowRight className="hidden text-4xl text-primary-purple xl:block" />
            </div>
          </div>

          <ScenarioCard
            label="Depois"
            subtitle="Impacto da decisão"
            days={18}
            status="Zona Crítica"
            statusClass="text-danger"
            image={getScenarioImage(afterDays)}
            markerPosition="82%"
            impact="-14 dias"
          />
        </div>
      </div>
    </section>
  );
};

export default Acao;
