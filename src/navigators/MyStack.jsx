import { stackOption, Stack } from "../utils/stackTypes";
import { My, MyPost } from "../screens/My";
import { Detail } from "../screens/Detail";

export const MyStack = () => {
  return (
    <Stack.Navigator initialRouteName="My" screenOptions={stackOption}>
      <Stack.Screen
        name="My"
        component={My}
        options={{ title: "마이페이지" }}
      />
      <Stack.Screen
        name="MyPost"
        component={MyPost}
        options={{ title: "내 청원" }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{ title: "상세 보기" }}
      />
    </Stack.Navigator>
  );
};
