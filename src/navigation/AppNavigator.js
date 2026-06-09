import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Telas
import HomeScreen from '../screens/receitas/HomeScreen';
import ReceitaListScreen from '../screens/receitas/ReceitaListScreen';
import ReceitaDetailScreen from '../screens/receitas/ReceitaDetailScreen';
import ReceitaFormScreen from '../screens/receitas/ReceitaFormScreen';
import MapaScreen from '../screens/receitas/MapaScreen';
import ExplorarScreen from '../screens/receitas/ExplorarScreen';
import SobreScreen from '../screens/receitas/SobreScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack para a aba Receitas (List → Detail → Form)
function ReceitasStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#FAFAF8',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: '#1A1A1A',
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen
        name="ReceitaListScreen"
        component={ReceitaListScreen}
        options={{ title: 'Minhas Receitas' }}
      />
      <Stack.Screen
        name="ReceitaDetailScreen"
        component={ReceitaDetailScreen}
        options={{ title: 'Detalhes da Receita' }}
      />
      <Stack.Screen
        name="ReceitaFormScreen"
        component={ReceitaFormScreen}
        options={{ title: 'Nova Receita' }}
      />
    </Stack.Navigator>
  );
}

// Navegador principal com Bottom Tabs
export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Receitas') {
            iconName = focused ? 'chef-hat' : 'chef-hat';
          } else if (route.name === 'Mapa') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Explorar') {
            iconName = focused ? 'compass' : 'compass-outline';
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: '#E8692A',
        tabBarInactiveTintColor: '#B0B0AC',
        tabBarStyle: {
          backgroundColor: '#FAFAF8',
          borderTopColor: '#F2F2F0',
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginBottom: 2,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Início' }}
      />
      <Tab.Screen
        name="Receitas"
        component={ReceitasStack}
        options={{ title: 'Receitas' }}
      />
      <Tab.Screen
        name="Mapa"
        component={MapaScreen}
        options={{ title: 'Mapa' }}
      />
      <Tab.Screen
        name="Explorar"
        component={ExplorarScreen}
        options={{ title: 'Explorar' }}
      />
      <Tab.Screen
        name="Sobre"
        component={SobreScreen}
        options={{ title: 'Sobre' }}
      />
    </Tab.Navigator>
  );
}
