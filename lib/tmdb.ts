const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API;
const API_READ_ACCESS_TOKEN = process.env.API_READ_ACCESS_TOKEN;

export const tmdbFetch = async <T>(endpoint: string): Promise<T> => {
  const url = `${TMDB_BASE_URL}${endpoint}${endpoint.includes("?") ? "&" : "?"}api_key=${API_KEY}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.statusText}`);
  }

  return response.json();
};
