// GenderSelector.tsx
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

interface Props {
  selectedGender?: "male" | "female"; // Permite undefined
  onSelectGender: (gender: "male" | "female") => void; // Ajustar el tipo
}

const GenderSelector: React.FC<Props> = ({
  selectedGender,
  onSelectGender,
}) => {
  return (
    <View style={styles.genderContainer}>
      <TouchableOpacity
        style={[
          styles.genderBox,
          selectedGender === "male" && styles.selectedGender, // Aplica estilo condicional para "HOMBRE"
        ]}
        onPress={() => onSelectGender("male")}
      >
        <Icon
          name="mars"
          size={70}
          color={"white"}
          style={{ paddingTop: 15 }}
        />
        <Text style={styles.genderText}>HOMBRE</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.genderBox,
          selectedGender === "female" && styles.selectedGender, // Aplica estilo condicional para "MUJER"
        ]}
        onPress={() => onSelectGender("female")}
      >
        <Icon
          name="venus"
          size={70}
          color={"white"}
          style={{ paddingTop: 15 }}
        />
        <Text style={styles.genderText}>MUJER</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  genderBox: {
    alignItems: "center",
    backgroundColor: "#22244e",
    borderColor: "transparent",
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 48,
    paddingRight: 48,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: "center",
  },
  genderText: {
    fontSize: 15,
    color: "#fff",
    fontFamily: "Kanit_400Regular",
    marginTop: 10,
    marginBottom: 20,
  },
  selectedGender: {
    borderColor: "#fff", // Borde blanco cuando está seleccionado
    borderWidth: 1,
  },
});

export default GenderSelector;
