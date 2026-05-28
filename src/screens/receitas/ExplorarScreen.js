import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, FlatList, Image } from 'react-native';
import {
  SegmentedButtons,
  ActivityIndicator,
  Card,
  Button,
  Snackbar,
  FAB,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { salvarReceita } from '../../config/firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF8',
  },
  header: {
    backgroundColor: '#FAFAF8',
    padding: 16,
    borderBottomColor: '#F2F2F0',
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  categoriaButtonsContainer: {
    marginBottom: 8,
  },
  content: {
    flex: 1,
    padding: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    paddingVertical: 8,
  },
  receitaCard: {
    backgroundColor: '#F2F2F0',
    borderRadius: 12,
    marginHorizontal: 4,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 0,
    borderWidth: 0,
    flex: 1,
  },
  receitaImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#E8E8E6',
  },
  receitaCardContent: {
    padding: 10,
  },
  receitaTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
    height: 36,
  },
  addButton: {
    backgroundColor: '#E8692A',
    marginTop: 6,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateIcon: {
    marginBottom: 12,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#4A4A4A',
    textAlign: 'center',
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 12,
    color: '#B0B0AC',
    textAlign: 'center',
  },
  snackbar: {
    backgroundColor: '#16A34A',
  },
});

const CATEGORIAS = [
  { label: 'Prato Principal', value: 'Seafood' },
  { label: 'Sobremesa', value: 'Dessert' },
  { label: 'Lanche', value: 'Snack' },
  { label: 'Bebida', value: 'Beverage' },
];

const IMAGENS_CATEGORIA = {
  'Prato Principal':
    'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&h=450&fit=crop',
  'Sobremesa':
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=450&fit=crop',
  'Lanche':
    'https://images.unsplash.com/photo-1618449840665-9ed506d73a34?w=800&h=450&fit=crop',
  'Bebida':
    'https://images.unsplash.com/photo-1497636577773-f1231844b47b?w=800&h=450&fit=crop',
};

export default function ExplorarScreen() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Seafood');
  const [receitas, setReceitas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    buscarReceitas(categoriaAtiva);
  }, [categoriaAtiva]);

  const buscarReceitas = async (categoria) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`
      );
      const data = await response.json();
      const meals = data.meals || [];
      setReceitas(meals.slice(0, 12));
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
      setSnackbarMessage('Erro ao buscar receitas');
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAdicionarReceita = async (receita) => {
    try {
      const categoriaLabel = CATEGORIAS.find(
        (c) => c.value === categoriaAtiva
      )?.label;

      await salvarReceita({
        nome: receita.strMeal,
        categoria: categoriaLabel || 'Outro',
        tempoPreparo: 30,
        ingredientes: ['Receita do TheMealDB'],
        modoPreparo:
          'Busque a receita completa em https://www.themealdb.com/',
        foto: receita.strMealThumb,
      });

      setSnackbarMessage(`"${receita.strMeal}" adicionada com sucesso!`);
      setSnackbarVisible(true);
    } catch (error) {
      console.error('Erro ao adicionar receita:', error);
      setSnackbarMessage('Erro ao adicionar receita');
      setSnackbarVisible(true);
    }
  };

  const categoriaSelecionada = CATEGORIAS.find(
    (c) => c.value === categoriaAtiva
  )?.label;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explorar Receitas</Text>

        <SegmentedButtons
          value={categoriaAtiva}
          onValueChange={setCategoriaAtiva}
          buttons={CATEGORIAS}
          style={styles.categoriaButtonsContainer}
        />
      </View>

      {/* Conteúdo */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating={true} size="large" color="#E8692A" />
        </View>
      ) : receitas.length > 0 ? (
        <FlatList
          data={receitas}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          style={styles.gridContainer}
          contentContainerStyle={styles.content}
          renderItem={({ item }) => (
            <Card style={[styles.receitaCard, { maxWidth: '48%' }]}>
              <Image
                source={{ uri: item.strMealThumb }}
                style={styles.receitaImage}
              />
              <View style={styles.receitaCardContent}>
                <Text style={styles.receitaTitle} numberOfLines={2}>
                  {item.strMeal}
                </Text>
                <Button
                  mode="contained"
                  onPress={() => handleAdicionarReceita(item)}
                  style={styles.addButton}
                  buttonColor="#E8692A"
                  icon="plus"
                  compact
                >
                  Adicionar
                </Button>
              </View>
            </Card>
          )}
        />
      ) : (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons
            name="magnify"
            size={48}
            color="#B0B0AC"
            style={styles.emptyStateIcon}
          />
          <Text style={styles.emptyStateText}>Nenhuma receita encontrada</Text>
          <Text style={styles.emptyStateSubtext}>
            Tente selecionado outra categoria
          </Text>
        </View>
      )}

      {/* Snackbar */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
        style={styles.snackbar}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
}
