import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Card, Title, Paragraph, Button, FAB, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { listarReceitas } from '../../config/firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF8',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#4A4A4A',
  },
  cardsContainer: {
    marginBottom: 28,
  },
  cardAction: {
    backgroundColor: '#F2F2F0',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 0,
    borderWidth: 0,
  },
  cardActionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  cardActionLeft: {
    flex: 1,
  },
  cardActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  cardActionDesc: {
    fontSize: 12,
    color: '#4A4A4A',
  },
  cardActionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
    marginTop: 8,
  },
  receitasContainer: {
    marginBottom: 16,
  },
  receitaCard: {
    backgroundColor: '#F2F2F0',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 0,
    borderWidth: 0,
  },
  receitaCardContent: {
    paddingVertical: 12,
  },
  receitaTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  receitaMeta: {
    fontSize: 12,
    color: '#4A4A4A',
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyStateIcon: {
    marginBottom: 12,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#4A4A4A',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 80,
  },
});

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const [receitas, setReceitas] = useState([]);
  const [receitasRecentes, setReceitasRecentes] = useState([]);

  useEffect(() => {
    const unsubscribe = listarReceitas((dados) => {
      setReceitas(dados);
      setReceitasRecentes(dados.slice(0, 3));
    });

    return () => unsubscribe();
  }, []);

  const handleActionCard = (destination) => {
    navigation.navigate(destination);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Title style={styles.headerTitle}>Bem-vindo ao ChefNote</Title>
          <Paragraph style={styles.headerSubtitle}>
            Organize suas receitas favoritas
          </Paragraph>
        </View>

        {/* Cards de Ação */}
        <View style={styles.cardsContainer}>
          <Card
            style={styles.cardAction}
            onPress={() => handleActionCard('Receitas')}
          >
            <View style={styles.cardActionContent}>
              <View style={styles.cardActionLeft}>
                <Text style={styles.cardActionTitle}>Minhas Receitas</Text>
                <Text style={styles.cardActionDesc}>
                  {receitas.length} receita{receitas.length !== 1 ? 's' : ''}
                </Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="#E8692A"
                style={styles.cardActionIcon}
              />
            </View>
          </Card>

          <Card
            style={styles.cardAction}
            onPress={() => handleActionCard('Explorar')}
          >
            <View style={styles.cardActionContent}>
              <View style={styles.cardActionLeft}>
                <Text style={styles.cardActionTitle}>Explorar</Text>
                <Text style={styles.cardActionDesc}>
                  Descubra novas receitas
                </Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="#E8692A"
                style={styles.cardActionIcon}
              />
            </View>
          </Card>

          <Card
            style={styles.cardAction}
            onPress={() => handleActionCard('Mapa')}
          >
            <View style={styles.cardActionContent}>
              <View style={styles.cardActionLeft}>
                <Text style={styles.cardActionTitle}>Encontrar Mercados</Text>
                <Text style={styles.cardActionDesc}>Locais próximos a você</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="#E8692A"
                style={styles.cardActionIcon}
              />
            </View>
          </Card>
        </View>

        {/* Receitas Recentes */}
        {receitasRecentes.length > 0 && (
          <View style={styles.receitasContainer}>
            <Text style={styles.sectionTitle}>Receitas Recentes</Text>
            {receitasRecentes.map((receita) => (
              <Card
                key={receita.id}
                style={styles.receitaCard}
                onPress={() =>
                  navigation.navigate('Receitas', {
                    screen: 'ReceitaDetailScreen',
                    params: { receita },
                  })
                }
              >
                <View style={styles.receitaCardContent}>
                  <Text style={styles.receitaTitle}>{receita.nome}</Text>
                  <Text style={styles.receitaMeta}>
                    {receita.categoria} • {receita.tempoPreparo} min
                  </Text>
                </View>
              </Card>
            ))}
          </View>
        )}

        {receitasRecentes.length === 0 && (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="chef-hat"
              size={48}
              color="#B0B0AC"
              style={styles.emptyStateIcon}
            />
            <Text style={styles.emptyStateText}>
              Nenhuma receita ainda.{'\n'}Comece adicionando uma nova!
            </Text>
          </View>
        )}
      </ScrollView>

      {/* FAB para nova receita */}
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() =>
          navigation.navigate('Receitas', {
            screen: 'ReceitaFormScreen',
          })
        }
        color="#FFFFFF"
        backgroundColor="#E8692A"
      />
    </View>
  );
}
