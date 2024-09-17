import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import FirstFlowScreen from "../screens/FirstFlowScreen";
import SecondFlowScreen from "../screens/SecondFlowScreen";
import ThirdFlowScreen from "../screens/ThirdFlowScreen"; // Importar la tercera pantalla
import ProductScreen from "../screens/ProductScreen";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ProductScreen">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Registrarse" }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Inicio" }}
      />
      <Stack.Screen
        name="FirstFlowScreen"
        component={FirstFlowScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SecondFlowScreen"
        component={SecondFlowScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ThirdFlowScreen"
        component={ThirdFlowScreen}
        options={{ title: "Resultados" }}
      />
      <Stack.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
