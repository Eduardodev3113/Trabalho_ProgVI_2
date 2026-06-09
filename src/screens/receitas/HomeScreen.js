import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, Image } from 'react-native';
import { Card, Title, Paragraph, FAB } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { listarReceitas, isFirebaseReady } from '../../config/firebase';

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
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 0,
    borderWidth: 0,
  },
  heroImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#E8E8E6',
  },
  heroContent: {
    padding: 16,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 13,
    color: '#4A4A4A',
    lineHeight: 20,
    marginBottom: 10,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8692A10',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 10,
  },
  statusText: {
    color: '#E8692A',
    fontSize: 12,
    fontWeight: '700',
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
    padding: 12,
  },
  receitaImage: {
    width: '100%',
    height: 110,
    backgroundColor: '#E8E8E6',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
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
  const [receitas, setReceitas] = useState([]);
  const [receitasRecentes, setReceitasRecentes] = useState([]);
  const [firebaseStatus, setFirebaseStatus] = useState(isFirebaseReady());

  useEffect(() => {
    setFirebaseStatus(isFirebaseReady());

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
        <Card style={styles.heroCard}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
            }}
            style={styles.heroImage}
          />
          <View style={styles.heroContent}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>
                {firebaseStatus ? 'Conectado ao Firebase' : 'Modo local'}
              </Text>
            </View>
            <Title style={styles.heroTitle}>ChefNote</Title>
            <Paragraph style={styles.heroSubtitle}>
              Organize suas receitas, acompanhe as mais recentes e encontre
              sugestões rápidas para cada momento.
            </Paragraph>
          </View>
        </Card>

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
                {receita.foto ? (
                  <Image source={{ uri: receita.foto }} style={styles.receitaImage} />
                ) : null}
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
