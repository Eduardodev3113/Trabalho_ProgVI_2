import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

const theme = {
  colors: {
    primary: '#E8692A',
    accent: '#E8692A',
    background: '#FAFAF8',
    surface: '#F2F2F0',
    text: '#1A1A1A',
    onSurface: '#1A1A1A',
    success: '#16A34A',
  },
  roundness: 12,
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
