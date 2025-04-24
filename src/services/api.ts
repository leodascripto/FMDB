import axios from 'axios';

const API_KEY = '4d5edd1982368f425a3105e6848659ed';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;
  vote_count: number;
  tagline?: string;
}

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR',
  },
});

// Get a list of popular movies
export const getPopularMovies = async (): Promise<Movie[]> => {
  try {
    const response = await api.get('/movie/popular');
    console.log('API Response:', response.status);
    return response.data.results || [];
  } catch (error) {
    console.error('Error details:', error);
    return [];
  }
};

// Get details for a specific movie by ID
export const getMovieDetails = async (movieId: number): Promise<MovieDetails | null> => {
  try {
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

// Get movie poster URL with fallback
export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) {
    // Return a placeholder image URL if path is null
    return 'https://via.placeholder.com/500x750?text=No+Image';
  }
  return `${IMAGE_BASE_URL}${size}${path}`;
};
