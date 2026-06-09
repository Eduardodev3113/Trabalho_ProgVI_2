import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, FlatList, Image } from 'react-native';
import {
  Card,
  Searchbar,
  FAB,
  Chip,
  ActivityIndicator,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { listarReceitas } from '../../config/firebase';

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
  searchbar: {
    marginBottom: 12,
    backgroundColor: '#F2F2F0',
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 0,
    marginHorizontal: -8,
  },
  filterChip: {
    marginHorizontal: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  receitaCard: {
    backgroundColor: '#F2F2F0',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 0,
    borderWidth: 0,
  },
  receitaCardContent: {
    padding: 12,
  },
  receitaImage: {
    width: '100%',
    height: 110,
    backgroundColor: '#E8E8E6',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  receitaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  receitaTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 1,
  },
  receitaCategory: {
    fontSize: 12,
    backgroundColor: '#E8692A20',
    color: '#E8692A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  receitaMeta: {
    fontSize: 12,
    color: '#4A4A4A',
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
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
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function ReceitaListScreen({ navigation }) {
  const [receitas, setReceitas] = useState([]);
  const [filtradas, setFiltradas] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState(null);
  const [loading, setLoading] = useState(true);

  const categorias = ['Prato Principal', 'Sobremesa', 'Lanche', 'Bebida'];

  useEffect(() => {
    const unsubscribe = listarReceitas((dados) => {
      setReceitas(dados);
      setLoading(false);
      aplicarFiltros(dados, searchQuery, categoriaFiltro);
    });

    return () => unsubscribe();
  }, []);

  const aplicarFiltros = (dados, busca, categoria) => {
    let resultado = dados;

    if (busca) {
      resultado = resultado.filter((receita) =>
        receita.nome.toLowerCase().includes(busca.toLowerCase())
      );
    }

    if (categoria) {
      resultado = resultado.filter(
        (receita) => receita.categoria === categoria
      );
    }

    setFiltradas(resultado);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    aplicarFiltros(receitas, query, categoriaFiltro);
  };

  const handleFiltro = (categoria) => {
    const novoFiltro = categoriaFiltro === categoria ? null : categoria;
    setCategoriaFiltro(novoFiltro);
    aplicarFiltros(receitas, searchQuery, novoFiltro);
  };

  const handleAdicionarReceita = () => {
    navigation.navigate('ReceitaFormScreen', { receita: null });
  };

  const handleVerDetalhes = (receita) => {
    navigation.navigate('ReceitaDetailScreen', { receita });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" color="#E8692A" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header com Searchbar e Filtros */}
      <View style={styles.header}>
        <Searchbar
          placeholder="Buscar receitas..."
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchbar}
          placeholderTextColor="#B0B0AC"
          iconColor="#E8692A"
        />

        {/* Filtros por Categoria */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
        >
          {categorias.map((cat) => (
            <Chip
              key={cat}
              selected={categoriaFiltro === cat}
              onPress={() => handleFiltro(cat)}
              style={styles.filterChip}
              mode="outlined"
              selectedColor="#E8692A"
            >
              {cat}
            </Chip>
          ))}
        </ScrollView>
      </View>

      {/* Lista de Receitas */}
      <View style={styles.content}>
        {filtradas.length > 0 ? (
          <FlatList
            data={filtradas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card
                style={styles.receitaCard}
                onPress={() => handleVerDetalhes(item)}
              >
                {item.foto ? (
                  <Image source={{ uri: item.foto }} style={styles.receitaImage} />
                ) : null}
                <View style={styles.receitaCardContent}>
                  <View style={styles.receitaHeader}>
                    <Text style={styles.receitaTitle} numberOfLines={2}>
                      {item.nome}
                    </Text>
                    <Text style={styles.receitaCategory}>
                      {item.categoria}
                    </Text>
                  </View>
                  <Text style={styles.receitaMeta}>
                    ⏱️ {item.tempoPreparo} min
                  </Text>
                  <Text style={styles.receitaMeta}>
                    📝 {item.ingredientes?.length || 0} ingrediente
                    {item.ingredientes?.length !== 1 ? 's' : ''}
                  </Text>
                </View>
              </Card>
            )}
            scrollEnabled={false}
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
              {searchQuery
                ? 'Tente outro termo de busca'
                : 'Crie sua primeira receita'}
            </Text>
          </View>
        )}
      </View>

      {/* FAB para adicionar receita */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={handleAdicionarReceita}
        color="#FFFFFF"
        backgroundColor="#E8692A"
      />
    </View>
  );
}
