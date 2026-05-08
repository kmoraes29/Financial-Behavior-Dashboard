import GaugeComponent from "react-gauge-component";

const COLORS = {
  success: "#2ED47A",
  warning: "#FFC857",
  danger: "#FF5A5F",
  medium: "#FF8A65",
};

export const EmotionalGauge = ({ value, emoji: EmojiIcon, color }) => {
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