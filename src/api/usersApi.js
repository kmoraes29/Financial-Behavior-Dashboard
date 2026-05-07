import { API_URL} from './httpClient';

export async function getUsers() {
    const response = await fetch(`${API_URL}/usuarios`);
    return response.json();
};