import { API_URL} from './httpClient';

export async function getTransactions() {
    const response = await fetch(`${API_URL}/transacoes`);
    return response.json();
};