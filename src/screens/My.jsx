import { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { delToken } from "../utils/strToken";
import { Layout } from "../components/common/Layout";
import { Modal } from "../components/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAccount } from "../api/User";
import { queryKeys } from "../utils/queryKeys";

export const My = ({ navigation }) => {
  const data = useQueryClient().getQueryData(queryKeys.user);
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
        <Text style={{ color: "#2B94FF" }}>{data?.userName}</Text>님,
        안녕하세요!
      </Text>
      <View>
        <TouchableOpacity
          onPress={() => navigation.push("내가 쓴 청원")}
          style={styles.hrContainer}
        >
          <Text>내가 쓴 청원 보기</Text>
        </TouchableOpacity>
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
    borderColor: "#92929250",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  textContainer: {
    alignSelf: "center",
    flexDirection: "row",
    gap: 10,
  },
});
