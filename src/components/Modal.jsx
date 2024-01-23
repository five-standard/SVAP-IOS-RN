import { Modal as ModalView, View, Text } from "react-native";
import { Button } from "./Button";

export const Modal = ({ title, subTitle, value, setValue, action }) => {
  return (
    <ModalView
      transparent={true}
      visible={!!value}
      onRequestClose={() => {
        setValue(false);
      }}
      animationType="slide"
      statusBarTranslucent={true}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          padding: 20,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        }}
      >
        <View
          style={{
            gap: 10,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 20,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
          <Text style={{ color: "red", fontSize: 10 }}>{subTitle}</Text>
          <View style={{ flexDirection: "row", gap: 3, width: "100%" }}>
            <View style={{ width: "50%" }}>
              <Button white onPress={() => setValue(false)}>
                취소
              </Button>
            </View>
            <View style={{ width: "50%" }}>
              <Button onPress={action}>확인</Button>
            </View>
          </View>
        </View>
      </View>
    </ModalView>
  );
};
