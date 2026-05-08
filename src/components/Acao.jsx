import { useState } from "react";

// SVG illustrations for the runway
const RunwayIllustration = ({ variant = "normal" }) => {
  if (variant === "critical") {
    return (
      <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="skyRed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fee2e2" />
          </linearGradient>
          <linearGradient id="groundRed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fca5a5" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <rect width="120" height="80" fill="url(#skyRed)" rx="8" />
        <ellipse cx="60" cy="72" rx="55" ry="12" fill="url(#groundRed)" opacity="0.6" />
        <path d="M10 65 Q30 45 50 50 Q70 55 90 42 Q105 35 115 30" stroke="#f87171" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M15 70 Q35 55 55 58 Q75 61 95 50 Q108 43 116 38" stroke="#fca5a5" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5" />
        <circle cx="95" cy="20" r="12" fill="#fed7aa" opacity="0.7" />
        <circle cx="100" cy="16" r="8" fill="#fbbf24" opacity="0.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skyBlue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#f0fdf4" />
        </linearGradient>
        <linearGradient id="groundGreen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="100%" stopColor="#4ade80" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <rect width="120" height="80" fill="url(#skyBlue)" rx="8" />
      <ellipse cx="60" cy="72" rx="55" ry="12" fill="url(#groundGreen)" opacity="0.6" />
      <path d="M10 65 Q30 50 50 52 Q70 54 90 40 Q105 30 115 25" stroke="#4ade80" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M15 70 Q35 58 55 60 Q75 62 95 50 Q108 42 116 38" stroke="#86efac" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5" />
      <circle cx="90" cy="18" r="10" fill="#bae6fd" opacity="0.8" />
      <circle cx="95" cy="14" r="7" fill="#7dd3fc" opacity="0.5" />
      <path d="M20 55 Q25 50 30 52 Q35 54 40 50" stroke="#a3e635" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
};

// Runway progress bar component
const RunwayBar = ({ days, maxDays = 90, critical = false }) => {
  const percentage = Math.min((days / maxDays) * 100, 100);
  const zones = [
    { label: "0 dias", position: 0 },
    { label: "30 dias", position: 33.3 },
    { label: "60 dias", position: 66.6 },
    { label: "90+ dias", position: 100 },
  ];

  const markerColor = critical ? "#ef4444" : days <= 30 ? "#f59e0b" : "#8b5cf6";

  return (
    <div className="w-full">
      <div className="relative h-3 rounded-full overflow-visible mb-1" style={{ background: "linear-gradient(to right, #ef4444 0%, #f59e0b 30%, #22c55e 70%, #22c55e 100%)" }}>
        {/* Marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out"
          style={{ left: `${percentage}%`, transform: `translateX(-50%) translateY(-50%)` }}
        >
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 rounded-full border-2 border-white shadow-lg" style={{ backgroundColor: markerColor }} />
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent" style={{ borderTopColor: markerColor }} />
          </div>
        </div>
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-3">
        {zones.map((zone) => (
          <span key={zone.label}>{zone.label}</span>
        ))}
      </div>
      {critical ? (
        <div className="mt-1 text-center text-xs font-semibold text-red-500">Zona Crítica</div>
      ) : days <= 30 ? (
        <div className="mt-1 text-center text-xs font-semibold text-amber-500">Zona de Atenção</div>
      ) : null}
    </div>
  );
};

// Individual card component
const Card = ({ title, subtitle, days, impact, isAction = false, onAction, loading = false, critical = false }) => {
  return (
    <div
      className={`flex flex-col rounded-2xl p-5 shadow-lg transition-all duration-500 ${
        isAction
          ? "bg-white border-2 border-dashed border-purple-200 flex items-center justify-center min-h-[280px]"
          : "bg-white border border-gray-100"
      }`}
      style={{ minWidth: 220, flex: 1 }}
    >
      {isAction ? (
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="text-center mb-2">
            <p className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-1">AÇÃO</p>
            <p className="text-xs text-gray-400">Simulação: Perder um cliente</p>
          </div>
          <div className="flex items-center gap-3 w-full justify-center">
            <div className="flex-1 border-t-2 border-dashed border-purple-200" />
            <button
              onClick={onAction}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white text-sm shadow-lg transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400"
              style={{
                background: loading
                  ? "#a78bfa"
                  : "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : (
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
              )}
              {loading ? "Simulando..." : "Perder um cliente"}
            </button>
            <div className="flex-1 border-t-2 border-dashed border-purple-200" />
          </div>
          <p className="text-xs text-gray-400 text-center max-w-[160px]">Clique para simular o impacto desta ação</p>
        </div>
      ) : (
        <>
          <div className="mb-3">
            <p className={`text-xs font-bold uppercase tracking-widest mb-0.5 ${critical ? "text-red-400" : "text-purple-400"}`}>
              {title}
            </p>
            <p className="text-xs text-gray-400">{subtitle}</p>
          </div>

          {/* Illustration */}
          <div className="w-full h-20 mb-3 rounded-xl overflow-hidden">
            <RunwayIllustration variant={critical ? "critical" : "normal"} />
          </div>

          {/* Days counter */}
          <div className="flex items-start gap-2 mb-1">
            <span
              className={`text-5xl font-black leading-none transition-all duration-700 ${
                critical ? "text-red-500" : days <= 30 ? "text-amber-500" : "text-purple-600"
              }`}
            >
              {days}
            </span>
            <div className="mt-2">
              <p className="text-xs font-semibold text-gray-600 leading-tight">dias</p>
              <p className="text-xs text-gray-400 leading-tight">de sobrevivência</p>
              <p className="text-xs text-gray-400 leading-tight">sem novas receitas</p>
            </div>
            {impact !== undefined && (
              <div className="ml-auto">
                <div className={`rounded-xl px-3 py-2 text-center ${impact < 0 ? "bg-red-50 border border-red-100" : "bg-green-50 border border-green-100"}`}>
                  <p className="text-xs text-gray-400 leading-none mb-1">Impacto:</p>
                  <p className={`text-lg font-black leading-none ${impact < 0 ? "text-red-500" : "text-green-500"}`}>
                    {impact > 0 ? "+" : ""}{impact} dias
                  </p>
                  <p className="text-xs text-gray-400 leading-none mt-1">na sua runway</p>
                </div>
              </div>
            )}
          </div>

          {/* Runway label */}
          <div className="flex items-center gap-1.5 mb-3">
            <svg className="h-3 w-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Runway Financeira</p>
          </div>

          <RunwayBar days={days} critical={critical} />
        </>
      )}
    </div>
  );
};

