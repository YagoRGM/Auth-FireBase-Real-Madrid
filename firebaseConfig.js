// Joao Pedro da Cunha Machado e Yago Roberto Gomes Moraes
// Importando as funções necessárias do Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCBeS94dVEJieVdKgioybpStmaUuP5cerA",
  authDomain: "auth-firebase-projeto-au-19736.firebaseapp.com",
  projectId: "auth-firebase-projeto-au-19736",
  storageBucket: "auth-firebase-projeto-au-19736.appspot.com",
  messagingSenderId: "525134036632",
  appId: "1:525134036632:web:c44ec30fdf84493664daed",
  measurementId: "G-JKDQJERLJB"
};

// Inicializando Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs };
export default app;
