import { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { delToken } from "../utils/strToken";
import { Layout } from "../components/common/Layout";
import { Modal } from "../components/Modal";
import { useMutation } from "@tanstack/react-query";
import { deleteAccount } from "../api/User";

export const My = ({ navigation }) => {
  const [type, setType] = useState(false);
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    if (logout) {
      navigation.getParent().getParent().replace("Login");
    }
  }, [logout]);

  const handleLogout = () => {
    delToken();
    setLogout(true);
  };

  const { mutate } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: handleLogout,
  });

  return (
    <Layout header style={{ gap: 30 }}>
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
        <TouchableOpacity
          onPress={() => navigation.push("내가 쓴 청원")}
          style={styles.hrContainer}
        >
          <Text>내가 쓴 청원 보기</Text>
        </TouchableOpacity>
        <View style={styles.hr} />
        <TouchableOpacity onPress={() => {}} style={styles.hrContainer}>
          <Text>내 정보 수정</Text>
        </TouchableOpacity>
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
            action={mutate}
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
