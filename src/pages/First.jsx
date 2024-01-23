import { StyleSheet, View, Image, Text } from "react-native";
import { Layout } from "../components/Layout";
import { Button } from "../components/Button";
import Logo from "../assets/Logo_Big.png";

export const First = ({ navigation }) => {
  return (
    <Layout authPage>
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
    </Layout>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    gap: 10,
    alignItems: "center",
  },
});
