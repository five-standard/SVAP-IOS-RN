import { StyleSheet, Text, View, Image } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Layout } from "../../components/common/Layout";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { getInfo, postLogin } from "../../api/User";
import { setToken } from "../../utils/strToken";
import { setUser } from "../../utils/strUser";
import Logo from "../../assets/Logo.png";

export const Login = ({ navigation }) => {
  const [err, setErr] = useState(false);
  const [data, setData] = useState({
    accountId: "",
    password: "",
  });

  const disabled = data.id === "" || data.password === "";

  const handleChange = (e) => {
    setData({ ...data, [e.name]: e.text });
  };

  const { mutate } = useMutation({
    mutationFn: (data) => postLogin(data),
    onSuccess: (res) => {
      setToken(res.data);
      navigation.reset({ routes: [{ name: "Tab" }] });
      getInfo()
        .then((info) => setUser(info.data))
        .catch(() => {});
    },
    onError: () => {
      setErr(true);
    },
  });

  return (
    <Layout authPage>
      <View style={styles.logoContainer}>
        <Image source={Logo} />
      </View>
      <View style={styles.loginContainer}>
        <Text style={{ alignSelf: "flex-start" }}>로그인</Text>
        <Input name="accountId" placeholder="아이디" onChange={handleChange} />
        <Input
          name="password"
          onChange={handleChange}
          placeholder="비밀번호"
          password
        />
        {err && (
          <Text style={{ color: "red", alignSelf: "flex-start" }}>
            아이디 또는 비밀번호를 다시 확인하세요.
          </Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button disabled={disabled} onPress={() => mutate(data)}>
          로그인
        </Button>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    flex: 4,
    gap: 15,
  },
  buttonContainer: {
    flex: 1,
    gap: 10,
    alignItems: "center",
  },
});
