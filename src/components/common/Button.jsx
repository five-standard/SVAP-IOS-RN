import { TouchableOpacity, Text } from "react-native";

export const Button = (props) => {
  const { white, disabled, children } = props;
  return (
    <TouchableOpacity
      {...props}
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: `${white ? "#419FFF" : "#fff"}`,
        backgroundColor: `${
          white ? "#fff" : !disabled ? "#419FFF" : "#72B8FF"
        }`,
      }}
      activeOpacity={1}
    >
      <Text
        style={{
          color: `${white ? "#000" : "#fff"}`,
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};
