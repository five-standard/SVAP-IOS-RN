import { Detail } from "../screens/Detail";
import { Home } from "../screens/Home";
import { stackOption, Stack } from "./stack";

export const HomeStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="홈" screenOptions={stackOption}>
      <Stack.Screen name="홈" component={Home} />
      <Stack.Screen name="상세보기" component={Detail} />
    </Stack.Navigator>
  );
};
