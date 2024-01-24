import { TouchableOpacity, Text } from "react-native";
export const Button = (props) => {
  return (
    <TouchableOpacity
      {...props}
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: `${props.white ? "#419FFF" : "#fff"}`,
        backgroundColor: `${
          props.white ? "#fff" : !props.disabled ? "#419FFF" : "#72B8FF"
        }`,
      }}
      activeOpacity={1}
    >
      <Text
        style={{
          color: `${props.white ? "#000" : "#fff"}`,
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};
