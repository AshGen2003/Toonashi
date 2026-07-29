const JIKAN_BASE_URL = 'https://api.jikan.moe/v4';

async function fetchWithRetry(url: string, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { next: { revalidate: 3600 } });
      if (res.status === 429) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
        continue;
      }
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
}

export async function getTopAnime(page = 1, limit = 25) {
  const cappedLimit = Math.min(limit, 100);
  return fetchWithRetry(`${JIKAN_BASE_URL}/top/anime?page=${page}&limit=${cappedLimit}`);
}

export async function getNewestHighRatedAnime(page = 1, limit = 25) {
  const cappedLimit = Math.min(limit, 100);
  const data = await fetchWithRetry(`${JIKAN_BASE_URL}/seasons/now?order_by=score&sort=desc&page=${page}&limit=${cappedLimit}`);
  
  if ((!data.data || data.data.length === 0) && page === 1) {
    return fetchWithRetry(`${JIKAN_BASE_URL}/top/anime?filter=airing&page=${page}&limit=${cappedLimit}`);
  }
  
  return data;
}

export async function getOngoingAnime(page = 1, limit = 25) {
  const cappedLimit = Math.min(limit, 100);
  return fetchWithRetry(`${JIKAN_BASE_URL}/seasons/now?page=${page}&limit=${cappedLimit}`);
}

export async function searchAnime(query: string, page = 1, params = "", limit = 25) {
  const cappedLimit = Math.min(limit, 100);
  return fetchWithRetry(`${JIKAN_BASE_URL}/anime?q=${query}&page=${page}&limit=${cappedLimit}${params}`);
}

export async function getAnimeDetails(id: string) {
  return fetchWithRetry(`${JIKAN_BASE_URL}/anime/${id}/full`);
}

export async function getAnimeCharacters(id: string) {
  return fetchWithRetry(`${JIKAN_BASE_URL}/anime/${id}/characters`);
}

export async function getAnimeGenres() {
  return fetchWithRetry(`${JIKAN_BASE_URL}/genres/anime`);
}

export async function getAnimeRecommendations(id: string) {
  return fetchWithRetry(`${JIKAN_BASE_URL}/anime/${id}/recommendations`);
}




