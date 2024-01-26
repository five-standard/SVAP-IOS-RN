import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MyStackNavigation } from "./MyStack";
import { HomeStackNavigation } from "./HomeStack";
import { Home } from "../screens/Home";
import { WatchStackNavigation } from "./WatchStack";

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
        component={HomeStackNavigation}
        options={option(false, "home-outline")}
      />
      <Tab.Screen
        name="청원 작성"
        component={Home}
        options={option(false, "create-outline")}
      />
      <Tab.Screen
        name="청원 보기"
        component={WatchStackNavigation}
        options={option(false, "people-outline")}
      />
      <Tab.Screen
        name="My"
        component={MyStackNavigation}
        options={option(false, "person-outline")}
      />
    </Tab.Navigator>
  );
};
