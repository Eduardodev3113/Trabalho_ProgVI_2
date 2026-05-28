import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || 'YOUR_API_KEY',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || 'YOUR_AUTH_DOMAIN',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || 'YOUR_PROJECT_ID',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || 'YOUR_STORAGE_BUCKET',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || 'YOUR_MESSAGING_SENDER_ID',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || 'YOUR_APP_ID',
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Coleção de receitas
const receitasCollection = collection(db, 'receitas');

// ─── Operações com Receitas ─────────────────────────────────────────────────

// Salvar nova receita
export const salvarReceita = async (receita) => {
  try {
    const docRef = await addDoc(receitasCollection, {
      ...receita,
      criadoEm: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Erro ao salvar receita:', error);
    throw error;
  }
};

// Listar todas as receitas (com listener em tempo real)
export const listarReceitas = (callback) => {
  const q = query(receitasCollection, orderBy('criadoEm', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const receitas = [];
    snapshot.forEach((doc) => {
      receitas.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    callback(receitas);
  });
};

// Buscar receita por ID
export const buscarReceitaPorId = async (id) => {
  try {
    const docSnap = await getDoc(doc(db, 'receitas', id));
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    }
    return null;
  } catch (error) {
    console.error('Erro ao buscar receita:', error);
    throw error;
  }
};

// Atualizar receita
export const atualizarReceita = async (id, receita) => {
  try {
    const docRef = doc(db, 'receitas', id);
    await updateDoc(docRef, receita);
  } catch (error) {
    console.error('Erro ao atualizar receita:', error);
    throw error;
  }
};

// Deletar receita
export const deletarReceita = async (id) => {
  try {
    await deleteDoc(doc(db, 'receitas', id));
  } catch (error) {
    console.error('Erro ao deletar receita:', error);
    throw error;
  }
};

export { db, app };
