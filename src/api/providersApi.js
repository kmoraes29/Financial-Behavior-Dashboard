import { API_URL} from './httpClient';

export async function getProviders() {
    const response = await fetch(`${API_URL}/fornecedores`);
    return response.json();
};