import { Detail } from "../screens/Detail";
import { Watch } from "../screens/Watch";
import { Write } from "../screens/Write";
import { stackOption, Stack } from "./stack";

export const WatchStackNavigation = ({ route }) => {
  return (
    <Stack.Navigator initialRouteName="청원 보기" screenOptions={stackOption}>
      <Stack.Screen name="청원 보기" component={Watch} />
      <Stack.Screen name="상세보기" component={Detail} />
      <Stack.Screen name="수정하기" component={Write} />
    </Stack.Navigator>
  );
};
