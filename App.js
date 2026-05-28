import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';

// ─── Tema global do ChefNote ───────────────────────────────────────────────
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,

    // Cor primária: laranja ChefNote
    primary: '#E8692A',
    onPrimary: '#FFFFFF',
    primaryContainer: '#FFE5D6',
    onPrimaryContainer: '#4A1A00',

    // Secundária
    secondary: '#16A34A',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#D4F5E1',
    onSecondaryContainer: '#003915',

    // Superfícies
    background: '#FAFAF8',
    onBackground: '#1A1A1A',
    surface: '#FAFAF8',
    onSurface: '#1A1A1A',
    surfaceVariant: '#F2F2F0',
    onSurfaceVariant: '#4A4A4A',

    // Outros
    outline: '#D0D0CE',
    error: '#BA1A1A',
    onError: '#FFFFFF',
  },
  roundness: 3, // 3 × 4px = 12px de border radius nos componentes Paper
};

// ─── Raiz do aplicativo ────────────────────────────────────────────────────
export default function App() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar style="dark" backgroundColor="#FAFAF8" />
      <AppNavigator />
    </PaperProvider>
  );
}
