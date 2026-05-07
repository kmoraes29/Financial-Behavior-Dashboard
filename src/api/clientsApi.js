import { API_URL} from './httpClient';

export async function getClients() {
    const response = await fetch(`${API_URL}/clientes`);
    return response.json();
};