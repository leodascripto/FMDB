import 'react-native-gesture-handler'; // Must be first import
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Image, View, ActivityIndicator } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import MovieDetailsScreen from './src/screens/MovieDetailsScreen';

// Define the type for the stack navigator
type RootStackParamList = {
  Home: undefined;
  MovieDetails: { movieId: number };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a loading delay
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  // Show loading indicator while resources load
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#001B36' }}>
        <Image 
          source={require('./assets/img/logo.png')} 
          style={{ width: 100, height: 100, marginBottom: 20 }} 
        />
        <ActivityIndicator size={40} color="#0085CA" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#001B36',
          },
          headerTintColor: '#0085CA',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            title: 'FMDB',
            headerTitle: () => (
              <Image 
                source={require('./assets/img/logo.png')} 
                style={{ width: 40, height: 40 }} 
              />
            ),
          }}
        />
        <Stack.Screen 
          name="MovieDetails" 
          component={MovieDetailsScreen} 
          options={{ 
            title: 'Movie Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}