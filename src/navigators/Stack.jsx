import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { First } from "../pages/First";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { TabNavigator } from "./Tab";
import { NavigationContainer } from "@react-navigation/native";
import { My } from "../pages/My";
import { MyPost } from "../pages/MyPost";
import { Detail } from "../pages/Detail";

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

export const MyStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="마이페이지"
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 15,
        },
        headerShadowVisible: false,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="마이페이지" component={My} />
      <Stack.Screen name="내가 쓴 청원" component={MyPost} />
      <Stack.Screen
        name="상세보기"
        component={Detail}
        initialParams={{ id: 0 }}
      />
    </Stack.Navigator>
  );
};
