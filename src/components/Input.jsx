import { useRef, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Input(props) {
  const { name, onChange, password } = props;
  const ref = useRef();
  const [focus, setFocus] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleFocus = () => setFocus(!focus);

  const handleVisible = () => setVisible(!visible);

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
        borderColor: `${focus ? "#419FFF" : "#BEBEBE"}`,
        borderWidth: 1,
        padding: 15,
        borderRadius: 10,
        width: "100%",
      }}
      activeOpacity={1}
      onPress={() => ref.current.focus()}
    >
      <TextInput
        {...props}
        style={{ width: "90%" }}
        onChangeText={(text) => onChange({ name, text })}
        onFocus={handleFocus}
        onBlur={handleFocus}
        ref={ref}
        secureTextEntry={password && !visible ? true : false}
      />
      {password && (
        <Ionicons
          name={visible ? "eye" : "eye-off"}
          size={20}
          color="black"
          onPress={handleVisible}
        />
      )}
    </TouchableOpacity>
  );
}
