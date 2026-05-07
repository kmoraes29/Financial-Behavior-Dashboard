import { API_URL} from './httpClient';

export async function getBalances() {
    const response = await fetch(`${API_URL}/saldos_mensais`);
    return response.json();
};