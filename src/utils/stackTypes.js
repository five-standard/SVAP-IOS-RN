import { createNativeStackNavigator } from "@react-navigation/native-stack";

export const Stack = createNativeStackNavigator();

export const stackOption = {
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontSize: 15,
  },
  headerShadowVisible: false,
  headerBackTitleVisible: false,
};
