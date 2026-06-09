import React from 'react';
import { View, ScrollView, StyleSheet, Text, Image } from 'react-native';
import {
  Card,
  Button,
  Chip,
  Divider,
  Surface,
  IconButton,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF8',
  },
  header: {
    backgroundColor: '#E8692A',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerMeta: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  metaText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 6,
  },
  categoryBadge: {
    fontSize: 12,
    color: '#E8692A',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 24,
  },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  heroImage: {
    width: '100%',
    height: 220,
    backgroundColor: '#E8E8E6',
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F0',
    borderRadius: 16,
    height: 180,
    marginBottom: 20,
  },
  imagePlaceholderText: {
    color: '#4A4A4A',
    marginTop: 8,
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  ingredientesList: {
    backgroundColor: '#F2F2F0',
    borderRadius: 12,
    padding: 12,
  },
  ingredienteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  ingredienteText: {
    fontSize: 14,
    color: '#1A1A1A',
    marginLeft: 10,
    flex: 1,
  },
  modoPreparioContainer: {
    backgroundColor: '#F2F2F0',
    borderRadius: 12,
    padding: 12,
  },
  modoPreparoText: {
    fontSize: 14,
    color: '#1A1A1A',
    lineHeight: 22,
  },
  actionsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FAFAF8',
    borderTopColor: '#F2F2F0',
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    gap: 12,
  },
  editarButton: {
    flex: 1,
    backgroundColor: '#E8692A',
  },
  mapaButton: {
    flex: 1,
    backgroundColor: '#16A34A',
  },
  emptyState: {
    fontSize: 14,
    color: '#4A4A4A',
    fontStyle: 'italic',
    paddingVertical: 8,
  },
  divider: {
    marginVertical: 12,
    backgroundColor: '#E8E8E6',
  },
});

export default function ReceitaDetailScreen({ route, navigation }) {
  const receita = route.params?.receita;

  if (!receita) {
    return (
      <View style={styles.container}>
        <View style={styles.scrollContent}>
          <Text style={styles.emptyState}>Receita não encontrada</Text>
        </View>
      </View>
    );
  }

  const handleEditar = () => {
    navigation.navigate('ReceitaFormScreen', { receita });
  };

  const handleIrAoMapa = () => {
    navigation.navigate('Mapa', { receita });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerActions}>
            <IconButton
              icon="pencil"
              iconColor="#FFFFFF"
              size={20}
              onPress={handleEditar}
            />
          </View>

          <Text style={styles.headerTitle} numberOfLines={3}>
            {receita.nome}
          </Text>

          <View style={styles.headerMeta}>
            <Text style={styles.categoryBadge}>{receita.categoria}</Text>

            <View style={styles.metaItem}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={16}
                color="#FFFFFF"
              />
              <Text style={styles.metaText}>{receita.tempoPreparo} min</Text>
            </View>
          </View>
        </View>

        {/* Conteúdo */}
        <View style={styles.scrollContent}>
          {receita.foto ? (
            <View style={styles.imageContainer}>
              <Image source={{ uri: receita.foto }} style={styles.heroImage} />
            </View>
          ) : (
            <View style={styles.imagePlaceholder}>
              <MaterialCommunityIcons
                name="image-outline"
                size={36}
                color="#B0B0AC"
              />
              <Text style={styles.imagePlaceholderText}>
                Sem imagem cadastrada
              </Text>
            </View>
          )}

          {/* Ingredientes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              📋 Ingredientes ({receita.ingredientes?.length || 0})
            </Text>

            <View style={styles.ingredientesList}>
              {receita.ingredientes && receita.ingredientes.length > 0 ? (
                receita.ingredientes.map((ingrediente, index) => (
                  <View key={index}>
                    <View style={styles.ingredienteItem}>
                      <MaterialCommunityIcons
                        name="check-circle"
                        size={18}
                        color="#16A34A"
                      />
                      <Text style={styles.ingredienteText}>{ingrediente}</Text>
                    </View>
                    {index < receita.ingredientes.length - 1 && (
                      <Divider style={styles.divider} />
                    )}
                  </View>
                ))
              ) : (
                <Text style={styles.emptyState}>
                  Nenhum ingrediente adicionado
                </Text>
              )}
            </View>
          </View>

          {/* Modo de Preparo */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>👨‍🍳 Modo de Preparo</Text>

            <View style={styles.modoPreparioContainer}>
              <Text style={styles.modoPreparoText}>
                {receita.modoPreparo || 'Nenhuma instrução adicionada'}
              </Text>
            </View>
          </View>

          {/* Espaço para botões flutuantes */}
          <View style={{ height: 80 }} />
        </View>
      </ScrollView>

      {/* Botões de Ação Flutuantes */}
      <View style={styles.actionsContainer}>
        <Button
          mode="contained"
          onPress={handleEditar}
          style={styles.editarButton}
          buttonColor="#E8692A"
          icon="pencil"
        >
          Editar
        </Button>

        <Button
          mode="contained"
          onPress={handleIrAoMapa}
          style={styles.mapaButton}
          buttonColor="#16A34A"
          icon="map"
        >
          Mapa
        </Button>
      </View>
    </View>
  );
}
