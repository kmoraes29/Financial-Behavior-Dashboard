import react from "react";
import ControleDeGastos from "./controleDeGastos";
import VariacaoDespesas from "./variacaoDespesas";
import InsightsCard from "./insightsCard";

const DashboardGraphs = () => {
  return (
    <section className="px-6 pb-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <ControleDeGastos />

        <VariacaoDespesas />

        <InsightsCard />
      </div>
    </section>
  );
};

export default DashboardGraphs;
