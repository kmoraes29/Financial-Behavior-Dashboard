import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { IoArrowForward, IoArrowUp } from "react-icons/io5";

const data = [
  { mes: "Dez/24", receitas: 280, despesas: 190, saldo: 80 },
  { mes: "Jan/25", receitas: 310, despesas: 210, saldo: 120 },
  { mes: "Fev/25", receitas: 350, despesas: 260, saldo: 180 },
  { mes: "Mar/25", receitas: 340, despesas: 280, saldo: 120 },
  { mes: "Abr/25", receitas: 300, despesas: 220, saldo: 190 },
  { mes: "Mai/25", receitas: 285, despesas: 185, saldo: 95 },
];

const VariacaoDespesas = () => {
  return (
    <div className="rounded-3xl border border-soft bg-card p-6 shadow-sm xl:col-span-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase text-primary">
          Variação de Despesas
        </h2>

        <span className="text-xs text-secondary">ⓘ</span>
      </div>

      <div className="mt-6 flex items-center gap-5 text-xs font-semibold text-secondary">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-6 rounded-full bg-success" />
          Receitas
        </div>

        <div className="flex items-center gap-2">
          <span className="h-1.5 w-6 rounded-full bg-danger" />
          Despesas
        </div>

        <div className="flex items-center gap-2">
          <span className="h-1.5 w-6 rounded-full bg-primary-purple" />
          Saldo
        </div>
      </div>

      <div className="mt-6 grid grid-cols-[1fr_auto] gap-5">
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <CartesianGrid vertical={false} stroke="#E6EAF2" />
              <XAxis
                dataKey="mes"
                tick={{ fontSize: 11, fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value}k`}
              />
              <Tooltip />

              <Bar
                dataKey="receitas"
                fill="var(--success)"
                radius={[6, 6, 0, 0]}
                barSize={14}
              />

              <Bar
                dataKey="despesas"
                fill="var(--danger)"
                radius={[6, 6, 0, 0]}
                barSize={14}
              />

              <Line
                type="monotone"
                dataKey="saldo"
                stroke="var(--primary-purple)"
                strokeWidth={3}
                dot={{ r: 3 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="flex w-[120px] flex-col gap-4">
          <div className="rounded-2xl bg-danger/10 p-4">
            <p className="text-xs font-bold text-primary">Despesas</p>
            <p className="mt-2 text-lg font-bold text-danger">R$ 184.250</p>

            <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-danger">
              <IoArrowUp />
              <span>12,7%</span>
            </div>

            <p className="mt-1 text-[11px] text-secondary">vs Abr/25</p>
          </div>

          <div className="rounded-2xl bg-success/10 p-4">
            <p className="text-xs font-bold text-primary">Receitas</p>
            <p className="mt-2 text-lg font-bold text-success">R$ 256.800</p>

            <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-success">
              <IoArrowUp />
              <span>8,2%</span>
            </div>

            <p className="mt-1 text-[11px] text-secondary">vs Abr/25</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button className="flex items-center gap-2 whitespace-nowrap rounded-full border border-soft px-5 py-2 text-xs font-medium text-primary-purple transition-all hover:bg-hover">
          Ver histórico completo
          <IoArrowForward className="text-[16px]" />
        </button>
      </div>
    </div>
  );
};

export default VariacaoDespesas;
