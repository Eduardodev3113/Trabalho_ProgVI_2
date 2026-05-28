import React from 'react';
import { View, ScrollView, StyleSheet, Text, Linking } from 'react-native';
import { Card, Button, Divider, List } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 24,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8692A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  appSlogan: {
    fontSize: 14,
    color: '#4A4A4A',
    marginBottom: 2,
  },
  version: {
    fontSize: 12,
    color: '#B0B0AC',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#F2F2F0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 0,
    borderWidth: 0,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 13,
    color: '#4A4A4A',
    lineHeight: 20,
    marginBottom: 12,
  },
  featureList: {
    marginLeft: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  featureIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  featureText: {
    fontSize: 13,
    color: '#1A1A1A',
    flex: 1,
  },
  studentCard: {
    backgroundColor: '#F2F2F0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 0,
    borderWidth: 0,
  },
  studentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  studentAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E8692A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  studentRole: {
    fontSize: 12,
    color: '#4A4A4A',
    marginTop: 2,
  },
  divider: {
    marginVertical: 12,
    backgroundColor: '#E8E8E6',
  },
  creditsList: {
    marginTop: 8,
  },
  creditsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 8,
  },
  creditsText: {
    fontSize: 13,
    color: '#4A4A4A',
    marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  buttonLink: {
    flex: 1,
    backgroundColor: '#E8692A10',
  },
  buttonLinkLabel: {
    color: '#E8692A',
  },
});

export default function SobreScreen() {
  const handleOpenLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error('Erro ao abrir link:', err)
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logo}>
            <MaterialCommunityIcons
              name="chef-hat"
              size={40}
              color="#FFFFFF"
            />
          </View>
          <Text style={styles.appName}>ChefNote</Text>
          <Text style={styles.appSlogan}>Organize suas receitas favoritas</Text>
          <Text style={styles.version}>Versão 1.0.0</Text>
        </View>

        {/* Sobre o App */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📱 Sobre o App</Text>

          <View style={styles.card}>
            <Text style={styles.cardDescription}>
              ChefNote é um aplicativo mobile desenvolvido em React Native que
              permite cadastrar, organizar e compartilhar suas receitas favoritas,
              além de encontrar mercados e restaurantes próximos.
            </Text>

            <Text style={styles.cardTitle}>Funcionalidades Principais:</Text>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <MaterialCommunityIcons
                  name="check-circle"
                  size={16}
                  color="#16A34A"
                  style={styles.featureIcon}
                />
                <Text style={styles.featureText}>
                  Cadastro completo de receitas (CRUD)
                </Text>
              </View>

              <View style={styles.featureItem}>
                <MaterialCommunityIcons
                  name="check-circle"
                  size={16}
                  color="#16A34A"
                  style={styles.featureIcon}
                />
                <Text style={styles.featureText}>
                  Busca e filtros por categoria
                </Text>
              </View>

              <View style={styles.featureItem}>
                <MaterialCommunityIcons
                  name="check-circle"
                  size={16}
                  color="#16A34A"
                  style={styles.featureIcon}
                />
                <Text style={styles.featureText}>
                  Mapa com mercados e restaurantes próximos
                </Text>
              </View>

              <View style={styles.featureItem}>
                <MaterialCommunityIcons
                  name="check-circle"
                  size={16}
                  color="#16A34A"
                  style={styles.featureIcon}
                />
                <Text style={styles.featureText}>
                  Explorador de receitas com API TheMealDB
                </Text>
              </View>

              <View style={styles.featureItem}>
                <MaterialCommunityIcons
                  name="check-circle"
                  size={16}
                  color="#16A34A"
                  style={styles.featureIcon}
                />
                <Text style={styles.featureText}>
                  Sincronização com Firebase Firestore
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Informações do Desenvolvedor */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👨‍💻 Desenvolvedor</Text>

          <View style={styles.studentCard}>
            <View style={styles.studentHeader}>
              <View style={styles.studentAvatar}>
                <MaterialCommunityIcons
                  name="account"
                  size={32}
                  color="#FFFFFF"
                />
              </View>
              <View style={styles.studentInfo}>
                <Text style={styles.studentName}>Eduardo Festugatto</Text>
                <Text style={styles.studentRole}>
                  Aluno de Programação Mobile
                </Text>
              </View>
            </View>

            <Divider style={styles.divider} />

            <Text style={styles.cardDescription}>
              Desenvolvido como projeto prático na disciplina de Programação
              Mobile, aplicando conceitos de React Native, Firebase e APIs
              externas.
            </Text>
          </View>
        </View>

        {/* Tecnologias Utilizadas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🛠️ Tecnologias</Text>

          <View style={styles.card}>
            <View style={styles.creditsList}>
              <View style={styles.creditsItem}>
                <MaterialCommunityIcons
                  name="react"
                  size={18}
                  color="#E8692A"
                />
                <Text style={styles.creditsText}>React Native & Expo</Text>
              </View>

              <View style={styles.creditsItem}>
                <MaterialCommunityIcons
                  name="database"
                  size={18}
                  color="#E8692A"
                />
                <Text style={styles.creditsText}>Firebase Firestore</Text>
              </View>

              <View style={styles.creditsItem}>
                <MaterialCommunityIcons
                  name="map"
                  size={18}
                  color="#E8692A"
                />
                <Text style={styles.creditsText}>React Native Maps</Text>
              </View>

              <View style={styles.creditsItem}>
                <MaterialCommunityIcons
                  name="palette"
                  size={18}
                  color="#E8692A"
                />
                <Text style={styles.creditsText}>React Native Paper</Text>
              </View>

              <View style={styles.creditsItem}>
                <MaterialCommunityIcons
                  name="api"
                  size={18}
                  color="#E8692A"
                />
                <Text style={styles.creditsText}>TheMealDB API</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Links Úteis */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔗 Links</Text>

          <View style={styles.card}>
            <View style={styles.buttonContainer}>
              <Button
                mode="outlined"
                onPress={() =>
                  handleOpenLink(
                    'https://www.themealdb.com/'
                  )
                }
                style={styles.buttonLink}
                labelStyle={styles.buttonLinkLabel}
                icon="link"
              >
                TheMealDB
              </Button>

              <Button
                mode="outlined"
                onPress={() =>
                  handleOpenLink('https://reactnative.dev/')
                }
                style={styles.buttonLink}
                labelStyle={styles.buttonLinkLabel}
                icon="link"
              >
                React Native
              </Button>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                mode="outlined"
                onPress={() =>
                  handleOpenLink(
                    'https://callstack.github.io/react-native-paper/'
                  )
                }
                style={styles.buttonLink}
                labelStyle={styles.buttonLinkLabel}
                icon="link"
              >
                Paper
              </Button>

              <Button
                mode="outlined"
                onPress={() =>
                  handleOpenLink('https://firebase.google.com/')
                }
                style={styles.buttonLink}
                labelStyle={styles.buttonLinkLabel}
                icon="link"
              >
                Firebase
              </Button>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={{ alignItems: 'center', marginVertical: 24 }}>
          <Text style={{ fontSize: 12, color: '#B0B0AC' }}>
            © 2024 ChefNote. Todos os direitos reservados.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
