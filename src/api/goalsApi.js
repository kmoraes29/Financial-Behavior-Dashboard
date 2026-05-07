import { API_URL} from './httpClient';

export async function getGoals() {
    const response = await fetch(`${API_URL}/metas_orcamentarias`);
    return response.json();
};