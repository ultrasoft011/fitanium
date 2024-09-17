import React from "react";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";

interface NextButtonProps {
  onPress: () => void;
  label: string;
}

const NextButton: React.FC<NextButtonProps> = ({ onPress, label }) => {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      style={styles.button}
      labelStyle={styles.label}
    >
      {label}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 13,
    backgroundColor: "#ff1493", // Establece el color de fondo
    borderRadius: 2, // Sin bordes redondeados
    elevation: 0, // Remueve sombras en Android si es necesario
    justifyContent: "center", // Centra el contenido verticalmente
    alignItems: "center", // Centra el contenido horizontalmente
  },
  label: {
    fontSize: 13,
    color: "#fff",
    fontFamily: "Kanit_700Bold",
  },
});

export default NextButton;