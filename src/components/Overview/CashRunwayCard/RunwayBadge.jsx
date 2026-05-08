import { BsSuitDiamondFill } from "react-icons/bs";

export const RunwayBadge = ({hasCompany, label, bgColor, textColor}) => {
    return (
        <div
                      className={`mt-5 inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold ${bgColor} ${textColor}`}
                    >
                      <BsSuitDiamondFill />
                      {hasCompany
                        ? label
                        : "Selecione uma empresa"}
                    </div>
    )
};