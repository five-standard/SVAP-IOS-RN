import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Layout = ({ children, authPage, style }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: "#fff",
          padding: !authPage && 20,
          paddingTop: authPage ? insets.top : 10,
          paddingBottom: insets.bottom,
          paddingLeft: authPage && 30,
          paddingRight: authPage && 30,
          backgroundColor: "#fff",
        },
        style,
      ]}
    >
      {children}
      <StatusBar style="auto" />
    </View>
  );
};
