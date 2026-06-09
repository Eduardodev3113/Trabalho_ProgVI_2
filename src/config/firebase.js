import { initializeApp, getApps } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD6oSebdA8fnBw5u7OUkto0HmP8amif2iQ",
  authDomain: "prog-2026-eduardodallrosa.firebaseapp.com",
  databaseURL: "https://prog-2026-eduardodallrosa-default-rtdb.firebaseio.com",
  projectId: "prog-2026-eduardodallrosa",
  storageBucket: "prog-2026-eduardodallrosa.firebasestorage.app",
  messagingSenderId: "652979626230",
  appId: "1:652979626230:web:46307d9ba3161bbb800cd7"
};

let mockDatabase = [];
let listeners = [];
let firestoreEnabled = false;
let firestoreDb = null;

const initializeFirebase = () => {
  if (firestoreDb || !getApps().length) {
    return;
  }

  const hasConfig = Boolean(firebaseConfig.projectId);

  if (!hasConfig) {
    firestoreEnabled = false;
    return;
  }

  try {
    const app = initializeApp(firebaseConfig);
    firestoreDb = getFirestore(app);
    firestoreEnabled = true;
  } catch (error) {
    console.warn('Firebase não configurado, usando modo mock.', error);
    firestoreEnabled = false;
  }
};

initializeFirebase();

const normalizeReceita = (docData, id) => ({
  id,
  ...docData,
  criadoEm: docData?.criadoEm?.toDate?.()
    ? docData.criadoEm.toDate()
    : docData?.criadoEm || new Date(),
});

const notifyListeners = () => {
  const sorted = [...mockDatabase].sort((a, b) => {
    const dateA = a.criadoEm instanceof Date ? a.criadoEm : new Date(a.criadoEm);
    const dateB = b.criadoEm instanceof Date ? b.criadoEm : new Date(b.criadoEm);
    return dateB - dateA;
  });

  listeners.forEach((listener) => listener(sorted));
};

export const salvarReceita = async (receita) => {
  if (!firestoreEnabled) {
    const novaReceita = {
      id: Math.random().toString(36).slice(2, 11),
      ...receita,
      criadoEm: new Date(),
    };
    mockDatabase.push(novaReceita);
    notifyListeners();
    return novaReceita.id;
  }

  const payload = {
    ...receita,
    criadoEm: serverTimestamp(),
  };

  const ref = await addDoc(collection(firestoreDb, 'receitas'), payload);
  return ref.id;
};

export const listarReceitas = (callback) => {
  if (!firestoreEnabled) {
    const listener = callback;
    listeners.push(listener);

    const sorted = [...mockDatabase].sort((a, b) => {
      const dateA = a.criadoEm instanceof Date ? a.criadoEm : new Date(a.criadoEm);
      const dateB = b.criadoEm instanceof Date ? b.criadoEm : new Date(b.criadoEm);
      return dateB - dateA;
    });

    callback(sorted);

    return () => {
      listeners = listeners.filter((item) => item !== listener);
    };
  }

  const q = query(collection(firestoreDb, 'receitas'), orderBy('criadoEm', 'desc'));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const dados = snapshot.docs.map((docItem) => normalizeReceita(docItem.data(), docItem.id));
    callback(dados);
  });

  return unsubscribe;
};

export const buscarReceitaPorId = async (id) => {
  if (!firestoreEnabled) {
    return mockDatabase.find((item) => item.id === id) || null;
  }

  const snapshot = await getDoc(doc(firestoreDb, 'receitas', id));
  return snapshot.exists() ? normalizeReceita(snapshot.data(), snapshot.id) : null;
};

export const atualizarReceita = async (id, receita) => {
  if (!firestoreEnabled) {
    const index = mockDatabase.findIndex((item) => item.id === id);
    if (index !== -1) {
      mockDatabase[index] = { ...mockDatabase[index], ...receita };
      notifyListeners();
    }
    return;
  }

  await updateDoc(doc(firestoreDb, 'receitas', id), receita);
};

export const deletarReceita = async (id) => {
  if (!firestoreEnabled) {
    mockDatabase = mockDatabase.filter((item) => item.id !== id);
    notifyListeners();
    return;
  }

  await deleteDoc(doc(firestoreDb, 'receitas', id));
};

export const isFirebaseReady = () => firestoreEnabled;
export const db = firestoreDb;
export const app = firestoreDb || { mock: true };
