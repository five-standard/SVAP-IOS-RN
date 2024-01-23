import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { First } from "../pages/First";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { TabNavigator } from "./Tab";
import { NavigationContainer } from "@react-navigation/native";
import { My } from "../pages/My";

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
