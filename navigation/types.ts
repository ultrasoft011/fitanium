export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
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
  ProductScreen: undefined;
};
