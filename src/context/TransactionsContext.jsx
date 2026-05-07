import { createContext, useContext, useState, useEffect } from "react";
import { getTransactions } from "../api/client";

const TransactionsContext = createContext(null);

export const TransactionsProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    

    useEffect(() => {
        async function loadTransactions() {
            try {
                const response = await getTransactions();
                setTransactions(response);
            } catch (error) {
                console.error("Erro ao carregar transações:", error);
            }
        }
        loadTransactions();
    }, []);

    return (
        <TransactionsContext.Provider value={{ transactions, setTransactions }}>
            {children}
        </TransactionsContext.Provider>
    );
};

export const useTransactions = () => {
    const context = useContext(TransactionsContext);
    if (!context) {
        throw new Error("useAccount deve ser usado dentro de um TransactionsProvider");
    }
    return context;
};