import { StyleSheet, View, Image, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Logo from "../assets/Logo_Big.png";
import { StatusBar } from "expo-status-bar";
import { Button } from "../components/Button";

export const First = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <View style={styles.logoContainer}>
        <Image source={Logo} />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={() => navigation.push("Login")}>로그인</Button>
        <Text>
          아직 가입하지 않으셨나요?{" "}
          <Text
            style={{ color: "#2B94FF" }}
            onPress={() => navigation.push("Register")}
          >
            회원가입
          </Text>
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flex: 5,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    gap: 10,
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
