// src/config/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Importar Firestore
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyC6Q9oHwEjTnqipKn2H5-XCu5sSwV0T4f0",
  authDomain: "fitanium-57ace.firebaseapp.com",
  projectId: "fitanium-57ace",
  storageBucket: "fitanium-57ace.appspot.com",
  messagingSenderId: "435223811704",
  appId: "1:435223811704:web:935c958898c37111e8bf8d",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firebase Auth con persistencia usando AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Inicializar Firestore
const db = getFirestore(app); // Inicializa Firestore

export { auth, db }; // Exporta tanto auth como db