// Main component
export default function Acao() {
  const [simulated, setSimulated] = useState(false);
  const [loading, setLoading] = useState(false);
  const baseDays = 32;
  const afterDays = 18;
  const impact = afterDays - baseDays;

  const handleAction = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSimulated(true);
    }, 1200);
  };

  const handleReset = () => {
    setSimulated(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-black text-gray-800 tracking-tight mb-1">Simulador de Impacto Financeiro</h1>
        <p className="text-sm text-gray-400">Veja como suas decisões afetam sua runway em tempo real</p>
      </div>

      {/* Cards container */}
      <div className="flex flex-col md:flex-row items-stretch gap-4 w-full max-w-4xl">
        {/* ANTES */}
        <Card
          title="ANTES"
          subtitle="Situação atual"
          days={baseDays}
          critical={false}
        />

        {/* AÇÃO */}
        <div className="flex items-center justify-center md:flex-col gap-2 md:gap-0">
          <div className="hidden md:block">
            <svg width="40" height="20" viewBox="0 0 40 20">
              <line x1="0" y1="10" x2="30" y2="10" stroke="#c4b5fd" strokeWidth="2" strokeDasharray="5,4" />
              <polygon points="30,5 40,10 30,15" fill="#a78bfa" />
            </svg>
          </div>
          <Card
            isAction
            onAction={handleAction}
            loading={loading}
          />
          <div className="hidden md:block">
            <svg width="40" height="20" viewBox="0 0 40 20">
              <line x1="0" y1="10" x2="30" y2="10" stroke="#c4b5fd" strokeWidth="2" strokeDasharray="5,4" />
              <polygon points="30,5 40,10 30,15" fill="#a78bfa" />
            </svg>
          </div>
        </div>

        {/* DEPOIS */}
        <div className={`flex-1 transition-all duration-700 ${simulated ? "opacity-100 scale-100" : "opacity-40 scale-95 pointer-events-none"}`}>
          <Card
            title="DEPOIS"
            subtitle="Impacto da decisão"
            days={afterDays}
            impact={impact}
            critical={true}
          />
        </div>
      </div>

      {/* Annotation */}
      {simulated && (
        <div className="mt-6 flex items-center gap-3 animate-bounce">
          <svg width="60" height="30" viewBox="0 0 60 30" className="text-purple-400">
            <path d="M50 5 Q20 5 10 20" stroke="#a78bfa" strokeWidth="2" fill="none" strokeLinecap="round" />
            <polygon points="5,18 14,24 16,14" fill="#a78bfa" />
          </svg>
          <p className="text-sm font-semibold italic" style={{ fontFamily: "cursive", color: "#7c3aed" }}>
            Marcador se move e tudo se atualiza em tempo real
          </p>
        </div>
      )}

      {/* Reset */}
      {simulated && (
        <button
          onClick={handleReset}
          className="mt-4 text-xs text-purple-400 hover:text-purple-600 underline underline-offset-2 transition-colors"
        >
          Resetar simulação
        </button>
      )}
    </div>
  );
}
