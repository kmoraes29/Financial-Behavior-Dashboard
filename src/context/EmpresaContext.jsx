import { createContext, useContext, useState, useEffect } from "react";
import { getCompanies } from "../api";

const CompaniesContext = createContext(null);

export const CompaniesProvider = ({ children }) => {
    const [companies, setCompanies] = useState([]);
    const [companySelected, setCompanySelected] = useState(null);
    const [loadingCompanies, setLoadingCompanies] = useState(true);

    const handleCompanySelected = (id) => {
        const companySelected = companies.find((company) => String(company.id) === String(id));
        
        if (companySelected) {
            setCompanySelected(companySelected);
        }
    };

    useEffect(() => {
        async function loadCompanies() {
            try {
                const response = await getCompanies();
                setCompanies(response);
            } catch (error) {
                console.error("Erro ao carregar empresas:", error);
            } finally {
                setLoadingCompanies(false);
            }
        };
        loadCompanies();
    }, []);

    return (
        <CompaniesContext.Provider value={{ companies, setCompanies, companySelected, setCompanySelected, loadingCompanies, handleCompanySelected }}>
            {children}
        </CompaniesContext.Provider>
    );
};

export const useCompanies = () => {
    const context = useContext(CompaniesContext);
    if (!context) {
        throw new Error("useCompanies deve ser usado dentro de um CompaniesProvider");
    }
    return context;
};


