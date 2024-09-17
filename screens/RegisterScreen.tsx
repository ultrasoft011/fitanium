// src/screens/RegisterScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

// Define el tipo de propiedades que la pantalla podría recibir (en este caso, ninguna)
interface RegisterScreenProps {}

const RegisterScreen: React.FC<RegisterScreenProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Registro exitoso
        const user = userCredential.user;
        Alert.alert("Registro Exitoso", `Bienvenido ${user.email}`);
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Introduce tu correo"
        keyboardType="email-address"
        style={styles.input}
        autoCapitalize="none"
      />
      <Text style={styles.label}>Contraseña:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Introduce tu contraseña"
        secureTextEntry
        style={styles.input}
      />
      <Text style={styles.label}>Confirmar Contraseña:</Text>
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirma tu contraseña"
        secureTextEntry
        style={styles.input}
      />
      <Button title="Registrar" onPress={handleRegister} />
    </View>
  );
};

// Define estilos para la pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FFFFFF", // Color de fondo blanco
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    color: "#000000", // Color del texto negro
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 8,
    borderBottomColor: "#000000", // Color de borde del campo de entrada
    color: "#000000", // Color del texto de entrada
  },
});

export default RegisterScreen;
