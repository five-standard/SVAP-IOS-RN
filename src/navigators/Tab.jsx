import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { WatchStack, HomeStack, MyStack } from "./Stacks";
import { Write } from "../screens/Write";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const option = (header, icon) => {
    return {
      headerShown: header,
      tabBarIcon: ({ focused }) => (
        <Ionicons
          name={icon}
          size={25}
          style={{ color: focused ? "#2B94FF" : "#404040" }}
        />
      ),
    };
  };

  return (
    <Tab.Navigator
      initialRouteName={"홈"}
      screenOptions={{
        unmountOnBlur: true,
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 15,
        },
        tabBarStyle: {
          borderTopColor: "transparent",
          elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name="홈"
        component={HomeStack}
        options={option(false, "home-outline")}
      />
      <Tab.Screen
        name="청원 작성"
        component={Write}
        options={option(true, "create-outline")}
      />
      <Tab.Screen
        name="청원 보기"
        component={WatchStack}
        options={option(false, "people-outline")}
      />
      <Tab.Screen
        name="마이페이지"
        component={MyStack}
        options={option(false, "person-outline")}
      />
    </Tab.Navigator>
  );
};
