import { stackOption, Stack } from "../utils/stackTypes";
import { Detail } from "../screens/Detail";
import { Watch } from "../screens/Watch";
import { Write } from "../screens/Write";

export const WatchStack = () => {
  return (
    <Stack.Navigator initialRouteName="Watch" screenOptions={stackOption}>
      <Stack.Screen
        name="Watch"
        component={Watch}
        options={{ title: "청원 보기" }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{ title: "상세 보기" }}
      />
      <Stack.Screen
        name="Edit"
        component={Write}
        options={{ title: "청원 수정" }}
      />
    </Stack.Navigator>
  );
};
