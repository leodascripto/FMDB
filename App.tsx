import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Stack name="Home" component={HomeScreen} 
          options={{ 
            title: 'FMDB',
            headerStyle: {
              backgroundColor: '#003366',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} 
          options={{ 
            headerStyle: {
              backgroundColor: '#003366',
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}