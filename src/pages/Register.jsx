import { View, StyleSheet, Image, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Logo from "../assets/Logo.png";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button } from "../components/Button";
import Input from "../components/Input";

export const Register = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [cnt, setCnt] = useState(1);
  const [data, setData] = useState({
    userName: "",
    accountId: "",
    password: "",
    passCheck: "",
  });
  const reg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

  const disabled = {
    1: data.accountId.length > 8 || data.accountId === "",
    2: !data.password.match(reg) || data.password !== data.passCheck,
    3: data.userName.length > 8 || data.userName === "",
  };

  const handleNext = () => {
    if (cnt === 1) {
      getDupl;
    }
  };

  const next = () => {
    setCnt((prev) => prev + 1);
  };

  const handleChange = ({ name, text }) => {
    setData({ ...data, [name]: text });
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
      <View style={styles.registerContainer}>
        <View style={{ gap: 15 }}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>회원가입</Text>
            <Text>{cnt}/3</Text>
          </View>
          {cnt === 1 && (
            <>
              <Input
                placeholder="아이디 (영문 8자 이하)"
                name="accountId"
                onChange={handleChange}
              />
              <Text style={{ color: "red" }}>이미 아이디가 존재합니다</Text>
            </>
          )}
          {cnt === 2 && (
            <>
              <Input
                placeholder="비밀번호 (영문+숫자+특수문자 8자 이상)"
                name="password"
                onChange={handleChange}
                password
              />
              <Input
                placeholder="비밀번호 확인"
                name="passCheck"
                onChange={handleChange}
                password
              />
              <Text style={{ color: "red" }}>비밀번호를 확인해 주세요.</Text>
            </>
          )}
          {cnt === 3 && (
            <>
              <Input placeholder="이름" />
            </>
          )}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button disabled={disabled[cnt]} onPress={handleNext}>
          다음
        </Button>
        <Text>
          이미 가입하셨나요?{" "}
          <Text
            style={{ color: "#2B94FF" }}
            onPress={() => navigation.replace("Login")}
          >
            로그인
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
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  registerContainer: {
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
