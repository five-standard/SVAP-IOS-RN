import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../pages/Home";
import { Ionicons } from "@expo/vector-icons";
import { MyStackNavigation } from "./Stack";

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
      initialRouteName={"Home"}
      screenOptions={{
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
        component={Home}
        options={option(true, "home-outline")}
      />
      <Tab.Screen
        name="청원 작성"
        component={Home}
        options={option(false, "create-outline")}
      />
      <Tab.Screen
        name="청원 보기"
        component={Home}
        options={option(false, "people-outline")}
      />
      <Tab.Screen
        name="마이페이지"
        component={MyStackNavigation}
        options={option(false, "person-outline")}
      />
    </Tab.Navigator>
  );
};
