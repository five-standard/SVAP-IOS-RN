import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  View,
  Image,
} from "react-native";
import { useState } from "react";
import Logo from "../assets/Logo.png";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Input from "../components/Input";
import { Button } from "../components/Button";

export const Login = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [hidden, setHidden] = useState(true);
  const [data, setData] = useState({
    id: "",
    password: "",
  });

  const disabled = data.id === "" || data.password === "";

  const handleChange = (e) => {
    setData({ ...data, [e.name]: e.text });
  };

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
      <View style={styles.loginContainer}>
        <Text style={{ alignSelf: "flex-start" }}>로그인</Text>

        <Input name="id" placeholder="아이디" onChange={handleChange} />

        <Input
          name="password"
          onChange={handleChange}
          placeholder="비밀번호"
          password
        />
        <Text style={{ color: "red", alignSelf: "flex-start" }}>
          아이디 또는 비밀번호를 다시 확인하세요.
        </Text>
      </View>
      <KeyboardAvoidingView style={styles.buttonContainer}>
        <Button disabled={disabled}>로그인</Button>
        <Text>
          아직 가입하지 않으셨나요?{" "}
          <Text
            style={{ color: "#2B94FF" }}
            onPress={() => navigation.push("Register")}
          >
            회원가입
          </Text>
        </Text>
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loginContainer: {
    backgroundColor: "#fff",
    flex: 4,
    paddingLeft: 30,
    paddingRight: 30,
    gap: 15,
  },
  buttonContainer: {
    flex: 1,
    gap: 10,
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 30,
  },
});
