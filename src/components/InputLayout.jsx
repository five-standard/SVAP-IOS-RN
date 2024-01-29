import { View, Text } from "react-native";

export const InputLayout = ({ children, text, required, style }) => {
  return (
    <View style={[{ gap: 5 }, style]}>
      <Text style={{ fontSize: 15, fontWeight: "bold", color: "#505050" }}>
        {required && <Text style={{ color: "red" }}>*</Text>}
        {text}
      </Text>
      {children}
    </View>
  );
};
