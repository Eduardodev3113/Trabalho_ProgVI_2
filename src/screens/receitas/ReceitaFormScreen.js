import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  TextInput,
  Button,
  SegmentedButtons,
  ActivityIndicator,
  Dialog,
  Portal,
  Paragraph,
  IconButton,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  salvarReceita,
  atualizarReceita,
  deletarReceita,
} from '../../config/firebase';

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  textInput: {
    marginBottom: 12,
    backgroundColor: '#F2F2F0',
  },
  inputLabel: {
    fontSize: 12,
    color: '#4A4A4A',
    marginBottom: 4,
  },
  segmentedButtons: {
    marginBottom: 12,
  },
  ingredienteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#F2F2F0',
    borderRadius: 8,
    paddingLeft: 12,
  },
  ingredienteText: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A1A',
    paddingVertical: 12,
  },
  removeButton: {
    margin: 0,
  },
  addButton: {
    marginVertical: 8,
    backgroundColor: '#E8692A10',
  },
  addButtonLabel: {
    color: '#E8692A',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  salvarButton: {
    flex: 1,
    backgroundColor: '#E8692A',
  },
  deletarButton: {
    marginLeft: 12,
    backgroundColor: '#BA1A1A',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function ReceitaFormScreen({ route, navigation }) {
  const receita = route.params?.receita;
  const isEdicao = !!receita;

  const [nome, setNome] = useState(receita?.nome || '');
  const [categoria, setCategoria] = useState(
    receita?.categoria || 'Prato Principal'
  );
  const [tempoPreparo, setTempoPreparo] = useState(
    receita?.tempoPreparo?.toString() || ''
  );
  const [ingredientes, setIngredientes] = useState(receita?.ingredientes || []);
  const [novoIngrediente, setNovoIngrediente] = useState('');
  const [modoPreparo, setModoPreparo] = useState(receita?.modoPreparo || '');
  const [loading, setLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const categorias = [
    { label: 'Prato Principal', value: 'Prato Principal' },
    { label: 'Sobremesa', value: 'Sobremesa' },
    { label: 'Lanche', value: 'Lanche' },
    { label: 'Bebida', value: 'Bebida' },
  ];

  const validarFormulario = () => {
    if (!nome.trim()) {
      Alert.alert('Erro', 'Digite o nome da receita');
      return false;
    }
    if (!tempoPreparo.trim()) {
      Alert.alert('Erro', 'Digite o tempo de preparo');
      return false;
    }
    if (ingredientes.length === 0) {
      Alert.alert('Erro', 'Adicione pelo menos um ingrediente');
      return false;
    }
    if (!modoPreparo.trim()) {
      Alert.alert('Erro', 'Digite o modo de preparo');
      return false;
    }
    return true;
  };

  const handleSalvar = async () => {
    if (!validarFormulario()) return;

    setLoading(true);
    try {
      const dadosReceita = {
        nome: nome.trim(),
        categoria,
        tempoPreparo: parseInt(tempoPreparo),
        ingredientes,
        modoPreparo: modoPreparo.trim(),
      };

      if (isEdicao) {
        await atualizarReceita(receita.id, dadosReceita);
        Alert.alert('Sucesso', 'Receita atualizada!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        await salvarReceita(dadosReceita);
        Alert.alert('Sucesso', 'Receita criada!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar receita: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdicionarIngrediente = () => {
    if (novoIngrediente.trim()) {
      setIngredientes([...ingredientes, novoIngrediente.trim()]);
      setNovoIngrediente('');
    }
  };

  const handleRemoverIngrediente = (index) => {
    setIngredientes(ingredientes.filter((_, i) => i !== index));
  };

  const handleDeletar = async () => {
    setLoading(true);
    try {
      await deletarReceita(receita.id);
      Alert.alert('Sucesso', 'Receita deletada!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao deletar receita: ' + error.message);
    } finally {
      setLoading(false);
      setShowDeleteDialog(false);
    }
  };

  if (loading && isEdicao && !nome) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" color="#E8692A" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {isEdicao ? 'Editar Receita' : 'Nova Receita'}
          </Text>
        </View>

        {/* Seção: Informações Básicas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Básicas</Text>

          <TextInput
            label="Nome da Receita"
            value={nome}
            onChangeText={setNome}
            style={styles.textInput}
            mode="outlined"
            placeholder="Ex: Bolo de Chocolate"
            outlineColor="#F2F2F0"
            activeOutlineColor="#E8692A"
          />

          <Text style={styles.inputLabel}>Categoria</Text>
          <SegmentedButtons
            value={categoria}
            onValueChange={setCategoria}
            buttons={categorias}
            style={styles.segmentedButtons}
          />

          <TextInput
            label="Tempo de Preparo (minutos)"
            value={tempoPreparo}
            onChangeText={setTempoPreparo}
            style={styles.textInput}
            mode="outlined"
            keyboardType="number-pad"
            placeholder="Ex: 30"
            outlineColor="#F2F2F0"
            activeOutlineColor="#E8692A"
          />
        </View>

        {/* Seção: Ingredientes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredientes</Text>

          {ingredientes.map((ingrediente, index) => (
            <View key={index} style={styles.ingredienteItem}>
              <Text style={styles.ingredienteText}>
                {index + 1}. {ingrediente}
              </Text>
              <IconButton
                icon="close"
                size={20}
                onPress={() => handleRemoverIngrediente(index)}
                style={styles.removeButton}
              />
            </View>
          ))}

          <TextInput
            label="Adicionar Ingrediente"
            value={novoIngrediente}
            onChangeText={setNovoIngrediente}
            style={styles.textInput}
            mode="outlined"
            placeholder="Ex: 2 xícaras de açúcar"
            outlineColor="#F2F2F0"
            activeOutlineColor="#E8692A"
          />

          <Button
            mode="outlined"
            onPress={handleAdicionarIngrediente}
            style={styles.addButton}
            labelStyle={styles.addButtonLabel}
            icon="plus"
          >
            Adicionar Ingrediente
          </Button>
        </View>

        {/* Seção: Modo de Preparo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Modo de Preparo</Text>

          <TextInput
            label="Instruções"
            value={modoPreparo}
            onChangeText={setModoPreparo}
            style={[styles.textInput, { minHeight: 120 }]}
            mode="outlined"
            multiline
            numberOfLines={6}
            placeholder="Descreva o passo a passo..."
            outlineColor="#F2F2F0"
            activeOutlineColor="#E8692A"
          />
        </View>

        {/* Ações */}
        <View style={styles.actionsContainer}>
          <Button
            mode="contained"
            onPress={handleSalvar}
            loading={loading}
            disabled={loading}
            style={styles.salvarButton}
            buttonColor="#E8692A"
          >
            {isEdicao ? 'Atualizar' : 'Salvar'}
          </Button>

          {isEdicao && (
            <Button
              mode="contained"
              onPress={() => setShowDeleteDialog(true)}
              disabled={loading}
              style={styles.deletarButton}
              buttonColor="#BA1A1A"
            >
              Deletar
            </Button>
          )}
        </View>
      </ScrollView>

      {/* Dialog de Confirmação de Deleção */}
      <Portal>
        <Dialog
          visible={showDeleteDialog}
          onDismiss={() => setShowDeleteDialog(false)}
        >
          <Dialog.Title>Confirmar Deleção</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Tem certeza que deseja deletar esta receita? Esta ação não pode ser
              desfeita.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDeleteDialog(false)}>Cancelar</Button>
            <Button
              onPress={handleDeletar}
              textColor="#BA1A1A"
            >
              Deletar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </KeyboardAvoidingView>
  );
}
