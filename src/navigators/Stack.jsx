import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { First } from "../screens/First";
import { Login } from "../screens/Login";
import { Register } from "../screens/Register";
import { TabNavigator } from "./Tab";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export const StackNavigation = ({ auth }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={auth ? "Tab" : "First"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="First" component={First} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Tab" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
