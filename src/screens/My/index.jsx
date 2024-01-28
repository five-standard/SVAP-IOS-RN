import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { Layout } from "../../components/common/Layout";
import { getUser } from "../../utils/strUser";
import { delToken } from "../../utils/strToken";
import { Modal } from "../../components/Modal";
export * from "./MyPost";

export const My = ({ navigation }) => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    if (logout) {
      navigation.getParent().getParent().replace("Login");
    } else {
      async function test() {
        const { userName } = await getUser();
        setName(userName);
      }
      test();
    }
  }, [logout]);

  const handleLogout = () => {
    delToken();
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
        <Text style={{ color: "#2B94FF" }}>{name}</Text>님, 안녕하세요!
      </Text>
      <View>
        <TouchableOpacity
          onPress={() => navigation.push("MyPost")}
          style={styles.hrContainer}
        >
          <Text>내가 쓴 청원 보기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={{ fontWeight: "bold" }} onPress={() => setOpen(true)}>
          로그아웃
        </Text>
      </View>
      <Modal
        title="로그아웃하시겠습니까?"
        subTitle="다시 로그인해야 합니다."
        value={open}
        setValue={setOpen}
        action={handleLogout}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  hrContainer: {
    width: "100%",
    height: 55,
    justifyContent: "center",
    borderColor: "#92929219",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  textContainer: {
    alignSelf: "center",
    flexDirection: "row",
  },
});
