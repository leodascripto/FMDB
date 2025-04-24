import axios from 'axios';

const API_KEY = '4d5edd1982368f425a3105e6848659ed';
const BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
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

// Get a list of popular movies
export const getPopularMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

// Get details for a specific movie by ID
export const getMovieDetails = async (movieId: number): Promise<MovieDetails | null> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=pt-BR`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

// Get movie poster URL 
export const getImageUrl = (path: string, size: string = 'w500'): string => {
  if (!path) return '';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
