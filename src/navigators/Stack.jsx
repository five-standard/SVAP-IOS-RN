import { NavigationContainer } from "@react-navigation/native";
import { First, Login, Register } from "../screens/Auth";
import { Stack } from "../utils/stackTypes";
import { TabNavigator } from "./Tab";

export const StackNav = ({ auth }) => {
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
