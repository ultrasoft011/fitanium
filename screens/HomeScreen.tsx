import { Image, StyleSheet, Platform, Button } from "react-native";
import React, { useState } from "react";
import { HelloWave } from "../components/HelloWave";
import ParallaxScrollView from "../components/ParallaxScrollView";
import { ThemedText } from "../components/ThemedText";
import { ThemedView } from "../components/ThemedView";
import { ThemedInput } from "../components/ThemedInput";
import { TmbCalculation } from "../utils/TmbCalculation";
import GenderSelector from "../components/GenderSelector";

export default function HomeScreen() {
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [tmb, setTmb] = useState<string | null>(null);

  const handleGenderChange = (selectedGender: "male" | "female") => {
    setGender(selectedGender);
  };

  const handleCalculateTMB = () => {
    const weightNumber = parseFloat(weight);
    const heightNumber = parseFloat(height);
    const ageNumber = parseInt(age, 10);

    if (
      isNaN(weightNumber) ||
      isNaN(heightNumber) ||
      isNaN(ageNumber) ||
      gender === undefined
    ) {
      console.log("Por favor ingresa todos los datos correctamente.");
      return;
    }

    const calculatedTMB = TmbCalculation(
      weightNumber,
      heightNumber,
      ageNumber,
      gender
    );
    setTmb(calculatedTMB.toFixed(2));
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("../assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
      tmb={tmb} // Paso el TMB como un prop
    >
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Paso 1:</ThemedText>
        <ThemedText>
          Porfavor ingresa tu{" "}
          <ThemedText type="defaultSemiBold">
            peso en kilogramos, altura en centimetros y tu edad en años.
          </ThemedText>
          <ThemedText type="defaultSemiBold">
            {/* {Platform.select({ ios: "cmd + d", android: "cmd + m" }) */}
          </ThemedText>
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Calculadora</ThemedText>
        {/* <HelloWave /> */}
      </ThemedView>
      <ThemedInput
        title="Peso (Kg): "
        value={weight}
        onChangeText={setWeight}
      />
      <ThemedInput
        title="Altura (cms): "
        value={height}
        onChangeText={setHeight}
      />
      <ThemedInput title="Edad (años): " value={age} onChangeText={setAge} />
      <GenderSelector
        selectedGender={gender}
        onSelectGender={handleGenderChange}
      />
      <Button title="Calculate TMB" onPress={handleCalculateTMB} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
