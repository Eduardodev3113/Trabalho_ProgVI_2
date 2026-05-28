// Mock Firebase para desenvolvimento no Snack
// Para produção, substitua com credenciais reais do Firebase

let mockDatabase = [];
let listeners = [];

// Mock functions que simulam Firebase
export const salvarReceita = async (receita) => {
  try {
    const novaReceita = {
      id: Math.random().toString(36).substr(2, 9),
      ...receita,
      criadoEm: new Date(),
    };
    mockDatabase.push(novaReceita);
    notifyListeners();
    return novaReceita.id;
  } catch (error) {
    console.error('Erro ao salvar receita:', error);
    throw error;
  }
};

export const listarReceitas = (callback) => {
  // Retorna um unsubscribe function
  const listener = callback;
  listeners.push(listener);

  // Chama imediatamente com dados atuais
  const sorted = [...mockDatabase].sort(
    (a, b) => new Date(b.criadoEm) - new Date(a.criadoEm)
  );
  callback(sorted);

  // Retorna função para desinscrever
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};

export const buscarReceitaPorId = async (id) => {
  try {
    const receita = mockDatabase.find((r) => r.id === id);
    return receita || null;
  } catch (error) {
    console.error('Erro ao buscar receita:', error);
    throw error;
  }
};

export const atualizarReceita = async (id, receita) => {
  try {
    const index = mockDatabase.findIndex((r) => r.id === id);
    if (index !== -1) {
      mockDatabase[index] = { ...mockDatabase[index], ...receita };
      notifyListeners();
    }
  } catch (error) {
    console.error('Erro ao atualizar receita:', error);
    throw error;
  }
};

export const deletarReceita = async (id) => {
  try {
    mockDatabase = mockDatabase.filter((r) => r.id !== id);
    notifyListeners();
  } catch (error) {
    console.error('Erro ao deletar receita:', error);
    throw error;
  }
};

// Função auxiliar para notificar listeners
const notifyListeners = () => {
  const sorted = [...mockDatabase].sort(
    (a, b) => new Date(b.criadoEm) - new Date(a.criadoEm)
  );
  listeners.forEach((listener) => listener(sorted));
};

// Dummy objects para compatibilidade
export const db = { mock: true };
export const app = { mock: true };
