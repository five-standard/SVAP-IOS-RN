import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, View, Image } from "react-native";
import { useState } from "react";
import Logo from "./assets/Logo.png";
import CustomInput from "./components/CustomInput";

export default function App() {
  const [hidden, setHidden] = useState(true);
  const [data, setData] = useState({
    id: "",
    password: "",
  });
  const isEmpty = data.id !== "" && data.password !== "";

  const handleChange = (e) => {
    setData({ ...data, [e.name]: e.text });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={Logo} />
      </View>
      <View style={styles.loginContainer}>
        <View style={styles.inputContainer}>
          <Text style={{ alignSelf: "start" }}>로그인</Text>

          <CustomInput
            style={{
              borderColor: "#BEBEBE",
              borderWidth: 1,
              padding: 15,
              borderRadius: 10,
              width: "100%",
            }}
            name="id"
            placeholder="아이디"
            onChange={handleChange}
          />

          <CustomInput
            style={{
              borderColor: "#BEBEBE",
              borderWidth: 1,
              padding: 15,
              borderRadius: 10,
              width: "100%",
            }}
            name="password"
            onChange={handleChange}
            secureTextEntry={hidden ? true : false}
            placeholder="비밀번호"
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "80%",
            padding: 15,
            borderRadius: 10,
            backgroundColor: `${isEmpty ? "#419FFF" : "#72B8FF"}`,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            로그인
          </Text>
        </View>
        <Text>
          아직 가입하지 않으셨나요?{" "}
          <Text style={{ color: "#2B94FF" }}>회원가입</Text>
        </Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoContainer: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff",
  },
  loginContainer: {
    backgroundColor: "#fff",
    flex: 3,
    gap: 15,
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
    gap: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 0.5,
    gap: 10,
    alignItems: "center",
  },
});
