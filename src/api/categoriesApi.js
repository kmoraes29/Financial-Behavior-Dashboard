import { API_URL} from './httpClient';

export async function getCategories() {
    const response = await fetch(`${API_URL}/categorias`);
    return response.json();
};