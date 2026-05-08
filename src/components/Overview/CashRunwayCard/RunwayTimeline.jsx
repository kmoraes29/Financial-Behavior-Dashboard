import { FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";

export const RunwayTimeline = ({hasCompany,
  diasAtuais, markerPosition, label, color}) => {
    return (
        <div className="relative z-10 mt-auto pt-8">
                    <div className="relative h-4 rounded-full bg-gradient-to-r from-[#FF5A5F] via-[#FFC857] to-[#2ED47A]">
                      <motion.div
                        initial={{ left: "8%" }}
                        animate={{
                          left: hasCompany
                            ? markerPosition
                            : "8%",
                        }}
                        transition={{
                          duration: 2,
                          ease: "easeOut",
                        }}
                        className="group absolute top-1/2 -translate-x-1/2 -translate-y-full"
                      >
                        <div
                          className={`
                          pointer-events-none
                          absolute
                          bottom-[52px]
                          z-20
                          w-[150px]
                          rounded-xl
                          border
                          border-soft
                          bg-white
                          p-4
                          shadow-md
                          opacity-0
                          transition-all
                          duration-200
                          group-hover:-translate-y-1
                          group-hover:opacity-100
        
                          ${
                            diasAtuais >= 75
                              ? "left-0"
                              : diasAtuais <= 20
                                ? "right-0"
                                : "left-1/2 -translate-x-1/2"
                          }
                        `}
                        >
                          <p className="text-sm font-semibold text-primary">Hoje</p>
                          <p className="mb-[-6px] mt-1 text-lg font-bold text-primary">
                            {hasCompany ? `${diasAtuais} dias` : "--"}
                          </p>
                          <p className="text-xs text-secondary">restantes</p>
                          <p className="mt-1 text-xs">
                            Zona:
                            <span className={`font-semibold ${color}`}>
                              {" "}
                              {hasCompany ? label : "--"}
                            </span>
                          </p>
                        </div>
        
                        <FaLocationDot className="text-[42px] text-[#6C63FF] drop-shadow-[0_4px_10px_rgba(108,99,255,0.35)]" />
                      </motion.div>
                    </div>
        
                    <div className="mt-3 flex justify-between text-xs text-secondary">
                      <span>0 dias</span>
                      <span>30 dias</span>
                      <span>60 dias</span>
                      <span>90+ dias</span>
                    </div>
                  </div>
    )
};