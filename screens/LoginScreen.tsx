import React, { useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert("Bienvenido", `Hola ${user.email}`);
        navigation.navigate("FirstFlowScreen");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Logo</Text>
      </View>

      <View style={styles.buttonsContainer}>
        {/* Botón de Crear Cuenta con degradado */}
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <LinearGradient
            colors={[
              "#ff1491ea",
              "#d5006d",
              "#c50b5f",
              "#a32153e6",
              "#781781d5",
              "#060730c1",
            ]}
            style={[styles.button, styles.gradientButton]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.buttonText}>Crear Cuenta</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Botón de Login con degradado */}
        <TouchableOpacity onPress={handleLogin}>
          <View style={[styles.button, styles.loginButton]}>
            <Text style={[styles.buttonText, styles.loginButtonText]}>
              Login
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.socialContainer}>
        <Text style={styles.socialText}>Redes</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  logoContainer: {
    flex: 2,
    backgroundColor: "#ff1493",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  buttonsContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "stretch", // Cambiado a "stretch" para que los botones ocupen todo el ancho
    padding: 20,
  },
  socialContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  socialText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  button: {
    padding: 15,
    borderRadius: 50,
    marginBottom: 20,
    alignItems: "center",
    width: "100%", // Asegúrate de que el botón ocupe todo el ancho
  },
  gradientButton: {
    borderRadius: 50, // Asegúrate de que el botón tenga bordes redondeados
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#ff1493",
  },
  loginButtonText: {
    color: "#ff1493",
  },
});

export default LoginScreen;
