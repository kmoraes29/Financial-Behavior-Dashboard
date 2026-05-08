import { ResponsiveContainer, LineChart, Line } from "recharts";
import {
  FaMoneyBillWave,
  FaBullhorn,
  FaLaptopCode,
  FaBuilding,
  FaEllipsisH,
} from "react-icons/fa";
import { IoArrowForward, IoArrowUp, IoArrowDown } from "react-icons/io5";

const categories = [
  {
    icon: FaMoneyBillWave,
    iconClass: "text-success",
    title: "Folha de Pagamento",
    amount: "R$ 78.500",
    percentage: "42%",
    variation: "5,3%",
    variationClass: "text-danger",
    lineColor: "var(--danger)",
    tag: "Estratégico",
    tagClass: "tag-success",
    sparkline: [
      { value: 10 },
      { value: 18 },
      { value: 12 },
      { value: 20 },
      { value: 15 },
      { value: 22 },
    ],
  },
  {
    icon: FaBullhorn,
    iconClass: "text-medium",
    title: "Marketing e Vendas",
    amount: "R$ 25.600",
    percentage: "14%",
    variation: "12,1%",
    variationClass: "text-danger",
    lineColor: "var(--medium)",
    tag: "Impulsivo",
    tagClass: "tag-medium",
    sparkline: [
      { value: 12 },
      { value: 9 },
      { value: 15 },
      { value: 11 },
      { value: 18 },
      { value: 13 },
    ],
  },
  {
    icon: FaLaptopCode,
    iconClass: "text-primary-purple",
    title: "Assinaturas e Softwares",
    amount: "R$ 12.300",
    percentage: "7%",
    variation: "27,3%",
    variationClass: "text-danger",
    lineColor: "var(--warning)",
    tag: "Reativo",
    tagClass: "tag-warning",
    sparkline: [
      { value: 8 },
      { value: 12 },
      { value: 10 },
      { value: 14 },
      { value: 13 },
      { value: 17 },
    ],
  },
  {
    icon: FaBuilding,
    iconClass: "text-primary-blue",
    title: "Operacional",
    amount: "R$ 18.750",
    percentage: "10%",
    variation: "2,1%",
    variationClass: "text-success",
    lineColor: "var(--success)",
    tag: "Estratégico",
    tagClass: "tag-success",
    sparkline: [
      { value: 16 },
      { value: 12 },
      { value: 15 },
      { value: 11 },
      { value: 14 },
      { value: 10 },
    ],
  },
  {
    icon: FaEllipsisH,
    iconClass: "text-secondary",
    title: "Outros",
    amount: "R$ 48.600",
    percentage: "27%",
    variation: "8,7%",
    variationClass: "text-danger",
    lineColor: "var(--danger)",
    tag: "Defensivo",
    tagClass: "tag-defensive",
    sparkline: [
      { value: 14 },
      { value: 18 },
      { value: 12 },
      { value: 16 },
      { value: 13 },
      { value: 15 },
    ],
  },
];

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

const ControleDeGastos = () => {
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
