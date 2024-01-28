import { stackOption, Stack } from "../utils/stackTypes";
import { Detail } from "../screens/Detail";
import { Home } from "../screens/Home";

export const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={stackOption}>
      <Stack.Screen name="Home" component={Home} options={{ title: "홈" }} />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{ title: "상세 보기" }}
      />
    </Stack.Navigator>
  );
};
