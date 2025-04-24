import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getPopularMovies, Movie, getImageUrl } from '../services/api';

type RootStackParamList = {
  Home: undefined;
  MovieDetails: { movieId: number };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await getPopularMovies();
        setMovies(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: getImageUrl(item.poster_path) }}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.releaseDate}>
          {new Date(item.release_date).getFullYear()}
        </Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>
            {item.vote_average.toFixed(1)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0085CA" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
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
  list: {
    padding: 10,
  },
  movieItem: {
    flex: 1,
    margin: 8,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#002B50',
    height: 280,
  },
  poster: {
    width: '100%',
    height: 200,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 4,
  },
  releaseDate: {
    fontSize: 12,
    color: '#0085CA',
    marginBottom: 4,
  },
  ratingContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#0085CA',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rating: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF6B6B',
    textAlign: 'center',
    padding: 20,
  },
});

export default HomeScreen;
