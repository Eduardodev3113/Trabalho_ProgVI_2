import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { ActivityIndicator, Button, Chip, FAB } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF8',
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAF8',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    zIndex: 10,
    borderBottomColor: '#F2F2F0',
    borderBottomWidth: 1,
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  legendContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  markerCallout: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  markerCalloutTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  markerCalloutDistance: {
    fontSize: 11,
    color: '#4A4A4A',
    marginTop: 4,
  },
});

// Dados fictícios de mercados e restaurantes próximos
const LOCAIS_PROXIMOS = [
  {
    id: 1,
    nome: 'Mercado do João',
    tipo: 'mercado',
    latitude: -23.5505,
    longitude: -46.6333,
    distancia: 0.8,
  },
  {
    id: 2,
    nome: 'Restaurante Sabor',
    tipo: 'restaurante',
    latitude: -23.5515,
    longitude: -46.6343,
    distancia: 1.2,
  },
  {
    id: 3,
    nome: 'Mercado Central',
    tipo: 'mercado',
    latitude: -23.5495,
    longitude: -46.6323,
    distancia: 0.5,
  },
  {
    id: 4,
    nome: 'Restaurante Delícia',
    tipo: 'restaurante',
    latitude: -23.5525,
    longitude: -46.6353,
    distancia: 1.5,
  },
  {
    id: 5,
    nome: 'Mercado Express',
    tipo: 'mercado',
    latitude: -23.5485,
    longitude: -46.6313,
    distancia: 1.1,
  },
];

const MAP_STYLE = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#ebe3cd' }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#523735' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#f5f1e6' }],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#c9b2a6' }],
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry.stroke',
    stylers: [{ weight: 1.3 }, { color: '#d3ccc0' }],
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry.stroke',
    stylers: [{ weight: 1 }, { color: '#cccccc' }],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [{ color: '#f0e8d8' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [{ color: '#f5f1e6' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#d7ccc8' }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.fill',
    stylers: [{ color: '#fdfcf8' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [{ color: '#b9d3c2' }],
  },
];

export default function MapaScreen({ route }) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [raioKm, setRaioKm] = useState(2);
  const [filtroTipo, setFiltroTipo] = useState('todos');

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permissão Negada',
            'É necessário acessar sua localização para usar o mapa'
          );
          setLocation({
            latitude: -23.5505,
            longitude: -46.6333,
          });
          setLoading(false);
          return;
        }

        const userLocation = await Location.getCurrentPositionAsync({});
        setLocation(userLocation.coords);
      } catch (error) {
        console.error('Erro ao obter localização:', error);
        setLocation({
          latitude: -23.5505,
          longitude: -46.6333,
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const locaisFiltrados = LOCAIS_PROXIMOS.filter((local) => {
    if (filtroTipo === 'todos') return true;
    return local.tipo === filtroTipo;
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" color="#E8692A" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          customMapStyle={MAP_STYLE}
        >
          {/* Círculo de raio ao redor do usuário */}
          <Circle
            center={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            radius={raioKm * 1000}
            fillColor="rgba(232, 105, 42, 0.1)"
            strokeColor="rgba(232, 105, 42, 0.3)"
            strokeWidth={2}
          />

          {/* Marcador do usuário */}
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Sua Localização"
            pinColor="#E8692A"
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#E8692A',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 3,
                borderColor: '#FFFFFF',
              }}
            >
              <MaterialCommunityIcons
                name="navigation"
                size={20}
                color="#FFFFFF"
              />
            </View>
          </Marker>

          {/* Marcadores de mercados e restaurantes */}
          {locaisFiltrados.map((local) => (
            <Marker
              key={local.id}
              coordinate={{
                latitude: local.latitude,
                longitude: local.longitude,
              }}
              title={local.nome}
              pinColor={local.tipo === 'mercado' ? '#16A34A' : '#E8692A'}
            >
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor:
                    local.tipo === 'mercado' ? '#16A34A' : '#E8692A',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 2,
                  borderColor: '#FFFFFF',
                }}
              >
                <MaterialCommunityIcons
                  name={local.tipo === 'mercado' ? 'store' : 'silverware-fork-knife'}
                  size={18}
                  color="#FFFFFF"
                />
              </View>
            </Marker>
          ))}
        </MapView>
      )}

      {/* Header com Controles */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Encontre Mercados e Restaurantes</Text>

        <View style={styles.legendContainer}>
          <Chip
            selected={filtroTipo === 'todos'}
            onPress={() => setFiltroTipo('todos')}
            mode="outlined"
            icon="map-marker-multiple"
          >
            Todos
          </Chip>

          <Chip
            selected={filtroTipo === 'mercado'}
            onPress={() => setFiltroTipo('mercado')}
            mode="outlined"
            icon="store"
            textStyle={{ color: '#16A34A' }}
          >
            Mercados
          </Chip>

          <Chip
            selected={filtroTipo === 'restaurante'}
            onPress={() => setFiltroTipo('restaurante')}
            mode="outlined"
            icon="silverware-fork-knife"
            textStyle={{ color: '#E8692A' }}
          >
            Restaurantes
          </Chip>
        </View>
      </View>

      {/* FAB para centralizar no usuário */}
      <FAB
        style={styles.fab}
        small
        icon="crosshairs-gps"
        onPress={() => {
          if (location) {
            setLocation(location);
          }
        }}
        color="#FFFFFF"
        backgroundColor="#E8692A"
      />
    </View>
  );
}
