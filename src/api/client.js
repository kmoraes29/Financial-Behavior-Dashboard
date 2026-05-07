const API_URL = "http://localhost:3001";

export async function getAccounts() {
    const response = await fetch(`${API_URL}/contas_bancarias`);
    return response.json();
};

export async function getTransactions() {
    const response = await fetch(`${API_URL}/transacoes`);
    return response.json();
};

export async function getEmpresa() {
    const response = await fetch(`${API_URL}/empresa`);
    return response.json();
};

export async function getUsers() {
    const response = await fetch(`${API_URL}/usuarios`);
    return response.json();
};

export async function getClients() {
    const response = await fetch(`${API_URL}/clientes`);
    return response.json();
};

export async function getProviders() {
    const response = await fetch(`${API_URL}/fornecedores`);
    return response.json();
};

export async function getCategories() {
    const response = await fetch(`${API_URL}/categorias`);
    return response.json();
};

export async function getGoals() {
    const response = await fetch(`${API_URL}/metas_orcamentarias`);
    return response.json();
};

export async function getUser() {
    const response = await fetch(`${API_URL}/usuarios`);
    return response.json();
};

export async function getBalance() {
    const response = await fetch(`${API_URL}/saldos_mensais`);
    return response.json();
};