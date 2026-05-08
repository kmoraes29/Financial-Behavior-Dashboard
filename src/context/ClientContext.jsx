import { createContext, useContext, useState, useEffect } from "react";
import { getClients } from "../api";

const ClientsContext = createContext(null);

export const ClientsProvider = ({ children }) => {
    const [clients, setClients] = useState([]);
    const [clientSelected, setClientSelected] = useState(null);
    const [loadingClients, setLoadingClients] = useState(true);

    const handleClientsSelected = (id) => {
        const clientSelected = clients.find((client) => String(client.id) === String(id));
        
        if (clientSelected) {
            setClientSelected(clientSelected);
        }
    };

    useEffect(() => {
        async function loadClients() {
            try {
                const response = await getClients();
                setClients(response);
            } catch (error) {
                console.error("Erro ao carregar clientes:", error);
            } finally {
                setLoadingClients(false);
            }
        };
        loadClients();
    }, []);

    return (
        <ClientsContext.Provider value={{ clients, setClients, clientSelected, setClientSelected, loadingClients, handleClientsSelected }}>
            {children}
        </ClientsContext.Provider>
    );
};

export const useClients = () => {
    const context = useContext(ClientsContext);
    if (!context) {
        throw new Error("useClients deve ser usado dentro de um ClientsProvider");
    }
    return context;
};


