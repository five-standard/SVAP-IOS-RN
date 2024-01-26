import { View, StyleSheet, Image, Text } from "react-native";
import Logo from "../assets/Logo.png";
import { useState } from "react";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { postSignUp } from "../api/User";
import { useMutation } from "@tanstack/react-query";
import { setToken } from "../utils/strToken";
import { Layout } from "../components/common/Layout";

const reg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

export const Register = ({ navigation }) => {
  const [cnt, setCnt] = useState(1);
  const [data, setData] = useState({
    userName: "",
    accountId: "",
    password: "",
    passCheck: "",
  });
  const [err, setErr] = useState(false);

  const disabled = {
    1: data.accountId.length > 8 || data.accountId === "",
    2: !data.password.match(reg) || data.password !== data.passCheck,
    3: data.userName.length > 8 || data.userName === "",
  };

  const next = () => {
    setCnt((prev) => prev + 1);
  };

  const handleChange = ({ name, text }) => {
    setData({ ...data, [name]: text });
  };

  const { mutate } = useMutation({
    mutationFn: (data) => postSignUp(data),
    onSuccess: (res) => {
      setToken(res.data);
      navigation.reset({ routes: [{ name: "Tab" }] });
    },
    onError: () => {
      setErr(true);
    },
  });

  const handleNext = () => {
    if (cnt !== 3) {
      next();
    } else {
      mutate(data);
    }
  };

  return (
    <Layout authPage>
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
            </>
          )}
          {cnt === 3 && (
            <>
              <Input
                placeholder="이름"
                name="userName"
                onChange={handleChange}
              />
              {err && (
                <Text style={{ color: "red" }}>이미 존재하는 계정입니다.</Text>
              )}
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
    </Layout>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  registerContainer: {
    flex: 4,
    gap: 15,
  },
  buttonContainer: {
    flex: 1,
    gap: 10,
    alignItems: "center",
  },
});
