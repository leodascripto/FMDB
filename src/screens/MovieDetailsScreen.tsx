import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { getMovieDetails, MovieDetails, getImageUrl } from '../services/api';

type RootStackParamList = {
  Home: undefined;
  MovieDetails: { movieId: number };
};

type MovieDetailsScreenRouteProp = RouteProp<RootStackParamList, 'MovieDetails'>;

type Props = {
  route: MovieDetailsScreenRouteProp;
};

const { width } = Dimensions.get('window');

const MovieDetailsScreen: React.FC<Props> = ({ route }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMovieDetails();
  }, [movieId]);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const data = await getMovieDetails(movieId);
      if (data) {
        setMovie(data);
        setError(null);
      } else {
        setError('Não foi possível carregar os detalhes do filme.');
      }
    } catch (err) {
      console.error('Error fetching movie details:', err);
      setError('Falha ao buscar detalhes do filme. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Data desconhecida';
    
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        {/* Use a numeric value for size instead of "large" */}
        <ActivityIndicator size={40} color="#0085CA" />
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          {error || 'Não foi possível carregar os detalhes do filme.'}
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchMovieDetails}>
          <Text style={styles.retryText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: getImageUrl(movie.poster_path) }}
        style={styles.poster}
        resizeMode="contain"
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.releaseDate}>
            Data de Lançamento: {formatDate(movie.release_date)}
          </Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
          </View>
        </View>
        
        {movie.genres && (
          <View style={styles.genresContainer}>
            {movie.genres.map((genre) => (
              <View key={genre.id} style={styles.genreBadge}>
                <Text style={styles.genreText}>{genre.name}</Text>
              </View>
            ))}
          </View>
        )}
        
        <Text style={styles.sectionTitle}>Sinopse</Text>
        <Text style={styles.overview}>{movie.overview || 'Sinopse indisponível'}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001B36',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#001B36',
  },
  poster: {
    width: width,
    height: width * 1.5,
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  releaseDate: {
    fontSize: 14,
    color: '#0085CA',
  },
  ratingContainer: {
    backgroundColor: '#0085CA',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  rating: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  genreBadge: {
    backgroundColor: '#002B50',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  overview: {
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  errorText: {
    color: '#FF6B6B',
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
  },
  retryButton: {
    backgroundColor: '#0085CA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default MovieDetailsScreen;