import { API_URL } from './httpClient';

export async function getCompanies() {
    const response = await fetch(`${API_URL}/empresa`);
    return response.json();
};