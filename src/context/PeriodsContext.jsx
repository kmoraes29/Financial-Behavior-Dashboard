import { createContext, useContext, useState, useEffect } from "react";
import { getAvailablePeriodsFromTransactions } from "../utils/periods";
import { useTransactions } from "./TransactionsContext";

const PeriodsContext = createContext(null);

export const PeriodsProvider = ({ children }) => {
    
    const { transactions, loadingTransactions } = useTransactions();
    
    const periods = getAvailablePeriodsFromTransactions(transactions);
    
    const [periodSelected, setPeriodSelected] = useState("");

    const currentPeriod = periodSelected || periods[0]?.value || "";
    
    const handlePeriodSelected = (value) => {
        setPeriodSelected(value);
    };

    return (
        <PeriodsContext.Provider value={{ periods, periodSelected: currentPeriod, handlePeriodSelected, loadingPeriods:loadingTransactions }}>
            {children}
        </PeriodsContext.Provider>
    );
};

export const usePeriods = () => {
    const context = useContext(PeriodsContext);
    if (!context) {
        throw new Error("usePeriods deve ser usado dentro de um PeriodsProvider");
    }
    return context;
};
