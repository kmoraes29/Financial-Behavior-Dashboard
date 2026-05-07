import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";



export function RevenueExpensesBarChart({ balances }) {


  return (
    <div style={{ width: "100%", height: 320 }}>
      <h3>Revenue x Expenses</h3>

      <ResponsiveContainer>
        <BarChart data={balances}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="revenue" name="Revenue" />
          <Bar dataKey="expenses" name="Expenses" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}