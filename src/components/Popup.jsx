import { Modal as ModalView, TouchableOpacity, View } from "react-native";
export const Popup = ({ children, value, setValue }) => {
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
          justifyContent: "flex-end",
          width: "100%",
          height: "100%",
        }}
      >
        <View
          style={{
            gap: 25,
            justifyContent: "stretch",
            width: "100%",
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            backgroundColor: "#fff",
            padding: 20,
            paddingTop: 15,
            paddingBottom: 40,
            shadowOpacity: 0.3,
            shadowColor: "#000",
          }}
        >
          <TouchableOpacity onPress={() => setValue(false)}>
            <View
              style={{
                alignSelf: "center",
                borderRadius: "100%",
                width: "18%",
                height: 5,
                backgroundColor: "#BEBEBE",
              }}
            />
          </TouchableOpacity>
          {children}
        </View>
      </View>
    </ModalView>
  );
};
