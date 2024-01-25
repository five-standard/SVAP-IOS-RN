import { My } from "../screens/My";
import { MyPost } from "../screens/MyPost";
import { Detail } from "../screens/Detail";
import { stackOption, Stack } from "./stack";

export const MyStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="마이 페이지" screenOptions={stackOption}>
      <Stack.Screen name="마이 페이지" component={My} />
      <Stack.Screen name="내가 쓴 청원" component={MyPost} />
      <Stack.Screen
        name="상세보기"
        component={Detail}
        initialParams={{ id: 0 }}
      />
    </Stack.Navigator>
  );
};
