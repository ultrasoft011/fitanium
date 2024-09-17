import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Text } from "react-native-paper";
import Slider from "@react-native-community/slider";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import {
  useFonts,
  Kanit_400Regular,
  Kanit_700Bold,
} from "@expo-google-fonts/kanit";
import { RootStackParamList } from "../navigation/types";
import { FontAwesome } from "@expo/vector-icons";
import GenderSelector from "../components/GenderSelector";
import NextButton from "../components/NextButton"; 

type FirstFlowScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "FirstFlowScreen"
>;
type FirstFlowScreenRouteProp = RouteProp<
  RootStackParamList,
  "FirstFlowScreen"
>;

type Props = {
  navigation: FirstFlowScreenNavigationProp;
  route: FirstFlowScreenRouteProp;
};

const FirstFlowScreen: React.FC<Props> = ({ navigation }) => {
  const [age, setAge] = useState<number>(0);
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<string>("0");
  const [selectedGender, setSelectedGender] = useState<
    "male" | "female" | undefined
  >(undefined);

  const handleNext = () => {
    if (selectedGender === undefined) {
      alert("Por favor, selecciona un género antes de continuar.");
      return;
    }

    navigation.navigate("SecondFlowScreen", {
      age: age.toString(),
      weight: weight.toString(),
      height,
      gender: selectedGender,
    });
  };

  let [fontsLoaded] = useFonts({
    Kanit_400Regular,
    Kanit_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const onSelectGender = (gender: "male" | "female") => {
    setSelectedGender(gender);
    console.log("Género seleccionado:", gender);
  };

  const incrementAge = () => setAge((prevAge) => prevAge + 1);
  const decrementAge = () => setAge((prevAge) => Math.max(prevAge - 1, 0));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CALCULADORA BMI</Text>
      <GenderSelector
        selectedGender={selectedGender}
        onSelectGender={onSelectGender}
      />
      <View style={styles.box}>
        <View style={styles.sliderContainer}>
          <Text style={styles.label}>PESO</Text>
          <Text style={styles.valueLabel}>
            {weight}
            <Text style={styles.label}> kg</Text>
          </Text>

          <Slider
            style={styles.slider}
            value={weight}
            onValueChange={(value) => setWeight(Math.round(value))}
            minimumValue={40}
            maximumValue={160}
            step={1}
            minimumTrackTintColor="#d3d3d3"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#ff1493"
          />
          <View style={styles.scaleLabelsContainer}>
            <Text style={styles.scaleLabel}>40</Text>
            <Text style={styles.scaleLabel}>60</Text>
            <Text style={styles.scaleLabel}>80</Text>
            <Text style={styles.scaleLabel}>100</Text>
            <Text style={styles.scaleLabel}>120</Text>
            <Text style={styles.scaleLabel}>140</Text>
            <Text style={styles.scaleLabel}>160</Text>
          </View>
        </View>
      </View>
      <View style={styles.edadAltura}>
        <View style={styles.boxEdad}>
          <Text style={styles.labelEdad}>EDAD</Text>
          <View style={styles.ageContainer}>
            <TouchableOpacity onPress={decrementAge} style={styles.ageButton}>
              <FontAwesome name="minus" size={17} color="gray" />
            </TouchableOpacity>
            <TextInput
              style={styles.ageInput}
              keyboardType="numeric"
              value={age.toString()}
              onChangeText={(text) => setAge(Number(text))}
              placeholderTextColor="#fff" // Define el color del texto del placeholder a blanco
            />
            <TouchableOpacity onPress={incrementAge} style={styles.ageButton}>
              <FontAwesome name="plus" size={17} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.boxAltura}>
          <Text style={styles.labelEdad}>ALTURA</Text>
          <View style={styles.ageContainer}>
            <TouchableOpacity
              onPress={() =>
                setHeight((prev) => `${Math.max(Number(prev) - 1, 0)}`)
              }
              style={styles.ageButton}
            >
              <FontAwesome name="minus" size={17} color="gray" />
            </TouchableOpacity>
            <TextInput
              style={styles.ageInput}
              keyboardType="numeric"
              value={height}
              onChangeText={setHeight}
              placeholderTextColor="#fff"
            />
            <TouchableOpacity
              onPress={() => setHeight((prev) => `${Number(prev) + 1}`)}
              style={styles.ageButton}
            >
              <FontAwesome name="plus" size={17} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <NextButton onPress={handleNext} label="SIGUIENTE" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#060730",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 21,
    marginBottom: 34,
    textAlign: "center",
    fontFamily: "Kanit_700Bold",
  },
  label: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Kanit_400Regular",
    textAlign: "center",
  },
  labelEdad: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Kanit_400Regular",
    textAlign: "center",
  },
  valueLabel: {
    color: "#fff",
    fontSize: 35,
    fontFamily: "Kanit_700Bold",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    fontFamily: "Kanit_400Regular",
  },
  inputAltura: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 50,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    fontFamily: "Kanit_400Regular",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  genderBox: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 7,
    paddingLeft: 19,
    paddingRight: 19,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: "center",
  },
  selectedGender: {
    borderColor: "blue",
  },
  genderText: {
    fontFamily: "Kanit_400Regular",
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  button: {
    marginTop: 19,
    backgroundColor: "#ff1493", // Establece el color de fondo
    borderRadius: 2, // Sin bordes redondeados
    elevation: 0, // Remueve sombras en Android si es necesario
    height: 50, // Define la altura del botón
    justifyContent: "center", // Centra el contenido verticalmente
    alignItems: "center", // Centra el contenido horizontalmente
  },
  ageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  ageInput: {
    flex: 1,
    color: "#fff", // Establece el color del texto a blanco
    textAlign: "center",
    fontSize: 35,
    fontFamily: "Kanit_700Bold",
    backgroundColor: "#22244e",
  },
  ageButton: {
    backgroundColor: "#22244e",
    padding: 13,
  },
  sliderContainer: {
    alignItems: "center",
    marginVertical: 8,
  },
  box: {
    backgroundColor: "#22244e",
    width: "100%",
    borderRadius: 5,
    marginTop: 18,
  },
  boxEdad: {
    backgroundColor: "#22244e",
    width: "48%",
    borderRadius: 5,
    padding: 10,
  },
  boxAltura: {
    backgroundColor: "#22244e",
    width: "48%",
    borderRadius: 5,
    padding: 10,
  },
  edadAltura: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    marginBottom: 2,
  },
  slider: {
    width: "100%",
  },
  scaleLabelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15,
  },
  scaleLabel: {
    color: "#fff",
    fontSize: 10,
  },
});

export default FirstFlowScreen;
