import { createContext, useContext, useState, useEffect } from "react";
import { getBalances } from "../api";

const BalancesContext = createContext(null);

export const BalancesProvider = ({ children }) => {
    const [balances, setBalances] = useState([]);
    const [loadingBalances, setLoadingBalances] = useState(true);

    useEffect(() => {
        async function loadBalances() {
            try {
                const response = await getBalances();
                setBalances(response);
            } catch (error) {
                console.error("Erro ao carregar balanços:", error);
            } finally {
                setLoadingBalances(false);
            }
        };
        loadBalances();
    }, []);

    return (
        <BalancesContext.Provider value={{ balances, setBalances, loadingBalances }}>
            {children}
        </BalancesContext.Provider>
    );
};

export const useBalances = () => {
    const context = useContext(BalancesContext);
    if (!context) {
        throw new Error("useBalances deve ser usado dentro de um BalancesProvider");
    }
    return context;
};


