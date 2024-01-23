import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { delToken } from "../utils/strToken";
import { Layout } from "../components/Layout";
import { Modal } from "../components/Modal";

export const My = ({ navigation }) => {
  const [type, setType] = useState(false);
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    if (logout) {
      navigation.getParent().replace("Login");
    }
  }, [logout]);

  const handleLogout = () => {
    delToken();
    setType(false);
    setLogout(true);
  };

  return (
    <Layout style={{ gap: 30 }}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
        }}
      >
        <Text style={{ color: "#2B94FF" }}>강해민</Text>님, 안녕하세요!
      </Text>
      <View>
        <View style={styles.hr} />
        <View style={styles.hrContainer}>
          <Text>내가 쓴 청원 보기</Text>
        </View>
        <View style={styles.hr} />
        <View style={styles.hrContainer}>
          <Text>내 정보 수정</Text>
        </View>
        <View style={styles.hr} />
      </View>
      <View style={styles.textContainer}>
        <Text style={{ fontWeight: "bold" }} onPress={() => setType("logout")}>
          로그아웃
        </Text>
        <Text style={{ fontWeight: "bold" }} onPress={() => setType("quit")}>
          회원탈퇴
        </Text>
      </View>
      {type ? (
        type === "logout" ? (
          <Modal
            title="로그아웃하시겠습니까?"
            subTitle="다시 로그인해야 합니다."
            value={type}
            setValue={setType}
            action={handleLogout}
          />
        ) : (
          <Modal
            title="탈퇴하시겠습니까?"
            subTitle="계정이 삭제됩니다."
            value={type}
            setValue={setType}
          />
        )
      ) : (
        <></>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  hrContainer: {
    width: "100%",
    height: 55,
    justifyContent: "center",
  },
  hr: {
    width: "100%",
    height: 1,
    backgroundColor: "#92929250",
  },
  textContainer: {
    alignSelf: "center",
    flexDirection: "row",
    gap: 10,
  },
});
