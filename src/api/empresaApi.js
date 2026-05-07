import { API_URL } from './httpClient';

export async function getEmpresa() {
    const response = await fetch(`${API_URL}/empresa`);
    return response.json();
};