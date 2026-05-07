import { API_URL} from './httpClient';

export async function getAccounts() {
    const response = await fetch(`${API_URL}/contas_bancarias`);
    return response.json();
};