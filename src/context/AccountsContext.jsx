import { createContext, useContext, useState, useEffect } from "react";
import { getAccounts } from "../api";

const AccountsContext = createContext(null);

export const AccountsProvider = ({ children }) => {
    const [accounts, setAccounts] = useState([]);
    const [accountSelected, setAccountSelected] = useState(null);
    const [loadingAccounts, setLoadingAccounts] = useState(true);

    const handleAccountSelected = (id) => {
        const accountSelected = accounts.find((account) => String(account.id) === String(id));
        
        if (accountSelected) {
            setAccountSelected(accountSelected);
        }
    };

    useEffect(() => {
        async function loadAccounts() {
            try {
                const response = await getAccounts();
                setAccounts(response);
            } catch (error) {
                console.error("Erro ao carregar contas:", error);
            } finally {
                setLoadingAccounts(false);
            }
        };
        loadAccounts();
    }, []);

    return (
        <AccountsContext.Provider value={{ accounts, setAccounts, accountSelected, setAccountSelected, loadingAccounts, handleAccountSelected }}>
            {children}
        </AccountsContext.Provider>
    );
};

export const useAccounts = () => {
    const context = useContext(AccountsContext);
    if (!context) {
        throw new Error("useAccount deve ser usado dentro de um AccountProvider");
    }
    return context;
};


