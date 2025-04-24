import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import MovieDetailsScreen from './src/screens/MovieDetailsScreen';
import { Image } from 'react-native';

// Define the type for the stack navigator
type RootStackParamList = {
  Home: undefined;
  MovieDetails: { movieId: number };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
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
          options={({ route }) => ({ 
            title: 'Movie Details',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}