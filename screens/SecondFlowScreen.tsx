import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import ActivityModal from "../components/ActivityModal";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import NextButton from "../components/NextButton";

type SecondScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SecondFlowScreen"
>;

type SecondScreenRouteProp = RouteProp<RootStackParamList, "SecondFlowScreen">;

type Props = {
  navigation: SecondScreenNavigationProp;
  route: SecondScreenRouteProp;
};

const SecondScreen: React.FC<Props> = ({ navigation, route }) => {
  const { age, weight, height, gender } = route.params;
  const [activityLevel, setActivityLevel] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleActivitySelect = (level: string) => {
    setActivityLevel(level);
    setModalVisible(true);
  };

  const handleNext = () => {
    navigation.navigate("ThirdFlowScreen", {
      age,
      weight,
      height,
      gender,
      activityLevel,
    });
  };

  const activityLevels = [
    {
      value: "none",
      label: "Sedentario",
      image: require("../assets/images/sedentario.jpg"),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.",
      days: "Actividad baja",
    },
    {
      value: "light",
      label: "Ligero",
      image: require("../assets/images/ligero.jpg"),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.",
      days: "1 a 3 días a la semana",
    },
    {
      value: "moderate",
      label: "Moderado",
      image: require("../assets/images/moderado.jpg"),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.",
      days: "4 a 5 días a la semana",
    },
    {
      value: "active",
      label: "Activo",
      image: require("../assets/images/activo.jpg"),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.",
      days: "6 a 7 días a la semana",
    },
    {
      value: "very_active",
      label: "Muy Activo",
      image: require("../assets/images/muy_activo.jpg"),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.",
      days: "Alto rendimiento con turnos dobles",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Nivel de actividad</Text>
        <View style={styles.iconContainer}>
          {activityLevels.map((activity) => (
            <TouchableOpacity
              key={activity.value}
              style={styles.iconBox}
              onPress={() => handleActivitySelect(activity.value)}
            >
              <Image source={activity.image} style={styles.iconImage} />
              <LinearGradient
                colors={["rgba(34, 36, 40, 0.85)", "rgba(255, 255, 255, 0)"]}
                style={styles.gradient}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
              />
              <View style={styles.textOverlay}>
                <Text style={styles.iconLabel}>{activity.label}</Text>
                <Text style={styles.description}>{activity.description}</Text>

                <View style={styles.bottomBoxText}>
                  <FontAwesome5 style={styles.iconAwesome} name={"dumbbell"} />
                  <Text style={styles.iconDescription}>{activity.days}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <NextButton onPress={handleNext} label="COMPLETAR" />
      </ScrollView>

      <ActivityModal
        visible={modalVisible}
        activityLevel={activityLevel}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: "#000000d5",
  },
  label: {
    fontSize: 18,
    marginBottom: 25,
    color: "#fff",
    textAlign: "center",
  },
  iconContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 0,
    margin: 0,
    gap: 10, // Espacio entre los elementos
  },
  iconBox: {
    alignItems: "center",
    padding: 2,
    borderRadius: 6,
    width: "100%",
    height: 150,
    overflow: "hidden",
    position: "relative",
    borderBottomWidth: 3, // Borde inferior
    borderRightWidth: 2, // Borde derecho
    borderColor: "#ff14918f", // Color del borde
    shadowColor: "#000000dc", // Color de la sombra
    shadowOffset: {
      width: 0,
      height: 1, // Desplazamiento vertical de la sombra
    },
    shadowOpacity: 0.3, // Opacidad de la sombra
    shadowRadius: 1, // Radio de la sombra
    elevation: 5, // Elevación para Android
  },
  iconImage: {
    flex: 1,
    borderRadius: 3,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  textOverlay: {
    position: "absolute",
    top: 7,
    left: 10,
    right: 10,
    borderRadius: 5,
    padding: 8,
  },
  bottomBoxText: {
    flexDirection: "row",
    paddingTop: 20,
  },
  iconLabel: {
    color: "#fff",
    fontWeight: "bold",
    padding: 0,
    fontSize: 20,
    textTransform: "uppercase",
  },
  description: {
    color: "#faf0e6",
    padding: 0,
    fontSize: 11,
  },
  iconDescription: {
    color: "#faf0e6",
    fontSize: 12,
    marginLeft: 7,
  },
  iconAwesome: {
    fontSize: 12,
    color: "#ff1493", // Color del icono de la pesa
    paddingTop: 2,
  },
});

export default SecondScreen;
