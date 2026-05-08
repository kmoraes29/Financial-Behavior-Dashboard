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
import { IoArrowForward, IoArrowUp, IoArrowDown } from "react-icons/io5";

import { useBalances } from "../../context/BalancesContext";
import { usePeriods } from "../../context/PeriodsContext";
import { useCompanies } from "../../context/EmpresaContext";
import { getBalanceAnalytics } from "../../utils/balanceAnalytics";
import { formatCurrency } from "../../utils/currency";

const formatMonthLabel = (period) => {
  const [year, month] = period.split("-");

  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  return `${months[Number(month) - 1]}/${year.slice(2)}`;
};

const getVariation = (current, previous) => {
  if (!previous || previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded-xl border border-soft bg-card p-4 shadow-lg">
      <p className="mb-3 text-xs font-bold text-primary">{label}</p>

      <div className="space-y-2 text-xs">
        {payload.map((item) => (
          <div key={item.dataKey} className="flex items-center gap-2">
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />

            <span className="capitalize text-secondary">{item.dataKey}:</span>

            <span className="font-semibold text-primary">
              {formatCurrency(item.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const VariacaoDespesas = () => {
  const { balances } = useBalances();
  const { periodSelected } = usePeriods();
  const { companySelected } = useCompanies();

  const companyId = companySelected?.id;

  if (!companyId) {
    return (
      <div className="rounded-3xl border border-soft bg-card p-6 shadow-sm xl:col-span-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase text-primary">
            Variação de Despesas
          </h2>

          <span className="text-xs text-secondary">ⓘ</span>
        </div>

        <div className="mt-6 rounded-2xl bg-hover p-6 text-center">
          <p className="text-xs font-semibold text-secondary">
            Selecione uma empresa para visualizar a variação financeira.
          </p>
        </div>
      </div>
    );
  }

  const balanceAnalytics = getBalanceAnalytics({
    balances,
    periodSelected,
    companySelectedId: companyId,
  });

  const resumeBalancesPeriods = balanceAnalytics?.resumeBalancesPeriods || [];

  const data = resumeBalancesPeriods.map((item) => ({
    mes: formatMonthLabel(item.mes),
    receitas: item.receitas,
    despesas: item.despesas,
    saldo: item.resultado_mes,
  }));

  const currentMonth = resumeBalancesPeriods.at(-1);
  const previousMonth = resumeBalancesPeriods.at(-2);

  const despesasVariation = getVariation(
    currentMonth?.despesas,
    previousMonth?.despesas,
  );

  const receitasVariation = getVariation(
    currentMonth?.receitas,
    previousMonth?.receitas,
  );

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

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_auto]">
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
                tickFormatter={(value) => `${Math.round(value / 1000)}k`}
              />

              <Tooltip content={<CustomTooltip />} />

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
                stroke="#6C63FF"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "#6C63FF",
                  strokeWidth: 0,
                }}
                activeDot={{
                  r: 6,
                  fill: "#6C63FF",
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="flex w-full flex-col gap-4 lg:w-[120px]">
          <div className="rounded-2xl bg-danger-soft p-4">
            <p className="text-xs font-bold text-primary">Despesas</p>

            <p className="whitespace-nowrap text-sm font-bold text-danger">
              {formatCurrency(currentMonth?.despesas || 0)}
            </p>

            <div
              className={`mt-3 flex items-center gap-1 text-xs font-semibold ${
                despesasVariation >= 0 ? "text-danger" : "text-success"
              }`}
            >
              {despesasVariation >= 0 ? <IoArrowUp /> : <IoArrowDown />}
              <span>{Math.abs(despesasVariation).toFixed(1)}%</span>
            </div>

            <p className="mt-1 text-xs text-secondary">vs mês passado</p>
          </div>

          <div className="rounded-2xl bg-success-soft p-4">
            <p className="text-xs font-bold text-primary">Receitas</p>

            <p className="whitespace-nowrap text-sm font-bold text-success">
              {formatCurrency(currentMonth?.receitas || 0)}
            </p>

            <div
              className={`mt-3 flex items-center gap-1 text-xs font-semibold ${
                receitasVariation >= 0 ? "text-success" : "text-danger"
              }`}
            >
              {receitasVariation >= 0 ? <IoArrowUp /> : <IoArrowDown />}
              <span>{Math.abs(receitasVariation).toFixed(1)}%</span>
            </div>

            <p className="mt-1 text-xs text-secondary">vs mês passado</p>
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
