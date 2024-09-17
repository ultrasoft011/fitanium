import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TmbCalculation } from "../utils/TmbCalculation";

type RootStackParamList = {
  FirstFlowScreen: undefined;
  SecondFlowScreen: {
    age: string;
    weight: string;
    height: string;
    gender: "male" | "female";
  };
  ThirdFlowScreen: {
    age: string;
    weight: string;
    height: string;
    gender: "male" | "female";
    activityLevel: string;
  };
};

type ThirdFlowScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ThirdFlowScreen"
>;
type ThirdFlowScreenRouteProp = RouteProp<
  RootStackParamList,
  "ThirdFlowScreen"
>;

type Props = {
  navigation: ThirdFlowScreenNavigationProp;
  route: ThirdFlowScreenRouteProp;
};

const getActivityMultiplier = (activityLevel: string): number => {
  switch (activityLevel) {
    case "none":
      return 1.2;
    case "light":
      return 1.375;
    case "moderate":
      return 1.55;
    case "active":
      return 1.725;
    case "very_active":
      return 1.9;
    default:
      return 1;
  }
};

const ThirdFlowScreen: React.FC<Props> = ({ route, navigation }) => {
  const { age, weight, height, gender, activityLevel } = route.params;

  const ageNum = parseInt(age, 10);
  const weightNum = parseFloat(weight);
  const heightNum = parseFloat(height);

  const bmr = TmbCalculation(weightNum, heightNum, ageNum, gender);

  const maintenanceCalories = bmr * getActivityMultiplier(activityLevel);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultados</Text>
      <Text style={styles.result}>
        Tasa Metabólica Basal (TMB): {bmr.toFixed(2)} kcal/día
      </Text>
      <Text style={styles.result}>
        Calorías para mantener el peso: {maintenanceCalories.toFixed(2)}{" "}
        kcal/día
      </Text>
      <Button
        title="Volver al Inicio"
        onPress={() => navigation.navigate("FirstFlowScreen")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  result: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default ThirdFlowScreen;
